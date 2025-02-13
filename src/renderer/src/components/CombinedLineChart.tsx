import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { SingleFinancialReport } from '@shared/types';
import { formatFinancialNumber, getNumberInReport } from '@renderer/utils';

interface CombinedLineChartProps {
  reports: SingleFinancialReport[];
}

export const CombinedLineChart = memo((props: CombinedLineChartProps) => {
  const { reports } = props;

  const values = useMemo(() => {
    const operationProfitValues = reports.map((report) => ({
      date: report.year,
      type: '营业利润',
      value:
        getNumberInReport(report, 'l-yyzsr-营业总收入') -
        getNumberInReport(report, 'l-yyzcb-营业总成本'),
    }));

    const operationNetCashValues = reports.map((report) => ({
      date: report.year,
      type: '经营净现金流',
      value: getNumberInReport(report, 'x-jyhdcsdxjllje-经营活动产生的现金流量净额'),
    }));

    const nonRecurringProfitLossMoveAverageValues = reports.reduce<
      Array<{ date: number; type: string; value: number }>
    >((pre, report) => {
      const cur =
        getNumberInReport(report, 'x-jlr-净利润') -
        (getNumberInReport(report, 'l-yyzsr-营业总收入') -
          getNumberInReport(report, 'l-yyzcb-营业总成本'));
      pre.push({
        date: report.year,
        type: '非经常性损益移动平均',
        value: ((pre[pre.length - 1]?.value || 0) * 2) / 3 + (cur * 1) / 3,
      });
      return pre;
    }, []);

    const capitalMaintenanceCostMoveAverageValues = reports.reduce<
      Array<{ date: number; type: string; value: number }>
    >((pre, report) => {
      const cur = getNumberInReport(
        report,
        'x-gjgdzcwxzchqtcqzczfdxj-购建固定资产、无形资产和其他长期资产支付的现金',
      );
      pre.push({
        date: report.year,
        type: '购建资产支出移动平均',
        value: ((pre[pre.length - 1]?.value || 0) * 2) / 3 + (cur * 1) / 3,
      });
      return pre;
    }, []);

    const estimatedReturn = operationProfitValues.map(({ date }, index) => {
      const avg =
        (operationProfitValues[index].value + operationNetCashValues[index].value || 0) / 2;
      return {
        date,
        type: '估计回报',
        value:
          avg +
          nonRecurringProfitLossMoveAverageValues[index].value -
          capitalMaintenanceCostMoveAverageValues[index].value,
      };
    });

    return [
      ...estimatedReturn,
      ...operationProfitValues,
      ...operationNetCashValues,
      ...nonRecurringProfitLossMoveAverageValues,
      ...capitalMaintenanceCostMoveAverageValues,
    ].sort((a, b) => a.date - b.date);
  }, [reports]);

  return (
    <VChart
      key={reports[0] ? getNumberInReport(reports[0], 'z-zczj-资产总计') : 'empty'}
      spec={{
        type: 'line',
        title: {
          text: '组合图表',
        },
        padding: [0],
        data: {
          values,
        },
        color: [
          '#FC3727AA',
          '#B8EECD77',
          '#FFCF7A77',
          '#94EFFF77',
          '#DDC5FA77',
          '#B2CFFF77',
          '#F9C065',
        ],
        axes: [
          {
            orient: 'left',
            grid: {
              style: {
                strokeOpacity: 0.3,
              },
            },
            label: {
              formatMethod: (val) => formatFinancialNumber(val),
            },
          },
          {
            orient: 'bottom',
            trimPadding: true,
          },
        ],
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        point: { visible: false },
        tooltip: {
          visible: true,
          dimension: {
            title: {
              value: (datum) => datum?.date,
            },
            content: [
              {
                key: (datum) => datum?.type,
                value: (datum) => `${formatFinancialNumber(datum?.value)}`,
              },
            ],
            updateContent: (pre) =>
              pre?.slice()?.sort((a, b) => Number(b?.datum?.value) - Number(a?.datum?.value)),
          },
        },
        line: {
          style: {
            curveType: 'monotone',
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

CombinedLineChart.displayName = 'CombinedLineChart';
export const CombinedLineChartWithCard = memo((props: CombinedLineChartProps) => {
  return (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <CombinedLineChart {...props} />
    </Card>
  );
});

CombinedLineChartWithCard.displayName = 'CombinedLineChartWithCard';
