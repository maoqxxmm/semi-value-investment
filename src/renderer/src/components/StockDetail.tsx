import { memo, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Breadcrumb,
  Button,
  Pagination,
  Space,
  Spin,
  Divider,
  Rating,
  Modal,
  TextArea,
} from '@douyinfe/semi-ui';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import { IStockId, KLineType } from '@shared/types';
import { CombinedLineChartWithCard } from '@renderer/components/CombinedLineChart';
import { DividendLineChartWithCard } from '@renderer/components/DividentLineChart';
import { ReportOriginListCard } from '@renderer/components/ReportOriginListCard';
import { ProfitabilityChartWithCard } from '@renderer/components/ProfitabilityChart';
import { BizPieChartWithCard } from '@renderer/components/BizPieChart';
import { CostLineChartWithCard } from '@renderer/components/CostLineChart';
import { BalanceSheetChartWithCard } from '@renderer/components/BalanceSheetChart';
import { KdJAndRsiChartWithCard } from '@renderer/components/KdJAndRsiChart';
import { ManagerTableWithCard } from '@renderer/components/ManagerTable';
import { ManagerHoldingChangeTableWithCard } from '@renderer/components/ManagerHoldingChangeTable';
import { ResearchReportListCard } from '@renderer/components/ResearchReportListCard';
import { BizResearchReportListCard } from '@renderer/components/BizResearchReportListCard';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentStockDetailPagePropsAtom,
  favoriteStockIdSetAtom,
  monthAtom,
  ratingMapAtom,
  reviewMapAtom,
  stockProfileListAtom,
  updateFavoriteStockAtom,
} from '@renderer/models';
import { ACCOUNT_ITEM, BalanceSheetType, TOTAL_KEY_IN_BALANCE_SHEET } from '@shared/constants';
import { useStockDetailData } from '@renderer/hooks';

