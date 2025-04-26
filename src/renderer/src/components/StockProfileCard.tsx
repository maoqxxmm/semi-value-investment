import { memo, useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { IconTriangleUp, IconTriangleDown } from '@douyinfe/semi-icons';
import { Typography, Card, Rating, Divider, Tag } from '@douyinfe/semi-ui';
import { ratingMapAtom, reviewMapAtom, updateRatingMapAtom } from '@renderer/models';
import { ReviewEditModal } from '@renderer/components/ReviewEditModal';
import { ApiType, IStockProfile, KLineType } from '@shared/types';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';

interface StockProfileCardProps {
  profile: IStockProfile;
  onMoreInfo: () => void;
}

interface Index {
  day: {
    j: number;
    rsi: number;
  };
  week: {
    j: number;
    rsi: number;
  };
  month: {
    j: number;
    rsi: number;
  };
}

interface TagRenderParams {
  domain: [number, number];
  suffix?: string;
  value?: number;
  type: TagProps['type'];
  highContrast?: boolean;
}

const tagRender = (params: TagRenderParams) => {
  const { domain, suffix, value, type } = params;
  if (!value) {
    return null;
  }
  // 范围内不渲染
  if (value <= domain[1] && value >= domain[0]) {
    return null;
  }
  const icon =
    value < domain[0] ? (
      <IconTriangleDown style={{ fontSize: 10 }} />
    ) : (
      <IconTriangleUp style={{ fontSize: 10 }} />
    );
  const color = value < domain[0] ? 'lime' : 'pink';
  return (
    <Tag
      type={type}
      shape="circle"
      prefixIcon={icon}
      suffixIcon={suffix}
      color={color}
      style={{ opacity: type === 'light' ? 0.6 : 1 }}
    >
      {value.toFixed(1)}
    </Tag>
  );
};

export const StockProfileCard = memo((props: StockProfileCardProps) => {
  const { profile, onMoreInfo } = props;

  const reviewMap = useAtomValue(reviewMapAtom);
  const ratingMap = useAtomValue(ratingMapAtom);
  const updateRatingMap = useSetAtom(updateRatingMapAtom);

  const [current, setCurrent] = useState<string>('');
  const [index, setIndex] = useState<Index | null>(null);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      const [day, month, week] = await Promise.all([
        safelyRequestByIpcWithErrorToast(ApiType.GET_KDJ_RSI, {
          stockId: profile.id,
          type: KLineType.DAY,
        }),
        safelyRequestByIpcWithErrorToast(ApiType.GET_KDJ_RSI, {
          stockId: profile.id,
          type: KLineType.MONTH,
        }),
        safelyRequestByIpcWithErrorToast(ApiType.GET_KDJ_RSI, {
          stockId: profile.id,
          type: KLineType.WEEK,
        }),
      ]);
      if (didCancel) {
        return;
      }
      setIndex({
        day: {
          j: day.j.slice(-1)[0]?.value || 0,
          rsi: day.rsi.slice(-1)[0].value || 0,
        },
        month: {
          j: month.j.slice(-1)[0]?.value || 0,
          rsi: month.rsi.slice(-1)[0].value || 0,
        },
        week: {
          j: week.j.slice(-1)[0]?.value || 0,
          rsi: week.rsi.slice(-1)[0].value || 0,
        },
      });
    })();
    return () => {
      didCancel = true;
    };
  }, [profile.id]);

  return (
    <>
      <Card
        key={profile.id}
        headerLine={false}
        bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Card.Meta
          className="mb-[auto]"
          title={profile.name}
          description={reviewMap[profile.id] || '--'}
        />
        <div className="flex items-center gap-2 my-2">
          {index ? (
            <>
              {tagRender({ domain: [-5, 100], value: index.day.j, type: 'light' })}
              {tagRender({ domain: [-5, 100], value: index.week.j, type: 'ghost' })}
              {tagRender({ domain: [-5, 100], value: index.month.j, type: 'solid' })}
            </>
          ) : null}
        </div>
        <Divider className="my-3" />
        <div className="flex items-center">
          <Rating
            className="h-[22px]"
            size="small"
            value={ratingMap[profile.id] || 0}
            onChange={(value) => updateRatingMap({ ...ratingMap, [profile.id]: value })}
          />
          <div className="ml-auto flex items-center gap-5">
            <Typography.Text className="font-normal" link onClick={() => setCurrent(profile.id)}>
              编辑评价
            </Typography.Text>
            <Typography.Text className="font-normal" link onClick={onMoreInfo}>
              查看更多
            </Typography.Text>
          </div>
        </div>
        <ReviewEditModal current={current} onClose={() => setCurrent('')} />
      </Card>
    </>
  );
});

StockProfileCard.displayName = 'StockProfileCard';
