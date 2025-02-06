import { memo } from 'react';
import { Typography, Space, Tag } from '@douyinfe/semi-ui';
import { IconTriangleUp, IconTriangleDown } from '@douyinfe/semi-icons';
import { IStockId, IStockSearchItem, KdjAndRsiResult, KLineType } from '@shared/types';
import { KdJAndRsiChart } from '@renderer/components/KdJAndRsiChart';

export interface ProfileData {
  baseInfo: IStockSearchItem;
  dayRsiAndKdj: KdjAndRsiResult;
  weekRsiAndKdj: KdjAndRsiResult;
}

interface StockProfileProps extends ProfileData {
  stockId: IStockId;
  onClick: () => void;
}

export const StockProfile = memo((props: StockProfileProps) => {
  const { onClick, baseInfo, dayRsiAndKdj, weekRsiAndKdj } = props;

  const latestDayRsi = dayRsiAndKdj.rsi?.[dayRsiAndKdj.rsi?.length - 1]?.value;
  const latestWeekRsi = weekRsiAndKdj.rsi?.[weekRsiAndKdj.rsi?.length - 1]?.value;
  const latestDayJ = dayRsiAndKdj.j?.[dayRsiAndKdj?.j?.length - 1]?.value;
  const latestWeekJ = weekRsiAndKdj.j?.[weekRsiAndKdj.j?.length - 1]?.value;

  const tagRender = (domain: [number, number], suffix?: string, value?: number) => {
    if (!value) {
      return null;
    }
    const lessIcon = value < domain[0] ? <IconTriangleDown size="extra-small" /> : undefined;
    const greaterIcon = value > domain[1] ? <IconTriangleUp size="extra-small" /> : undefined;
    const color = value < domain[0] ? 'green' : value > domain[1] ? 'red' : undefined;
    return (
      <Tag
        type="solid"
        shape="circle"
        prefixIcon={lessIcon || greaterIcon}
        suffixIcon={suffix}
        color={color}
      >
        {value.toFixed(2)}
      </Tag>
    );
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex-none">
        <Typography.Title link heading={6} onClick={onClick}>
          {baseInfo?.name}
        </Typography.Title>
      </div>
      <div className="flex-1 overflow-hidden">
        <Space className="mb-3">
          <div className="text-sm">日 K</div>
          {tagRender([0, 100], 'J', latestDayJ)}
          {tagRender([20, 80], 'RSI', latestDayRsi)}
        </Space>
        <div className="w-full h-32 overflow-hidden">
          <KdJAndRsiChart compact type={KLineType.DAY} data={dayRsiAndKdj} />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Space className="mb-3">
          <div className="text-sm">周 K</div>
          {tagRender([0, 100], 'J', latestWeekJ)}
          {tagRender([20, 80], 'RSI', latestWeekRsi)}
        </Space>
        <div className="w-full h-32 overflow-hidden">
          <KdJAndRsiChart compact type={KLineType.WEEK} data={weekRsiAndKdj} />
        </div>
      </div>
    </div>
  );
});

StockProfile.displayName = 'StockProfile';
