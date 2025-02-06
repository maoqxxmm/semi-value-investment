import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { BarChart } from '@visactor/react-vchart';
import { SingleFinancialReport } from '@shared/types';
import { getNumberInReport, formatFinancialNumber } from '@renderer/utils';

interface ProfitabilityChartProps {
  reports: SingleFinancialReport[];
  cap: number;
}

export const ProfitabilityChart = memo((props: ProfitabilityChartProps) => {
  const { reports, cap } = props;

  const mll = reports.map((item) => ({
    year: item.year,
    type: '毛利率',
    value: getNumberInReport(item, 'leading-xsmll-销售毛利率'),
  }));
  const yylrl = reports.map((item) => ({
    year: item.year,
    type: '营业利润率',
    value:
      ((getNumberInReport(item, 'l-yysr-营业收入') -
        getNumberInReport(item, 'l-yycb-营业成本') -
        getNumberInReport(item, 'l-xsfy-销售费用') -
        getNumberInReport(item, 'l-glfy-管理费用') -
        getNumberInReport(item, 'l-yffy-研发费用') -
        Math.max(0, getNumberInReport(item, 'l-lxfy-利息费用'))) /
        getNumberInReport(item, 'l-yysr-营业收入')) *
      100,
  }));
  const jll = reports.map((item) => ({
    year: item.year,
    type: '净利率',
    value: getNumberInReport(item, 'leading-xsjll-销售净利率'),
  }));
  const roe = reports.map((item) => ({
    year: item.year,
    type: '加权扣非 ROE',
    value: getNumberInReport(item, 'leading-kfjqroe-扣非加权ROE'),
  }));
  const eastimatedRateofReturn = useMemo(() => {
    const operationProfitValues = reports.map((report) => ({
      year: report.year,
      type: '营业利润',
      value:
        getNumberInReport(report, 'l-yyzsr-营业总收入') -
        getNumberInReport(report, 'l-yyzcb-营业总成本'),
    }));

    const operationNetCashValues = reports.map((report) => ({
      year: report.year,
      type: '经营净现金流',
      value: getNumberInReport(report, 'x-jyhdcsdxjllje-经营活动产生的现金流量净额'),
    }));

    const nonRecurringProfitLossMoveAverageValues = reports.reduce<
      Array<{ year: number; type: string; value: number }>
    >((pre, report) => {
      const cur =
        getNumberInReport(report, 'l-yyzsr-营业总收入') -
        getNumberInReport(report, 'l-yyzcb-营业总成本') -
        getNumberInReport(report, 'x-jlr-净利润');
      pre.push({
        year: report.year,
        type: '非经常性损益移动平均',
        value: ((pre[pre.length - 1]?.value || 0) * 2) / 3 + (cur * 1) / 3,
      });
      return pre;
    }, []);

    const capitalMaintenanceCostMoveAverageValues = reports.reduce<
      Array<{ year: number; type: string; value: number }>
    >((pre, report) => {
      const cur =
        getNumberInReport(
          report,
          'x-gdzczjyqzczhscxswzczj-固定资产折旧、油气资产折耗、生产性生物资产折旧',
        ) + getNumberInReport(report, 'x-wxzctx-无形资产摊销');
      pre.push({
        year: report.year,
        type: '资本支出移动平均',
        value: ((pre[pre.length - 1]?.value || 0) * 2) / 3 + (cur * 1) / 3,
      });
      return pre;
    }, []);

    const estimatedReturn = operationProfitValues.map(({ year }, index) => {
      const avg =
        (operationProfitValues[index].value + operationNetCashValues[index].value || 0) / 2;
      return {
        year,
        type: '估计回报',
        value:
          ((avg -
            nonRecurringProfitLossMoveAverageValues[index].value -
            capitalMaintenanceCostMoveAverageValues[index].value) /
            cap) *
          100,
      };
    });
    return estimatedReturn;
  }, [reports, cap]);

  const values = useMemo(
    () =>
      [...mll, ...yylrl, ...jll, ...roe, ...eastimatedRateofReturn].sort((a, b) => a.year - b.year),
    [mll, yylrl, jll, roe, eastimatedRateofReturn],
  );

  return (
    <BarChart
      key={reports[0] ? getNumberInReport(reports[0], 'z-zczj-资产总计') : 'empty'}
      spec={{
        type: 'bar',
        title: {
          text: '盈利能力',
          subtext: `当前回报率预估：${formatFinancialNumber(eastimatedRateofReturn?.[0]?.value, { unit: '%' })}`,
        },
        data: {
          values,
        },
        xField: ['year', 'type'],
        yField: 'value',
        seriesField: 'type',
        padding: [0],
        axes: [
          {
            orient: 'left',
            softMax: 100,
            softMin: 0,
            grid: {
              style: {
                strokeOpacity: 0.3,
              },
            },
            label: {
              formatMethod: (val) => `${(Number(val) || 0).toFixed(0)}%`,
            },
          },
          {
            orient: 'bottom',
            trimPadding: true,
          },
        ],
        tooltip: {
          confine: false,
          mark: {
            title: {
              value: (datum) => `${datum?.year} 年`,
            },
            content: [
              {
                key: (datum) => datum?.type,
                value: (datum) => `${(Number(datum?.value) || 0).toFixed(2)}%`,
              },
            ],
          },
          dimension: {
            title: {
              value: (datum) => `${datum?.year} 年`,
            },
            content: [
              {
                key: (datum) => datum?.type,
                value: (datum) => `${(Number(datum?.value) || 0).toFixed(2)}%`,
              },
            ],
          },
        },
        animationUpdate: false,
        animationAppear: false,
        animationEnter: false,
        animationExit: false,
      }}
    />
  );
});

export const ProfitabilityChartWithCard = memo((props: ProfitabilityChartProps) => {
  return (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <ProfitabilityChart {...props} />
    </Card>
  );
});

ProfitabilityChartWithCard.displayName = 'ProfitabilityChartWithCard';
ProfitabilityChart.displayName = 'ProfitabilityChart';