export const StockDetail = memo(() => {
  const [ratingMap, setRatingMap] = useAtom(ratingMapAtom);
  const [reviewMap, setReviewMap] = useAtom(reviewMapAtom);
  const favSet = useAtomValue(favoriteStockIdSetAtom);
  const profileList = useAtomValue(stockProfileListAtom);
  const month = useAtomValue(monthAtom);
  const updateFav = useSetAtom(updateFavoriteStockAtom);
  const [current, setCurrent] = useAtom(currentStockDetailPagePropsAtom);

  const [editModalInfo, setEditModalInfo] = useState<{ id: IStockId; review?: string } | undefined>(
    undefined,
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    loading,
    reports,
    baseInfo,
    dayRsiAndKdj,
    weekRsiAndKdj,
    bizItems,
    dividendItems,
    managerItems,
    managerHoldingChangeItems,
    reportOriginItems,
    profile,
    researchReportItems,
    bizResearchReportItems,
  } = useStockDetailData({
    stockId: current?.stockId,
    month,
  });

  const list = useMemo(
    () => current?.list || profileList.map((item) => item.id),
    [current?.list, profileList],
  );
  const index = useMemo(
    () => (current ? list.findIndex((item) => item === current.stockId) : -1),
    [list, current],
  );

  const balanceSheetMax = useMemo(() => {
    const types: BalanceSheetType[] = [
      'current-asset',
      'current-debt',
      'non-currnet-asset',
      'non-current-debt',
    ];
    const max = Math.max(
      ...types.flatMap((type) =>
        reports.map((report) =>
          Number(report.data[ACCOUNT_ITEM[TOTAL_KEY_IN_BALANCE_SHEET[type]]]),
        ),
      ),
    );
    let first = Number(max.toString()[0]);
    let second = Math.round(Math.floor(Math.max(0, Number(max.toString()[1]) - 1) / 2 + 1) * 2);
    first += second >= 10 ? 1 : 0;
    second = Math.min(second, 9);
    const length = Math.ceil(max).toString().length - 2;
    return Math.round(Number(`${first + (second >= 10 ? 1 : 0)}${second}${'0'.repeat(length)}`));
  }, [reports]);

  if (!current?.stockId) {
    return null;
  }

  const render = () => {
    return (
      <>
        <div className="my-4 grid gap-4 grid-cols-3 h-[300px]">
          <ProfitabilityChartWithCard reports={reports} cap={profile?.totalMarketCap || 0} />
          <BizPieChartWithCard bizItems={bizItems} />
          <CostLineChartWithCard reports={reports} />
        </div>
        <div className="my-4 grid gap-4 grid-cols-2 2xl:grid-cols-4 h-[320px]">
          <BalanceSheetChartWithCard max={balanceSheetMax} reports={reports} type="current-asset" />
          <BalanceSheetChartWithCard
            max={balanceSheetMax}
            reports={reports}
            type="non-currnet-asset"
          />
          <BalanceSheetChartWithCard max={balanceSheetMax} reports={reports} type="current-debt" />
          <BalanceSheetChartWithCard
            max={balanceSheetMax}
            reports={reports}
            type="non-current-debt"
          />
        </div>
        <div className="my-4 grid gap-4 grid-cols-2 h-[320px]">
          <KdJAndRsiChartWithCard type={KLineType.DAY} data={dayRsiAndKdj} />
          <KdJAndRsiChartWithCard type={KLineType.WEEK} data={weekRsiAndKdj} />
        </div>
        <div className="my-4 grid gap-4 grid-cols-3 h-[320px]">
          <CombinedLineChartWithCard reports={reports} />
          <DividendLineChartWithCard dividentItems={dividendItems} />
          <ReportOriginListCard items={reportOriginItems} />
        </div>
        <div className="my-4 gap-4 flex h-[320px]">
          <div className="flex-[2] h-full overflow-hidden">
            <ManagerTableWithCard managerItems={managerItems} />
          </div>
          <div className="flex-[3] h-full overflow-hidden">
            <ManagerHoldingChangeTableWithCard changes={managerHoldingChangeItems} />
          </div>
        </div>
        <div className="my-4 grid gap-4 grid-cols-2 h-[320px]">
          <ResearchReportListCard items={researchReportItems} />
          <BizResearchReportListCard items={bizResearchReportItems} />
        </div>
        <Divider align="center" margin={48}>
          没有更多的内容了
        </Divider>
      </>
    );
  };

  const onModalEditOk = () => {
    if (editModalInfo) {
      setReviewMap((pre) => ({ ...pre, [editModalInfo.id]: editModalInfo.review }));
    }
    setEditModalInfo(undefined);
  };

  return createPortal(
    <div className="fixed w-full h-[calc(100%-60px)] top-[60px] left-0 bg-semi-color-bg-0">
      <Spin
        wrapperClassName="w-full h-full"
        childStyle={{ height: '100%', width: '100%' }}
        spinning={loading}
      >
        <div className="w-full h-full pt-4 flex flex-col">
          <div className="flex-none flex justify-between mb-4 px-8">
            <Breadcrumb compact={false}>
              <Breadcrumb.Item icon={<IconChevronLeft />} onClick={() => setCurrent(undefined)}>
                返回
              </Breadcrumb.Item>
              <Breadcrumb.Item noLink>
                <Space>
                  <div>{current.stockId}</div>
                  <div>{baseInfo?.name}</div>
                </Space>
              </Breadcrumb.Item>
            </Breadcrumb>
            {list.length ? (
              <Pagination
                size="small"
                hoverShowPageSelect
                pageSize={1}
                total={list.length}
                currentPage={index + 1}
                onChange={(i) => setCurrent((pre) => ({ ...pre, stockId: list[i - 1] }))}
              />
            ) : null}
          </div>
          <div className="flex-1 overflow-auto px-8">
            <div className="w-full flex gap-2 items-center justify-between py-[2px]">
              <div className="flex items-center gap-2">
                <div>PE:</div>
                <div>{((profile?.ttmPE || 0) / 100).toFixed(2)}</div>
                <Divider layout="vertical" />
                <div>评分:</div>
                <Rating
                  className="h-[22px]"
                  size="small"
                  allowClear
                  value={ratingMap[current.stockId] || 0}
                  onChange={(value) =>
                    setRatingMap((pre) => ({ ...pre, [current.stockId]: value }))
                  }
                />
                <Divider layout="vertical" />
                <div>评价:</div>
                <div className="text-sm text-semi-color-text-3">
                  {reviewMap[current.stockId] || '--'}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    setEditModalInfo({ id: current.stockId, review: reviewMap[current.stockId] });
                    setTimeout(() => textAreaRef.current?.focus(), 0);
                  }}
                >
                  编辑评价
                </Button>
                <Button
                  onClick={() =>
                    baseInfo &&
                    window.open(
                      `https://emweb.securities.eastmoney.com/pc_hsf10/pages/index.html?type=web&code=${baseInfo.sType}${baseInfo.code}#/cwfx`,
                    )
                  }
                >
                  东财数据
                </Button>
                <Button onClick={() => updateFav(current.stockId, 'toggle')}>
                  {favSet.has(current.stockId) ? '取消收藏' : '收藏'}
                </Button>
              </div>
            </div>
            {render()}
          </div>
        </div>
      </Spin>
      <Modal
        width="min(90%, 600px)"
        onCancel={() => setEditModalInfo(undefined)}
        visible={!!editModalInfo}
        title="评价内容"
        onOk={onModalEditOk}
        okText="确认 (⌘+Enter)"
      >
        <TextArea
          ref={textAreaRef}
          rows={3}
          value={editModalInfo?.review}
          onChange={(value) =>
            setEditModalInfo((pre) => (pre?.id ? { ...pre, review: value } : undefined))
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.metaKey) {
              onModalEditOk();
              e.preventDefault();
            }
          }}
        />
      </Modal>
    </div>,
    document.body,
  );
});

StockDetail.displayName = 'StockDetail';
