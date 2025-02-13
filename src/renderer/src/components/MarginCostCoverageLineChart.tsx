import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { SingleFinancialReport } from '@shared/types';
import { formatFinancialNumber, getNumberInReport } from '@renderer/utils';

interface MarginCostCoverageLineChartProps {
  reports: SingleFinancialReport[];
}

export const MarginCostCoverageLineChart = memo((props: MarginCostCoverageLineChartProps) => {
  const { reports } = props;

  console.log(reports);
  const values = useMemo(() => {
    // 用 i 年的费用 / i+1 年的毛利润
    const dev = reports.slice(1).map((report, index) => ({
      year: report.year + 1,
      type: '去年研发支出/毛利润',
      value:
        (getNumberInReport(reports[index + 1], 'l-yffy-研发费用') /
          (getNumberInReport(reports[index], 'l-yyzsr-营业总收入') -
            getNumberInReport(reports[index], 'l-yyzcb-营业总成本'))) *
        100,
    }));
    const market = reports.slice(1).map((report, index) => ({
      year: report.year + 1,
      type: '去年销售费用/毛利润',
      value:
        (getNumberInReport(reports[index + 1], 'l-xsfy-销售费用') /
          (getNumberInReport(reports[index], 'l-yyzsr-营业总收入') -
            getNumberInReport(reports[index], 'l-yyzcb-营业总成本'))) *
        100,
    }));
    const capex = reports.slice(1).map((report, index) => ({
      year: report.year + 1,
      type: '去年资本开支/毛利润',
      value:
        (getNumberInReport(
          reports[index + 1],
          'x-gjgdzcwxzchqtcqzczfdxj-购建固定资产、无形资产和其他长期资产支付的现金',
        ) /
          (getNumberInReport(reports[index], 'l-yyzsr-营业总收入') -
            getNumberInReport(reports[index], 'l-yyzcb-营业总成本'))) *
        100,
    }));

    return [...dev, ...market, ...capex].sort((a, b) => a.year - b.year);
  }, [reports]);

  return (
    <VChart
      key={reports[0] ? getNumberInReport(reports[0], 'z-zczj-资产总计') : 'empty'}
      spec={{
        type: 'line',
        title: {
          text: '毛利费用覆盖率',
        },
        padding: [0],
        data: {
          values,
        },
        axes: [
          {
            orient: 'left',
            grid: {
              style: {
                strokeOpacity: 0.3,
              },
            },
            label: {
              formatMethod: (val) => formatFinancialNumber(val, { unit: '%' }),
            },
          },
          {
            orient: 'bottom',
            trimPadding: true,
          },
        ],
        xField: 'year',
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
                value: (datum) => `${formatFinancialNumber(datum?.value, { unit: '%' })}`,
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

MarginCostCoverageLineChart.displayName = 'MarginCostCoverageLineChart';

export const MarginCostCoverageLineChartWithCard = memo(
  (props: MarginCostCoverageLineChartProps) => {
    return (
      <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
        <MarginCostCoverageLineChart {...props} />
      </Card>
    );
  },
);

MarginCostCoverageLineChartWithCard.displayName = 'MarginCostCoverageLineChartWithCard';
