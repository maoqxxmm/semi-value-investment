import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { BizItem, ReportMonth } from '@shared/types';
import { formatFinancialNumber } from '@renderer/utils';

interface BizLineChartProps {
  bizItems: BizItem[];
  month: ReportMonth;
}

export const BizLineChart = memo((props: BizLineChartProps) => {
  const { bizItems, month } = props;

  const sortedBizItems = useMemo(() => {
    const years = [...new Set(bizItems.map((item) => item.year))].sort((a, b) => b - a).slice(0, 1);
    const newList = bizItems.filter((item) => years.includes(item.year));
    newList.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return b.ratio - a.ratio;
    });
    return newList;
  }, [bizItems]);

  const values = useMemo(() => {
    const items = bizItems.filter((item) => item.month === month);
    const reverseItems = items.slice().reverse();
    return bizItems.slice().sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      const aIncome = reverseItems.find((item) => item.name === a.name)?.income || 0;
      const bIncome = reverseItems.find((item) => item.name === b.name)?.income || 0;
      return aIncome - bIncome;
    });
  }, [bizItems, month]);

  return (
    <VChart
      key={sortedBizItems.map((item) => (item.ratio * 100).toFixed(0)).join('-')}
      spec={{
        type: 'bar',
        title: {
          text: '历史业务占比',
        },
        data: {
          values,
        },
        stack: true,
        xField: 'year',
        yField: 'income',
        seriesField: 'name',
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
              formatMethod: (val) => formatFinancialNumber(val),
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
            content: {
              key: (datum) => datum?.name,
              value: (datum) =>
                `${formatFinancialNumber(datum?.income)} (GPR: ${formatFinancialNumber(datum?.gpr * 100, { unit: '%' })}, Rate: ${formatFinancialNumber(datum?.ratio * 100, { unit: '%' })})`,
            },
          },
          dimension: {
            title: {
              value: (datum) => `${datum?.year} 年`,
            },
            content: [
              {
                key: (datum) => datum?.name,
                value: (datum) =>
                  `${formatFinancialNumber(datum?.income)} (GPR: ${formatFinancialNumber(datum?.gpr * 100, { unit: '%' })})`,
              },
            ],
            updateContent: (pre) => {
              const res = pre?.slice()?.reverse();
              return res;
            },
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

BizLineChart.displayName = 'BizLineChart';
export const BizLineChartWithCard = memo((props: BizLineChartProps) => {
  return (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <BizLineChart {...props} />
    </Card>
  );
});

BizLineChartWithCard.displayName = 'BizLineChartWithCard';
