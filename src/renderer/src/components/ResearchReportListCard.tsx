import { memo } from 'react';
import { ApiType, ResearchReportItem } from '@shared/types';
import { Card, Typography } from '@douyinfe/semi-ui';
import { IconLink } from '@douyinfe/semi-icons';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

interface ResearchReportListCardProps {
  items: ResearchReportItem[];
}

export const ResearchReportListCard = memo((props: ResearchReportListCardProps) => {
  const { items } = props;

  const onClick = async (id: string) => {
    const url = await safelyRequestByIpcWithErrorToast(ApiType.GET_RESEARCH_REPORT_PDF_URL, id);
    window.open(url);
  };

  return (
    <Card bodyStyle={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <Typography.Title heading={6} className="mb-4">
        研究报告
      </Typography.Title>
      {items.map((item) => (
        <div key={item.art_code} className="flex gap-2 mb-2">
          <Typography.Text
            onClick={() => onClick(item.art_code)}
            link
            underline
            icon={<IconLink />}
          >
            {item.title}
          </Typography.Text>
        </div>
      ))}
    </Card>
  );
});

ResearchReportListCard.displayName = 'ResearchReportListCard';
