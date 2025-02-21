import { memo, useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { IconTriangleUp, IconTriangleDown } from '@douyinfe/semi-icons';
import { Typography, Card, Rating, Divider, Tag } from '@douyinfe/semi-ui';
import { ratingMapAtom, reviewMapAtom, updateRatingMapAtom } from '@renderer/models';
import { ApiType, IStockProfile, KLineType } from '@shared/types';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

interface StockProfileCardProps {
  profile: IStockProfile;
  onMoreInfo: () => void;
}

interface MonthAndWeekJAndRsi {
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
  highContrast?: boolean;
}

const tagRender = (params: TagRenderParams) => {
  const { domain, suffix, value, highContrast } = params;
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
      type={highContrast ? 'solid' : 'light'}
      shape="circle"
      prefixIcon={icon}
      suffixIcon={suffix}
      color={color}
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

  const [monthAndWeekJAndRsi, setMonthAndWeekJAndRsi] = useState<MonthAndWeekJAndRsi | undefined>(
    undefined,
  );

  useEffect(() => {
    let didCancel = false;
    (async () => {
      const [month, week] = await Promise.all([
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
      setMonthAndWeekJAndRsi({
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
        {monthAndWeekJAndRsi ? (
          <>
            {tagRender({ domain: [0, 100], suffix: 'J', value: monthAndWeekJAndRsi.week.j })}
            {tagRender({ domain: [20, 80], suffix: 'RSI', value: monthAndWeekJAndRsi.week.rsi })}
            {tagRender({
              domain: [0, 100],
              suffix: 'J',
              value: monthAndWeekJAndRsi.month.j,
              highContrast: true,
            })}
            {tagRender({
              domain: [20, 80],
              suffix: 'RSI',
              value: monthAndWeekJAndRsi.month.rsi,
              highContrast: true,
            })}
          </>
        ) : null}
      </div>
      <Divider className="my-3" />
      <div className="flex items-center justify-between">
        <Rating
          className="h-[22px]"
          size="small"
          value={ratingMap[profile.id] || 0}
          onChange={(value) => updateRatingMap({ ...ratingMap, [profile.id]: value })}
        />
        <Typography.Text link onClick={onMoreInfo}>
          查看更多
        </Typography.Text>
      </div>
    </Card>
  );
});

StockProfileCard.displayName = 'StockProfileCard';
