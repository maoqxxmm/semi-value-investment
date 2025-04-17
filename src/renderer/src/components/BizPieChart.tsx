import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { PieChart } from '@visactor/react-vchart';
import { useTheme } from '@renderer/hooks';
import { BizItem } from '@shared/types';

interface BizPieChartProps {
  bizItems: BizItem[];
}

export const BizPieChart = memo((props: BizPieChartProps) => {
  const { bizItems } = props;

  const { theme } = useTheme();

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

  const maxGpr = useMemo(() => {
    return Math.max(...sortedBizItems.filter((item) => !!item.gpr).map((item) => item.gpr));
  }, [sortedBizItems]);

  return (
    <PieChart
      key={sortedBizItems.map((item) => (item.ratio * 100).toFixed(0)).join('-')}
      spec={{
        type: 'pie',
        title: {
          text: '业务分布',
        },
        padding: [0],
        data: {
          values: sortedBizItems,
        },
        valueField: 'ratio',
        seriesField: 'name',
        pie: {
          style: {
            innerRadius: 0,
            outerRadius: (datum) => {
              const { gpr } = datum || {};
              if (!gpr) {
                return 50;
              }
              const r = gpr / maxGpr;
              return Math.sqrt(r * 100) * 8;
            },
          },
          state: {
            hover: null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        },
        label: {
          visible: true,
          formatMethod: (_, data) => {
            return {
              type: 'rich',
              text: [
                {
                  text: `${data?.name}\n`,
                  fontWeight: '500',
                  fontSize: 15,
                },
                {
                  text: data?.gpr ? `毛利率 ${(data.gpr * 100).toFixed(2)}%\n` : '毛利率 --\n',
                  fontSize: 11,
                  fill: theme === 'dark' ? '#ffffff66' : '#00000044',
                  fontWeight: '500',
                },
                {
                  text: data?.ratio ? `占比 ${(data.ratio * 100).toFixed(2)}%` : '占比 --',
                  fontSize: 11,
                  fill: theme === 'dark' ? '#ffffff66' : '#00000044',
                  fontWeight: '500',
                },
              ],
            };
          },
        },
        tooltip: {
          visible: true,
          mark: {
            title: {
              value: (datum) => datum?.name,
            },
            content: [
              {
                key: '毛利率',
                value: (datum) => (datum?.gpr ? `${(datum.gpr * 100).toFixed(2)}%` : '--'),
                hasShape: false,
              },
              {
                key: '占比',
                value: (datum) => (datum?.gpr ? `${(datum.ratio * 100).toFixed(2)}%` : '--'),
                hasShape: false,
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

BizPieChart.displayName = 'BizPieChart';
export const BizPieChartWithCard = memo((props: BizPieChartProps) => {
  return (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <BizPieChart {...props} />
    </Card>
  );
});

BizPieChartWithCard.displayName = 'BizPieChartWithCard';
