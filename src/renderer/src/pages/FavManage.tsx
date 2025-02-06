import { memo, useEffect, useRef, useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useAtomValue, useSetAtom } from 'jotai';
import { Progress, Card, Typography } from '@douyinfe/semi-ui';
import { currentStockDetailPagePropsAtom, favoriteStockIdListAtom } from '@renderer/models';
import { ProfileData, StockProfile } from '@renderer/components/StockProfile';
import { ApiType, IStockId, KLineType } from '@shared/types';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

interface BatchFetchReturn {
  stockId: IStockId;
  data: ProfileData;
}

const batchFetch = async (stockId: IStockId): Promise<BatchFetchReturn> => {
  const [infoList, day, week] = await Promise.all([
    safelyRequestByIpcWithErrorToast(ApiType.SEARCH_STOCK, stockId),
    safelyRequestByIpcWithErrorToast(ApiType.GET_KDJ_RSI, {
      stockId,
      type: KLineType.DAY,
    }),
    safelyRequestByIpcWithErrorToast(ApiType.GET_KDJ_RSI, {
      stockId,
      type: KLineType.WEEK,
    }),
  ]);
  return {
    stockId,
    data: {
      baseInfo: infoList[0],
      dayRsiAndKdj: day,
      weekRsiAndKdj: week,
    },
  };
};

const computeWeight = ({ dayRsiAndKdj, weekRsiAndKdj }: ProfileData) => {
  const latestDayRsi = dayRsiAndKdj.rsi?.[dayRsiAndKdj.rsi?.length - 1]?.value;
  const latestWeekRsi = weekRsiAndKdj.rsi?.[weekRsiAndKdj.rsi?.length - 1]?.value;
  const latestDayJ = dayRsiAndKdj.j?.[dayRsiAndKdj?.j?.length - 1]?.value;
  const latestWeekJ = weekRsiAndKdj.j?.[weekRsiAndKdj.j?.length - 1]?.value;

  const weights = [
    [latestWeekRsi, 1],
    [latestDayRsi, 0.5],
    [latestWeekJ, 1],
    [latestDayJ, 0.5],
  ];

  return weights.reduce((acc, cur) => acc + cur[0] * cur[1], 0);
};

export const FavManage = memo(() => {
  const favList = useAtomValue(favoriteStockIdListAtom);
  const [dataList, setDataList] = useState<BatchFetchReturn[]>([]);
  const setCurrent = useSetAtom(currentStockDetailPagePropsAtom);
  const timer = useRef(0);

  const lazyPoll = useMemoizedFn(() => {
    if (!favList || favList.length <= dataList.length) {
      return;
    }
    timer.current = window.setTimeout(async () => {
      const curList = favList.slice(dataList.length, dataList.length + 5);
      const newDataList = await Promise.all(curList.map(batchFetch));
      const newList = [...dataList, ...newDataList];
      newList.sort((a, b) => computeWeight(a.data) - computeWeight(b.data));
      setDataList(newList);
      lazyPoll();
    }, 0);
  });

  useEffect(() => {
    if (!favList) {
      return;
    }
    lazyPoll();
    return () => {
      timer.current && window.clearTimeout(timer.current);
    };
  }, [favList]);

  if (!favList || dataList.length < favList.length) {
    return (
      <div className="w-full h-full px-[30%] flex flex-col justify-center">
        <Progress
          size="large"
          percent={
            favList?.length
              ? parseInt(
                  ((Math.min(dataList.length + 5, favList.length) / favList.length) * 100).toFixed(
                    0,
                  ),
                )
              : 0
          }
          showInfo
        />
        <div className="text-semi-color-text-3 text-sm">加载中...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <Typography.Title heading={4} className="my-4">
        <span>收藏个股基础数据</span>
        <span className="text-sm text-semi-color-text-2">（共 {dataList.length} 条数据）</span>
      </Typography.Title>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dataList.map(({ stockId, data }) => (
          <Card key={stockId}>
            <StockProfile
              stockId={stockId}
              onClick={() => setCurrent({ stockId, list: dataList.map((item) => item.stockId) })}
              {...data}
            />
          </Card>
        ))}
      </div>
    </div>
  );
});

FavManage.displayName = 'FavManage';
