import { memo, useEffect, useMemo, useRef } from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useMemoizedFn } from 'ahooks';
import dayjs from 'dayjs';
import { produce } from 'immer';
import cls from 'classnames';
import { Switch } from '@douyinfe/semi-ui';
import { ApiType, ResearchReportCacheItem } from '@shared/types';
import { useFavStockProfileList } from '@renderer/hooks';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';
import { currentStockDetailPagePropsAtom, ratingMapAtom } from '@renderer/models';

const earliestTimeUnix = dayjs().add(-6, 'month').unix();

const industryResearchReportListAtom = atom<ResearchReportCacheItem[] | null>(null);
const stockResearchReportListAtom = atom<ResearchReportCacheItem[] | null>(null);
const doNotReadHasOpendedAtom = atom(false);

export const Report = memo(() => {
  const { profileList } = useFavStockProfileList();

  const ratingMap = useAtomValue(ratingMapAtom);
  const [industryList, setIndustryList] = useAtom(industryResearchReportListAtom);
  const [stockList, setStockList] = useAtom(stockResearchReportListAtom);
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
    }, 2_500);
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
      setIndustryList(
        industry.filter((item) => dayjs(item.publish_time).unix() > earliestTimeUnix),
      );
      setStockList(stock.filter((item) => dayjs(item.publish_time).unix() > earliestTimeUnix));
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
          if (dayjs(report.publish_time).unix() <= earliestTimeUnix) {
            return;
          }
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
          if (dayjs(report.publish_time).unix() <= earliestTimeUnix) {
            return;
          }
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
    <div className="w-full h-full flex flex-col p-4 text-semi-color-text-1">
      <div className="w-full flex-none mb-2 flex">
        <div className="text-lg font-bold">个股和行业研究报告</div>
        <div className="flex gap-2 ml-auto">
          <div>不看已读</div>
          <Switch checked={doNotReadHasOpended} onChange={setDoNotReadHasOpended} />
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex gap-4">
        <div className="flex-1 h-full overflow-y-auto">
          <div className="font-bold mb-2">个股研报</div>
          {stockList
            ?.filter((item) => item.attach_url && item.pageCount && item.pageCount > 5)
            ?.filter((item) => !doNotReadHasOpended || !item.hasOpend)
            .map((item) => (
              <div
                key={item.art_code}
                className={cls('flex gap-2 overflow-hidden', { 'opacity-50': item.hasOpend })}
              >
                <div className="flex-none font-mono text-semi-color-tertiary">
                  {dayjs(item.publish_time).format('YYYY-MM-DD')}
                </div>
                <div
                  onClick={() => {
                    setCurrent({
                      stockId: item.stockId || '',
                      list: profileList.map((item) => item.id),
                    });
                  }}
                  className="w-[76px] flex-none text-semi-color-secondary hover:text-semi-color-secondary-active cursor-pointer"
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
                  className="flex-shrink text-ellipsis whitespace-nowrap overflow-hidden text-semi-color-primary hover:text-semi-color-primary-active cursor-pointer"
                >
                  {item.title}
                </div>
                <div className="flex-none text-semi-color-tertiary">({item.pageCount || '-'})</div>
              </div>
            ))}
        </div>
        <div className="flex-1 h-full overflow-y-auto">
          <div className="font-bold mb-2">行业研报</div>
          {industryList
            ?.filter((item) => item.attach_url && item.pageCount && item.pageCount > 5)
            ?.filter((item) => !doNotReadHasOpended || !item.hasOpend)
            ?.map((item) => (
              <div
                key={item.art_code}
                className={cls('flex gap-2 overflow-hidden', { 'opacity-50': item.hasOpend })}
              >
                <div className="flex-none font-mono text-semi-color-tertiary">
                  {dayjs(item.publish_time).format('YYYY-MM-DD')}
                </div>
                <div className="flex-none text-semi-color-tertiary">[{item.prefix}]</div>
                <div
                  onClick={() => {
                    if (item.attach_url) {
                      window.open(item.attach_url);
                      updateCache('industry', [{ art_code: item.art_code, hasOpend: true }]);
                    }
                  }}
                  className="flex-shrink overflow-hidden text-ellipsis whitespace-nowrap text-semi-color-primary hover:text-semi-color-primary-hover cursor-pointer"
                >
                  {item.title}
                </div>
                <div className="flex-none text-semi-color-tertiary">({item.pageCount || '-'})</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

Report.displayName = 'Report';
