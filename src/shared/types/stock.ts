import { ACCOUNT_ITEM } from '@shared/constants';

/** 股票 ID，格式 {id(number)}:{type(caplized string)}，比如: 600887.SH */
export type IStockId = string;

export interface StockFileter {
  /** pe 范围 */
  pe?: [number | undefined, number | undefined];

  /** 总市值不低于 */
  minTotalMarketCap?: number;

  /** ROE 范围 */
  roe?: [number | undefined, number | undefined];

  /** 上市时长要求 */
  year?: number;

  /** pb 范围 */
  pb?: [number | undefined, number | undefined];
}

export interface IStockProfile {
  /** 股票代码 */
  id: IStockId;

  /** 股票代码 */
  code: string;

  /** 交易所名称 */
  stockExchangeName: string;

  /** 股票中文名 */
  name: string;

  /** 总市值 */
  totalMarketCap: number;

  /** 滚动市盈率 */
  ttmPE: number;

  /** 行业代码 */
  bizId: string;

  /** 行业名称 */
  bizName: string;

  /** 市净率 */
  pb: number;

  /** 滚动 ROE */
  ttmROE: number;

  /** 毛利率 */
  GPR: number;

  /** 当前价格 */
  currentPrice: number;

  /** 涨跌幅 */
  changeRate: number;

  /** 上市日期 */
  date: string;

  /** 上市年份 */
  years: number;
}

export type ItemName = keyof typeof ACCOUNT_ITEM;
export type ReportMonth = 3 | 6 | 9 | 12;
export type FinancialReport = Record<string, string | number | undefined>;

export interface SingleFinancialReport {
  month: ReportMonth;
  year: number;
  data: FinancialReport;
}

export interface IStockWithFinalcialReports extends IStockProfile {
  reports: SingleFinancialReport[];
}

export interface IStockSearchItem {
  stockId: string;
  name: string;
  code: string;
  /** 交易所名称 */
  sType: string;
}

export interface ServiceBizItem {
  SECUCODE: string;
  SECURITY_CODE: string;

  // 2023-06-30 00:00:00
  REPORT_DATE: string;

  // 1 2 3
  MAINOP_TYPE: string;

  // 茅台酒
  ITEM_NAME: string;

  // 59278599200
  MAIN_BUSINESS_INCOME: number;

  // 0.851998
  MBI_RATIO: number;

  // 1 2 3...
  RANK: number;

  /** 毛利率 */
  GROSS_RPOFIT_RATIO: number;
}

export interface BizItem {
  year: number;
  month: ReportMonth;
  /** 占比。例：0.85 */
  ratio: number;
  /** 业务收入 */
  income: number;
  /** 业务名称。例：茅台酒 */
  name: string;
  /** 毛利率 */
  gpr: number;
}

export interface DividendItem {
  /** 7 日回报（未定）例：3.145287906628*/
  DIVIDEND_7DAYS: number;

  /** 股息率。例：7.9423716291 */
  DIVIDEND_RATIO_HYY: number;

  /** 股息率。例：7.9423716291 */
  DIVIDEND_RATIO_YSS: number;

  /** 分红方案 */
  IMPL_PLAN_PROFILE: string | null;

  /** 是否分红日 */
  IS_EX_DIVIDEND_DATE: '0' | '1';

  /** 日期，例：2025-01-22 00:00:00 */
  TRADE_DATE: string;

  /** 货币基金利率，例：1.916 */
  YIELD_7DAYS: number;

  IS_SHOW: '1' | '0';

  SECUCODE: string;
  SECURITY_CODE: string;
  SECURITY_NAME_ABBR: string;
}

export interface ManagerItem {
  /** 高管名称 */
  PERSON_NAME: string;

  /** 薪酬 */
  SALARY: number;

  /** 职位 */
  POSITION: string;
}

export interface ManagerHoldingChangeItem {
  /** 变动日期 */
  END_DATE: string;

  /** 变动人 */
  EXECUTIVE_NAME: string;

  /** 董监高管 */
  HOLDER_NAME: string;

  /** 高管职位 */
  POSITION: string;

  /** 结存股票 */
  CHANGE_AFTER_HOLDNUM: number;

  /** 变动数量 */
  CHANGE_NUM: number;

  /** 与高管关系 */
  EXECUTIVE_RELATION: string;

  /** 交易均价 */
  AVERAGE_PRICE: number;
}

export interface ReportOriginItem {
  /** 意见类型。例：标准无保留意见 */
  OPINION_TYPE: string;

  /** 发布 id */
  PUBLISH_SITUATIONS: string;

  /** 报告时间 */
  REPORT_DATE: string;

  /** 报告时期类型 */
  REPORT_TYPE: string;

  SECUCODE: string;

  SECURITY_CODE: string;

  YEAR: number;
}

export interface ResearchReportItem {
  /** 文章 id */
  art_code: string;

  /** 文档标题 */
  title: string;

  /** 文档标题中文 */
  title_ch: string;

  /** 文档标题英文 */
  title_en: string;

  /** 发布时间 */
  publish_time: string;
}

/** 附件信息 */
export interface AttaceInfo {
  attach_url: string;
  attach_pages: number;
}

/** 缓存的个股或行业研究报告 */
export interface ResearchReportCacheItem extends ResearchReportItem {
  /** 打开过 */
  hasOpend?: boolean;

  /** 喜欢 */
  like?: boolean;

  /** 页数 */
  pageCount?: number;

  /** 前缀（个股名称/行业） */
  prefix?: string;
}

/** 读书笔记 */
export interface NoteItem {
  /** 笔记标题 */
  title: string;

  /** 笔记内容 */
  content: string;
}
