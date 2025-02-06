import { memo, useMemo } from 'react';
import { ApiType, ReportOriginItem } from '@shared/types';
import { Card, Typography } from '@douyinfe/semi-ui';
import { IconLink } from '@douyinfe/semi-icons';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

interface ReportOriginListCardProps {
  items: ReportOriginItem[];
}

export const ReportOriginListCard = memo((props: ReportOriginListCardProps) => {
  const { items } = props;

  const onClick = async (id: string) => {
    const url = await safelyRequestByIpcWithErrorToast(ApiType.GET_PDF_URL, id);
    window.open(url);
  };

  const listGroupByYear = useMemo(() => {
    const map = new Map<number, ReportOriginItem[]>();
    items.forEach((item) => {
      if (map.has(item.YEAR)) {
        map.get(item.YEAR)?.push(item);
      } else {
        map.set(item.YEAR, [item]);
      }
    });
    return map;
  }, [items]);

  return (
    <Card bodyStyle={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <Typography.Title heading={6} className="mb-4">
        原始财报
      </Typography.Title>
      {[...listGroupByYear.entries()].map(([year, list]) => (
        <div key={year} className="flex gap-2 mb-2">
          <div className="font-bold font-mono">{year}</div>
          {list.map((item) => {
            const hasPub = item.PUBLISH_SITUATIONS.startsWith('AN');
            return (
              <Typography.Text
                key={item.PUBLISH_SITUATIONS}
                onClick={() => hasPub && onClick(item.PUBLISH_SITUATIONS)}
                link={hasPub}
                underline={hasPub}
                icon={<IconLink />}
              >
                {item.REPORT_TYPE}
                {item.OPINION_TYPE ? ` (${item.OPINION_TYPE})` : ''}
                {!hasPub ? ` (${item.PUBLISH_SITUATIONS})` : ''}
              </Typography.Text>
            );
          })}
        </div>
      ))}
    </Card>
  );
});

ReportOriginListCard.displayName = 'ReportOriginListCard';
