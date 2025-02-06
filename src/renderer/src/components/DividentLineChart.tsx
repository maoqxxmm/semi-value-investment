import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { DividendItem } from '@shared/types';

interface DividendLineChartProps {
  dividentItems: DividendItem[];
}

export const DividendLineChart = memo((props: DividendLineChartProps) => {
  const { dividentItems } = props;

  const values = useMemo(() => {
    const divs = dividentItems
      .map((item) => ({
        value: item.DIVIDEND_RATIO_YSS,
        type: '股息率',
        date: item.TRADE_DATE,
      }))
      .filter((_, index) => (dividentItems.length - index - 1) % 1 === 0);
    const money = dividentItems
      .map((item) => ({
        value: item.YIELD_7DAYS,
        type: '货币基金收益率',
        date: item.TRADE_DATE,
      }))
      .filter((_, index) => (dividentItems.length - index - 1) % 1 === 0);
    return [...divs, ...money];
  }, [dividentItems]);

  const max = useMemo(() => Math.max(...values.map((item) => item.value)), [values]);
  const min = useMemo(() => Math.min(...values.map((item) => item.value)), [values]);

  return (
    <VChart
      key={
        dividentItems.length
          ? `${dividentItems[dividentItems.length - 1].SECURITY_CODE}-${dividentItems[dividentItems.length - 1].TRADE_DATE}`
          : 'empty'
      }
      spec={{
        type: 'line',
        title: {
          text: '分红历史走势（含预案）',
        },
        padding: [0],
        color: ['#FC3727AA', '#94EFFF77'],
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
                value: (datum) =>
                  datum?.value ? `${datum.value.toFixed(2)}%` : datum?.value || '--',
              },
            ],
          },
        },
        line: {
          style: {
            curveType: 'monotone',
          },
        },
        label: {
          visible: true,
          style: {
            textAlign: (datum) => {
              if (datum.date === values[values.length - 1].date) {
                return 'right';
              }
              return 'center';
            },
            dy: (datum) => {
              if (datum.value === min) {
                return 25;
              }
              return -5;
            },
            visible: (datum) =>
              datum.type === '股息率' &&
              (datum.value === min ||
                datum.value === max ||
                datum.date === values[values.length - 1].date),
            fontWeight: 'bold',
            text: (datum) => (datum?.value ? `${datum.value.toFixed(2)}%` : datum?.value || '--'),
            fill: (datum) => {
              if (datum.value === min) {
                return '#82B024';
              }
              if (datum.value === max) {
                return '#FE8090';
              }
              return '#4A9CF7';
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

DividendLineChart.displayName = 'DividendLineChart';
export const DividendLineChartWithCard = memo((props: DividendLineChartProps) => {
  return (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <DividendLineChart {...props} />
    </Card>
  );
});

DividendLineChartWithCard.displayName = 'DividendLineChartWithCard';
