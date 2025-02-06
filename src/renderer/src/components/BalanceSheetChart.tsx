import { memo, useMemo } from 'react';
import { Card } from '@douyinfe/semi-ui';
import { AreaChart } from '@visactor/react-vchart';
import {
  BalanceSheetType,
  SHEET_TYPE_TO_TITLE,
  TOTAL_KEY_IN_BALANCE_SHEET,
} from '@shared/constants';
import { SingleFinancialReport } from '@shared/types';
import { ACCOUNT_ITEM, SHEET_TYPE_TO_KEYS } from '@shared/constants';
import { getNumberInReport } from '@renderer/utils';

interface BalanceSheetChartProps {
  type: BalanceSheetType;
  reports: SingleFinancialReport[];
  max?: number;
  tickStep?: number;
}

export const BalanceSheetChart = memo((props: BalanceSheetChartProps) => {
  const { type, reports, max, tickStep } = props;

  const valuesWithoutRest = useMemo(() => {
    const data = reports.flatMap((report) =>
      SHEET_TYPE_TO_KEYS[type].map((item) => {
        const value = Number(report.data[ACCOUNT_ITEM[item]]) || 0;
        return {
          year: report.year,
          name: item.split('-').slice(-1)[0],
          value,
        };
      }),
    );
    const noneZeroNameSet = new Set(data.filter((item) => !!item.value).map((item) => item.name));
    const latestYearValues = data.filter((item) => item.year === reports[0].year);
    return data
      .filter((item) => noneZeroNameSet.has(item.name))
      .sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        const aValue = latestYearValues.find((item) => item.name === a.name)?.value || 0;
        const bValue = latestYearValues.find((item) => item.name === b.name)?.value || 0;
        return aValue - bValue;
      });
  }, [reports]);

  const totalMap = useMemo(() => {
    return Object.fromEntries(
      reports.map((report) => [
        report.year,
        report.data[ACCOUNT_ITEM[TOTAL_KEY_IN_BALANCE_SHEET[type]]],
      ]),
    ) as Record<number, number>;
  }, [reports, type]);

  const rest = useMemo(
    () =>
      reports.map(({ year, data }) => {
        const total = Number(data[ACCOUNT_ITEM[TOTAL_KEY_IN_BALANCE_SHEET[type]]]) || 0;
        const valuesInYear = valuesWithoutRest
          .filter((item) => item.year === year)
          .map((item) => item.value);
        const sum = valuesInYear.reduce((a, b) => a + b);
        const value = total - sum;
        return {
          year,
          name: '剩余',
          value: Math.abs(value) < 1_000 ? 0 : value,
        };
      }),
    [reports, valuesWithoutRest],
  );

  const values = useMemo(() => {
    const res = [...rest, ...valuesWithoutRest];
    const latestYearValues = res.filter((item) => item.year === reports[0].year);
    return res.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      const aValue = latestYearValues.find((item) => item.name === a.name)?.value || 0;
      const bValue = latestYearValues.find((item) => item.name === b.name)?.value || 0;
      return aValue - bValue;
    });
  }, [valuesWithoutRest, rest]);

  return (
    <AreaChart
      key={reports[0] ? getNumberInReport(reports[0], 'z-zczj-资产总计') : 'empty'}
      spec={{
        type: 'area',
        title: {
          text: SHEET_TYPE_TO_TITLE[type],
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
            max,
            grid: {
              style: {
                strokeOpacity: 0.3,
              },
            },
            tick: {
              forceTickCount: 6,
              tickStep,
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

export const BalanceSheetChartWithCard = memo((props: BalanceSheetChartProps) => {
  return (
    <Card bodyStyle={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <BalanceSheetChart {...props} />
    </Card>
  );
});

BalanceSheetChartWithCard.displayName = 'BalanceSheetChartWithCard';
BalanceSheetChart.displayName = 'BalanceSheetChart';
