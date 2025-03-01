import { memo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { LineChart } from '@visactor/react-vchart';
import { KdjAndRsiResult, KLineType } from '@shared/types';

interface KdJAndRsiChartProps {
  type: KLineType;
  data?: KdjAndRsiResult;
  during?: number;
  compact?: boolean;
}

type ChartType = 'j' | 'rsi';
const CHART_TYPE_TO_COLOR = {
  j: '#E9A5E5',
  rsi: '#F9C064',
};

const KLINE_TYPE_TO_TITLE: Record<KLineType, string> = {
  [KLineType.DAY]: '日 K',
  [KLineType.WEEK]: '周 K',
  [KLineType.MONTH]: '月 K',
};

const getJMarkLineStyle = (type: ChartType) => ({
  label: {
    visible: true,
    text: '0',
    style: {
      fill: CHART_TYPE_TO_COLOR[type],
    },
  },
  line: {
    style: {
      stroke: `${CHART_TYPE_TO_COLOR[type]}AA`,
    },
  },
  endSymbol: {
    visible: false,
  },
});

export const KdJAndRsiChart = memo((props: KdJAndRsiChartProps) => {
  const { type, data, during = 100, compact } = props;

  return (
    <LineChart
      key={data?.rsi ? `${data.rsi[0]}-${data.rsi[1]}-${data.rsi[2]}` : 'empty'}
      spec={{
        type: 'line',
        title: compact
          ? undefined
          : {
              text: KLINE_TYPE_TO_TITLE[type],
            },
        data: [
          {
            id: 'j',
            values: (data?.j || []).slice(-1 * during).map((item) => ({
              type: 'J',
              value: item.value,
              date: item.date,
            })),
          },
          {
            id: 'rsi',
            values: (data?.rsi || []).slice(-1 * during).map((item) => ({
              type: 'RSI',
              value: item.value,
              date: item.date,
            })),
          },
        ],
        tooltip: {
          confine: false,
          dimension: {
            title: {
              value: (datum) => datum?.date,
            },
            content: [
              { key: (datum) => datum?.type, value: (datum) => `${datum?.value?.toFixed(1)}` },
            ],
            updateContent: (pre) => {
              const res = pre?.slice()?.sort((a, b) => b.datum.value - a.datum.value);
              return res;
            },
          },
        },
        markLine: [
          {
            y: 0,
            relativeSeriesId: 'j',
            ...getJMarkLineStyle('j'),
            label: {
              ...getJMarkLineStyle('j').label,
              text: '0',
            },
          },
          {
            y: 100,
            relativeSeriesId: 'j',
            ...getJMarkLineStyle('j'),
            label: {
              ...getJMarkLineStyle('j').label,
              text: '100',
            },
          },
          {
            y: 80,
            relativeSeriesId: 'rsi',
            ...getJMarkLineStyle('rsi'),
            label: {
              ...getJMarkLineStyle('rsi').label,
              text: '80',
            },
          },
          {
            y: 20,
            relativeSeriesId: 'rsi',
            ...getJMarkLineStyle('rsi'),
            label: {
              ...getJMarkLineStyle('rsi').label,
              text: '20',
            },
          },
        ],
        series: [
          {
            id: 'j',
            dataId: 'j',
            type: 'line',
            xField: 'date',
            yField: 'value',
            seriesField: 'type',
          },
          {
            id: 'rsi',
            dataId: 'rsi',
            type: 'line',
            xField: 'date',
            yField: 'value',
            seriesField: 'type',
          },
        ],
        axes: compact
          ? [
              { orient: 'left', visible: false },
              { orient: 'bottom', visible: false },
            ]
          : [
              {
                orient: 'left',
                grid: {
                  visible: false,
                },
              },
            ],
        point: { visible: false },
        padding: [0],
        color: [CHART_TYPE_TO_COLOR.j, CHART_TYPE_TO_COLOR.rsi],
        animationUpdate: false,
        animationAppear: false,
        animationEnter: false,
        animationExit: false,
      }}
    />
  );
});

KdJAndRsiChart.displayName = 'KdJAndRsiChart';

export const KdJAndRsiChartWithCard = memo((props: KdJAndRsiChartProps) => (
  <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
    <KdJAndRsiChart {...props} />
  </Card>
));
KdJAndRsiChartWithCard.displayName = 'KdJAndRsiChartWithCard';
