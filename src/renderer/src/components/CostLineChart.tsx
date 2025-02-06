import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { AreaChart } from '@visactor/react-vchart';
import { SingleFinancialReport } from '@shared/types';
import { ACCOUNT_ITEM } from '@shared/constants';
import { getNumberInReport } from '@renderer/utils';

interface CostLineChartProps {
  reports: SingleFinancialReport[];
}

const keyList: Array<keyof typeof ACCOUNT_ITEM> = [
  'l-xsfy-销售费用',
  'l-glfy-管理费用',
  'l-yffy-研发费用',
  'l-lxfy-利息费用',
];

const getIndex = (key: string) => {
  if (key === 'rest') {
    return -1;
  }
  if (key === 'other') {
    return keyList.length;
  }
  const index = keyList.findIndex((item) => item === key);
  return index;
};

export const CostLineChart = memo((props: CostLineChartProps) => {
  const { reports } = props;

  const valuesWithoutRest = useMemo(() => {
    return reports.flatMap((report) =>
      keyList.map((item) => {
        const value = Number(report.data[ACCOUNT_ITEM[item]]) || 0;
        return {
          key: item,
          year: report.year,
          name: item.split('-').slice(-1)[0],
          value,
        };
      }),
    );
  }, [reports]);

  const totalMap = useMemo(() => {
    return Object.fromEntries(
      reports.map((report) => [
        report.year,
        getNumberInReport(report, 'l-yysr-营业收入') - getNumberInReport(report, 'l-yycb-营业成本'),
      ]),
    ) as Record<number, number>;
  }, [reports]);

  const rest = useMemo(
    () =>
      reports.map((report) => {
        const { year } = report;
        const total =
          getNumberInReport(report, 'l-yysr-营业收入') -
          getNumberInReport(report, 'l-yycb-营业成本');
        const valuesInYear = valuesWithoutRest
          .filter((item) => item.year === year)
          .map((item) => item.value);
        const sum = valuesInYear.reduce((a, b) => a + b);
        const value = total - sum;
        return {
          key: 'rest',
          year,
          name: '营业利润剩余',
          value,
        };
      }),
    [reports, valuesWithoutRest],
  );

  const others = useMemo(
    () =>
      reports.map((report) => {
        const { year } = report;
        const netProfit = getNumberInReport(report, 'x-jlr-净利润');
        const restInYear = rest.find((item) => item.year === year)?.value || 0;
        return {
          key: 'other',
          year,
          name: '其他损益',
          value: restInYear - netProfit,
        };
      }),
    [rest],
  );

  const values = useMemo(() => {
    const res = [...rest, ...valuesWithoutRest, ...others];
    return res.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return getIndex(b.key) - getIndex(a.key);
    });
  }, [valuesWithoutRest, rest, others]);

  return (
    <AreaChart
      key={reports[0] ? getNumberInReport(reports[0], 'z-zczj-资产总计') : 'empty'}
      spec={{
        type: 'area',
        title: {
          text: '费用占比',
        },
        data: {
          values,
        },
        stack: true,
        xField: 'year',
        yField: 'value',
        seriesField: 'name',
        point: { visible: false },
        padding: [0],
        axes: [
          {
            orient: 'left',
            grid: {
              style: {
                strokeOpacity: 0.3,
              },
            },
            label: {
              formatMethod: (val) => `${(Number(val) || 0) / 100_000_000} 亿`,
            },
          },
          {
            orient: 'bottom',
            trimPadding: true,
          },
        ],
        tooltip: {
          confine: false,
          dimension: {
            title: {
              value: (datum) => `${datum?.year} 年`,
            },
            content: [
              {
                key: (datum) => datum?.name,
                value: (datum) =>
                  `${datum?.value ? `${(datum.value / 100_000_000).toFixed(2)} 亿` : '--'}（${
                    totalMap[datum?.year] && datum?.value
                      ? `${((datum.value / totalMap[datum.year]) * 100).toFixed(2)}%`
                      : '--'
                  }）`,
              },
            ],
            updateContent: (pre) => {
              const res = pre?.slice()?.reverse();
              return res;
            },
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

export const CostLineChartWithCard = memo((props: CostLineChartProps) => {
  return (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <CostLineChart {...props} />
    </Card>
  );
});

CostLineChartWithCard.displayName = 'CostLineChartWithCard';
CostLineChart.displayName = 'CostLineChart';
