import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { SingleFinancialReport } from '@shared/types';
import { formatFinancialNumber, getNumberInReport } from '@renderer/utils';

interface ReceivableCollectionCapacityLineChartProps {
  reports: SingleFinancialReport[];
}

export const ReceivableCollectionCapacityLineChart = memo(
  (props: ReceivableCollectionCapacityLineChartProps) => {
    const { reports } = props;

    const values = useMemo(() => {
      const i = reports.map((report) => ({
        year: report.year,
        type: '应收账款周转天数',
        value: getNumberInReport(report, 'leading-yszkzzts-应收账款周转天数'),
      }));
      const s = reports.map((report) => ({
        year: report.year,
        type: '存货周转天数',
        value: getNumberInReport(report, 'leading-chzzts-存货周转天数'),
      }));
      return [...i, ...s].sort((a, b) => a.year - b.year);
    }, [reports]);

    return (
      <VChart
        key={reports[0] ? getNumberInReport(reports[0], 'z-zczj-资产总计') : 'empty'}
        spec={{
          type: 'line',
          title: {
            text: '回款能力',
          },
          data: {
            values,
          },
          padding: [0],
          axes: [
            {
              orient: 'left',
              grid: {
                style: {
                  strokeOpacity: 0.3,
                },
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
                value: (datum) => datum?.year,
              },
              content: [
                {
                  key: (datum) => datum?.type,
                  value: (datum) => `${formatFinancialNumber(datum?.value)} 天`,
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
  },
);

ReceivableCollectionCapacityLineChart.displayName = 'ReceivableCollectionCapacityLineChart';

export const ReceivableCollectionCapacityLineChartWithCard =
  memo<ReceivableCollectionCapacityLineChartProps>((props) => (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <ReceivableCollectionCapacityLineChart {...props} />
    </Card>
  ));

ReceivableCollectionCapacityLineChartWithCard.displayName =
  'ReceivableCollectionCapacityLineChartWithCard';
