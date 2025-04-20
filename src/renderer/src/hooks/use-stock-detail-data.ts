import { useMemo, useEffect, useState } from 'react';
import {
  ApiType,
  BizItem,
  DividendItem,
  IStockId,
  IStockProfile,
  IStockSearchItem,
  KdjAndRsiResult,
  KLineType,
  ManagerHoldingChangeItem,
  ManagerItem,
  ReportMonth,
  ReportOriginItem,
  ResearchReportItem,
  SingleFinancialReport,
} from '@shared/types';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

interface UseStockDetailDataParams {
  stockId?: IStockId;
  month?: ReportMonth;
}

export const useStockDetailData = (params: UseStockDetailDataParams) => {
  const { stockId, month = 12 } = params;
  const [baseInfo, setBaseInfo] = useState<IStockSearchItem | undefined>(undefined);
  const [profile, setProfile] = useState<IStockProfile | undefined>(undefined);
  const [monthRsiAndKdj, setMonthRsiAndKdj] = useState<KdjAndRsiResult | undefined>(undefined);
  const [weekRsiAndKdj, setWeekRsiAndKdj] = useState<KdjAndRsiResult | undefined>(undefined);
  const [reports, setReports] = useState<SingleFinancialReport[]>([]);
  const [bizItems, setBizItems] = useState<BizItem[]>([]);
  const [dividendItems, setDividendItems] = useState<DividendItem[]>([]);
  const [managerItems, setManagerItems] = useState<ManagerItem[]>([]);
  const [managerHoldingChangeItems, setManagerHoldingChangeItems] = useState<
    ManagerHoldingChangeItem[]
  >([]);
  const [reportOriginItems, setReportOriginItems] = useState<ReportOriginItem[]>([]);
  const [researchReportItems, setResearchReportItems] = useState<ResearchReportItem[]>([]);
  const [bizResearchReportItems, setBizResearchReportItems] = useState<ResearchReportItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      if (!stockId) {
        return;
      }
      try {
        setLoading(true);
        const [pf, reports, infoList, m, week, biz, div, mangers, holdings, origins, researchs] =
          await Promise.all([
            safelyRequestByIpcWithErrorToast(ApiType.GET_STOCK_PROFILE, stockId),
            safelyRequestByIpcWithErrorToast(ApiType.GET_STOCK_SIX_YEAR_FINANCE_REPORTS, {
              years: 7,
              stockId,
              months: [month],
            }),
            safelyRequestByIpcWithErrorToast(ApiType.SEARCH_STOCK, stockId),
            safelyRequestByIpcWithErrorToast(ApiType.GET_KDJ_RSI, {
              stockId,
              type: KLineType.MONTH,
            }),
            safelyRequestByIpcWithErrorToast(ApiType.GET_KDJ_RSI, {
              stockId,
              type: KLineType.WEEK,
            }),
            safelyRequestByIpcWithErrorToast(ApiType.GET_MAIN_BUSINESS_DISTRIBUTION, {
              stockId,
              month: month === 6 ? 6 : 12,
            }),
            safelyRequestByIpcWithErrorToast(ApiType.GET_DIVIDEND_HISTORY, stockId),
            safelyRequestByIpcWithErrorToast(ApiType.GET_MANAGERS, stockId),
            safelyRequestByIpcWithErrorToast(ApiType.GET_MANAGER_HOLDING_CHANGE, stockId),
            safelyRequestByIpcWithErrorToast(ApiType.GET_REPORT_ORIGIN_INFO, stockId),
            safelyRequestByIpcWithErrorToast(ApiType.GET_RESEARCH_REPORT_LIST, stockId),
          ]);
        const bizResearchs = await safelyRequestByIpcWithErrorToast(
          ApiType.GET_BUSINESSS_RESEARCH_REPORT_LIST,
          pf.bizId,
        );
        if (didCancel) {
          return;
        }
        setProfile(pf);
        setReports(reports);
        setBaseInfo(infoList[0]);
        setMonthRsiAndKdj(m);
        setWeekRsiAndKdj(week);
        setBizItems(biz);
        setDividendItems(div);
        setManagerItems(mangers);
        setManagerHoldingChangeItems(holdings);
        setReportOriginItems(origins);
        setResearchReportItems(researchs);
        setBizResearchReportItems(bizResearchs);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      didCancel = true;
    };
  }, [stockId, month]);

  return useMemo(
    () => ({
      loading,
      reports,
      baseInfo,
      monthRsiAndKdj,
      weekRsiAndKdj,
      bizItems,
      dividendItems,
      managerItems,
      managerHoldingChangeItems,
      reportOriginItems,
      profile,
      researchReportItems,
      bizResearchReportItems,
    }),
    [
      loading,
      reports,
      baseInfo,
      monthRsiAndKdj,
      weekRsiAndKdj,
      bizItems,
      dividendItems,
      managerItems,
      managerHoldingChangeItems,
      reportOriginItems,
      profile,
      researchReportItems,
      bizResearchReportItems,
    ],
  );
};
