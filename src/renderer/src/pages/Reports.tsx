import { memo, useEffect, useMemo, useRef } from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import dayjs from 'dayjs';
import { produce } from 'immer';
import cls from 'classnames';
import { Switch } from '@douyinfe/semi-ui';
import { ApiType, ResearchReportCacheItem } from '@shared/types';
import { useFavStockProfileList } from '@renderer/hooks';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';
import { currentStockDetailPagePropsAtom, ratingMapAtom } from '@renderer/models';
import { useMemoizedFn } from 'ahooks';

const industryRearchReportListAtom = atom<ResearchReportCacheItem[] | null>(null);
const stockResearchReportListAtom = atom<ResearchReportCacheItem[] | null>(null);
const doNotReadHasOpendedAtom = atom(false);

export const Report = memo(() => {
  const { profileList } = useFavStockProfileList();

  const ratingMap = useAtomValue(ratingMapAtom);
  const [industryList, setIndustryList] = useAtom(industryRearchReportListAtom);
  console.log('xss industryList: ', industryList);
  const [stockList, setStockList] = useAtom(stockResearchReportListAtom);
  console.log('xss stockList: ', stockList);
  const setCurrent = useSetAtom(currentStockDetailPagePropsAtom);

  const [doNotReadHasOpended, setDoNotReadHasOpended] = useAtom(doNotReadHasOpendedAtom);

  const industryPollTimeoutRef = useRef<number>(0);
  const stockPollTimeoutRef = useRef<number>(0);

  const bizList = useMemo(
    () =>
      Array.from(
        new Set(
          profileList
            .filter((p) => typeof ratingMap[p.id] === 'number' && ratingMap[p.id] > 0)
            .map((item) => item.bizId),
        ),
      ),
    [],
  );

  const updateCache = useMemoizedFn(
    (
      type: 'industry' | 'stock',
      list: Array<Partial<Omit<ResearchReportCacheItem, 'art_code'>> & { art_code: string }>,
    ) => {
      const originList = type === 'industry' ? industryList : stockList;
      if (!originList) {
        return;
      }
      const update = type === 'industry' ? setIndustryList : setStockList;
      const newCacheData = produce(originList, (draft) => {
        list.forEach((item) => {
          const index = draft.findIndex((i) => i.art_code === item.art_code);
          if (index !== -1) {
            draft[index] = {
              ...draft[index],
              ...item,
            };
          }
        });
      });
      update(newCacheData);
      safelyRequestByIpcWithErrorToast(ApiType.UPDATE_CACHED_RESEARCH_REPORT_LIST, {
        type,
        list: newCacheData,
      });
    },
  );

  const attachPageFetchPoll = useMemoizedFn((type: 'industry' | 'stock') => {
    const ref = type === 'industry' ? industryPollTimeoutRef : stockPollTimeoutRef;

    ref.current = window.setTimeout(async () => {
      const originList = type === 'industry' ? industryList : stockList;
      if (!originList) {
        return;
      }
      const itemsWithoutPageCount = originList.filter((item) => !item.pageCount).slice(0, 50);
      if (!itemsWithoutPageCount.length) {
        return;
      }
      const datas = await Promise.all(
        itemsWithoutPageCount.map(async (item) => {
          const data = await safelyRequestByIpcWithErrorToast(
            ApiType.GET_RESEARCH_REPORT_PDF,
            item.art_code,
          );
          return [item.art_code, data.attach_pages || 0, data.attach_url] as const;
        }),
      );
      updateCache(
        type,
        datas.map(([art_code, pageCount, attach_url]) => ({
          art_code,
          pageCount,
          attach_url,
        })),
      );
      attachPageFetchPoll(type);
    }, 500);
  });

  useEffect(() => {
    if (industryList && stockList) {
      return;
    }
    let didCancel = false;
    (async () => {
      const [industry, stock] = await Promise.all([
        safelyRequestByIpcWithErrorToast(ApiType.GET_CACHED_RESEARCH_REPORT_LIST, 'industry'),
        safelyRequestByIpcWithErrorToast(ApiType.GET_CACHED_RESEARCH_REPORT_LIST, 'stock'),
      ]);
      if (didCancel) {
        return;
      }
      setIndustryList(industry);
      setStockList(stock);
    })();
    return () => {
      didCancel = true;
    };
  }, [industryList, stockList]);

  useEffect(() => {
    if (!profileList.length) {
      return;
    }
    (async () => {
      const stockList = await safelyRequestByIpcWithErrorToast(
        ApiType.GET_CACHED_RESEARCH_REPORT_LIST,
        'stock',
      );
      const reportsList = await Promise.all(
        profileList
          .filter((p) => typeof ratingMap[p.id] === 'number' && ratingMap[p.id] > 0)
          .map(async (profile) => {
            const list = await safelyRequestByIpcWithErrorToast(
              ApiType.GET_RESEARCH_REPORT_LIST,
              profile.id,
            );
            return {
              profile,
              list,
            };
          }),
      );
      reportsList.forEach(({ profile, list }) =>
        list.forEach((report) => {
          if (stockList.some((r) => r.art_code === report.art_code)) {
            return;
          }
          stockList.push({
            ...report,
            prefix: profile.name,
            stockId: profile.id,
          });
        }),
      );
      stockList.sort((a, b) => dayjs(b.publish_time).unix() - dayjs(a.publish_time).unix());
      setStockList(stockList);
      attachPageFetchPoll('stock');
      safelyRequestByIpcWithErrorToast(ApiType.UPDATE_CACHED_RESEARCH_REPORT_LIST, {
        type: 'stock',
        list: stockList,
      });
    })();
  }, [profileList]);

  useEffect(() => {
    if (!bizList.length) {
      return;
    }
    (async () => {
      const industryList = await safelyRequestByIpcWithErrorToast(
        ApiType.GET_CACHED_RESEARCH_REPORT_LIST,
        'industry',
      );
      const reportsList = await Promise.all(
        bizList.map(async (bizId) => {
          const list = await safelyRequestByIpcWithErrorToast(
            ApiType.GET_BUSINESSS_RESEARCH_REPORT_LIST,
            bizId,
          );
          return {
            bizId,
            list,
          };
        }),
      );
      reportsList.forEach(({ bizId, list }) =>
        list.forEach((report) => {
          if (industryList.some((r) => r.art_code === report.art_code)) {
            return;
          }
          industryList.push({
            ...report,
            prefix: bizId,
          });
        }),
      );
      industryList.sort((a, b) => dayjs(b.publish_time).unix() - dayjs(a.publish_time).unix());
      setIndustryList(industryList);
      attachPageFetchPoll('industry');
      safelyRequestByIpcWithErrorToast(ApiType.UPDATE_CACHED_RESEARCH_REPORT_LIST, {
        type: 'industry',
        list: industryList,
      });
    })();
  }, [bizList]);

  useEffect(() => {
    return () => {
      industryPollTimeoutRef.current && window.clearTimeout(industryPollTimeoutRef.current);
      stockPollTimeoutRef.current && window.clearTimeout(stockPollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="w-full flex-none mb-4">
        <div className="flex gap-2">
          <div>不看已读</div>
          <Switch checked={doNotReadHasOpended} onChange={setDoNotReadHasOpended} />
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex gap-4">
        <div className="flex-1 h-full overflow-y-auto">
          {stockList
            ?.filter((item) => item.attach_url && item.pageCount && item.pageCount > 5)
            ?.filter((item) => !doNotReadHasOpended || !item.hasOpend)
            .map((item) => (
              <div
                key={item.art_code}
                className={cls('flex gap-2', { 'opacity-50': item.hasOpend })}
              >
                <div className="font-mono text-semi-color-tertiary">
                  {dayjs(item.publish_time).format('YYYY-MM-DD')}
                </div>
                <div
                  onClick={() => {
                    setCurrent({
                      stockId: item.stockId || '',
                      list: profileList.map((item) => item.id),
                    });
                  }}
                  className="text-semi-color-secondary hover:text-semi-color-secondary-hover cursor-pointer"
                >
                  [{item.prefix}]
                </div>
                <div
                  onClick={() => {
                    if (item.attach_url) {
                      window.open(item.attach_url);
                      updateCache('stock', [{ art_code: item.art_code, hasOpend: true }]);
                    }
                  }}
                  className="text-semi-color-primary hover:text-semi-color-primary-hover cursor-pointer"
                >
                  {item.title}
                </div>
                <div className="text-semi-color-tertiary">({item.pageCount || '-'})</div>
              </div>
            ))}
        </div>
        <div className="flex-1 h-full overflow-y-auto">
          {industryList
            ?.filter((item) => item.attach_url && item.pageCount && item.pageCount > 5)
            ?.filter((item) => !doNotReadHasOpended || !item.hasOpend)
            ?.map((item) => (
              <div
                key={item.art_code}
                className={cls('flex gap-2', { 'opacity-50': item.hasOpend })}
              >
                <div className="font-mono text-semi-color-tertiary">
                  {dayjs(item.publish_time).format('YYYY-MM-DD')}
                </div>
                <div className="text-semi-color-tertiary">[{item.prefix}]</div>
                <div
                  onClick={() => {
                    if (item.attach_url) {
                      window.open(item.attach_url);
                      updateCache('industry', [{ art_code: item.art_code, hasOpend: true }]);
                    }
                  }}
                  className="text-semi-color-primary hover:text-semi-color-primary-hover cursor-pointer"
                >
                  {item.title}
                </div>
                <div className="text-semi-color-tertiary">({item.pageCount || '-'})</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

Report.displayName = 'Report';
