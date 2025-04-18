import { memo, useState } from 'react';
import dayjs from 'dayjs';
import { ApiType, ResearchReportItem } from '@shared/types';
import { Card, Typography, Button } from '@douyinfe/semi-ui';
import { IconLink, IconRefresh } from '@douyinfe/semi-icons';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

interface BizResearchReportListCardProps {
  items: ResearchReportItem[];
}

export const BizResearchReportListCard = memo((props: BizResearchReportListCardProps) => {
  const { items } = props;

  const [pagesFetching, setPagesFetching] = useState(false);
  const [pages, setPages] = useState<Record<string, number>>({});

  const onClick = async (id: string) => {
    const data = await safelyRequestByIpcWithErrorToast(ApiType.GET_RESEARCH_REPORT_PDF, id);
    window.open(data.attach_url);
  };

  const fetchPages = async () => {
    try {
      setPagesFetching(true);
      const datas = await Promise.all(
        items.map(async (item) => {
          return [
            item.art_code,
            (await safelyRequestByIpcWithErrorToast(ApiType.GET_RESEARCH_REPORT_PDF, item.art_code))
              .attach_pages || 0,
          ];
        }),
      );
      setPages(Object.fromEntries(datas));
    } finally {
      setPagesFetching(false);
    }
  };

  return (
    <Card bodyStyle={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <div className="flex gap-3 items-center mb-3">
        <Typography.Title heading={6}>行业报告</Typography.Title>
        <Button
          type="tertiary"
          theme="borderless"
          icon={<IconRefresh />}
          loading={pagesFetching}
          onClick={fetchPages}
        >
          获取所有报告页数
        </Button>
      </div>
      {items.map((item) => {
        const { art_code, publish_time, title } = item;
        const page = pages[art_code];
        return (
          <div key={art_code} className="flex gap-2 mb-2">
            <Typography.Text onClick={() => onClick(art_code)} link underline icon={<IconLink />}>
              {dayjs(publish_time).format('YYYY-MM-DD')}：{title}
              {page ? ` (${page})` : null}
            </Typography.Text>
          </div>
        );
      })}
    </Card>
  );
});

BizResearchReportListCard.displayName = 'BizResearchReportListCard';
