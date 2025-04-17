import { KdjAndRsiResult, KLineItem, KLineType } from './klines';
import {
  BizItem,
  DividendItem,
  IStockId,
  IStockProfile,
  IStockSearchItem,
  ManagerHoldingChangeItem,
  ManagerItem,
  ReportMonth,
  ReportOriginItem,
  ResearchReportItem,
  SingleFinancialReport,
  StockFileter,
} from './stock';

export enum MetaDataKey {
  DATA_DIRECOTRY = 'data-directory',
  FILTER_DATA = 'filter-data',
}

export interface MetaDataType {
  [MetaDataKey.DATA_DIRECOTRY]: string;
  [MetaDataKey.FILTER_DATA]: StockFileter;
}

export enum ApiType {
  /** 通过过滤器获取股票基本信息 */
  GET_STOCK_PROFILE_LIST_BY_FILTER = 'get-stock-list-by-filter',

  /** 通过过滤器更新股票基本信息 */
  UPDATE_STOCK_PROFILE_LIST_BY_FILTER = 'update-stock-list-by-filter',

  /** 通过缓存获取股票基本信息 */
  GET_STOCK_PROFILE_LIST_IN_CACHE = 'get-stock-list-in-cache',

  /** 获取收藏的股票 id */
  GET_FAVORITE_STOCK_ID_LIST = 'get-favorite-stock-id-list',

  /** 获取评分 map 数据 */
  GET_RATING_MAP = 'get-rating-map',

  /** 更新评分 map 数据 */
  UPDATE_RATING_MAP = 'update-rating-map',

  /** 获取股票黑名单数据 */
  GET_BLACKLIST = 'get-black-list',

  /** 更新股票黑名单数据 */
  UPDATE_BLACKLIST = 'update-black-list',

  /** 获取评论 map 数据 */
  GET_REVIEW_MAP = 'get-review-map',

  /** 更新评论 map 数据 */
  UPDATE_REVIEW_MAP = 'update-review-map',

  /** 获取股票基本信息 */
  GET_STOCK_PROFILE = 'get-stock-profile',

  /** 更新收藏的股票 id */
  UPDATE_FAVORITE_STOCK_ID_LIST = 'update-favorite-stock-id-list',

  /** 获取数据缓存目录 */
  GET_DATA_DIRECTORY = 'get-data-directory',

  /** 更新数据缓存目录 */
  UPDATE_DATA_DIRECTORY = 'update-data-directory',

  /** 通过系统文件选择器获取数据缓存目录 */
  GET_DATA_DIRECTORY_BY_SYSTEM_FILE_SELECTOR = 'get-data-directory-by-system-file-selector',

  /** 获取过滤器数据 */
  GET_FILTER_DATA = 'get-filter-data',

  /** 更新过滤器数据 */
  UPDATE_FILTER_DATA = 'update-filter-data',

  /** 获取股票某一特定年月的财务报表 */
  GET_SINGLE_FINANCIAL_REPORT = 'get-single-financial-report',

  /** 获取股票六年财务报表 */
  GET_STOCK_SIX_YEAR_FINANCE_REPORTS = 'get-stock-six-year-finance-reports',

  /** 获取股票主要指标 */
  GET_LEADING_INDICATORS = 'get-leading-indicators',

  /** 获取 K 线图数据 */
  GET_K_LINES_DATA = 'get-k-lines-data',

  /** 获取 KDJ 和 RSI 指标 */
  GET_KDJ_RSI = 'get-kdj-rsi',

  /** 搜索个股 */
  SEARCH_STOCK = 'search-stock',

  /** 获取公司主营业务构成 */
  GET_MAIN_BUSINESS_DISTRIBUTION = 'get-main-business-distribution',

  /** 公司历史分红列表 */
  GET_DIVIDEND_HISTORY = 'get-dividend-history',

  /** 高管列表 */
  GET_MANAGERS = 'get-managers',

  /** 高管及相关人员持股变动 */
  GET_MANAGER_HOLDING_CHANGE = 'get-manager-holding-change',

  /** 财务报表原始信息 */
  GET_REPORT_ORIGIN_INFO = 'get-report-origin-info',

  /** 获取 pdf 文件网页链接 */
  GET_PDF_URL = 'get-pdf-url',

  /** 获取研报内容 */
  GET_RESEARCH_REPORT_PDF_URL = 'get-research-report-pdf-url',

  /** 获取研报列表 */
  GET_RESEARCH_REPORT_LIST = 'get-research-report-list',

  /** 获取行业研报列表 */
  GET_BUSINESSS_RESEARCH_REPORT_LIST = 'get-businesss-research-report-list',
}

export interface ApiRequestPamrasMap {
  [ApiType.UPDATE_RATING_MAP]: Record<string, number>;
  [ApiType.UPDATE_REVIEW_MAP]: Record<string, string | undefined>;
  [ApiType.UPDATE_BLACKLIST]: string[];
  [ApiType.UPDATE_FAVORITE_STOCK_ID_LIST]: string[];
  [ApiType.UPDATE_DATA_DIRECTORY]: string;
  [ApiType.GET_STOCK_PROFILE]: string;
  [ApiType.GET_STOCK_PROFILE_LIST_BY_FILTER]: StockFileter;
  [ApiType.UPDATE_STOCK_PROFILE_LIST_BY_FILTER]: IStockProfile[];
  [ApiType.UPDATE_FILTER_DATA]: Partial<StockFileter>;
  [ApiType.GET_STOCK_SIX_YEAR_FINANCE_REPORTS]: {
    stockId: IStockId;
    years?: number;
    months?: ReportMonth[];
  };
  [ApiType.GET_LEADING_INDICATORS]: IStockId;
  [ApiType.GET_K_LINES_DATA]: {
    stockId: IStockId;
    type: KLineType;
  };
  [ApiType.GET_KDJ_RSI]: {
    stockId: IStockId;
    type: KLineType;
  };
  [ApiType.SEARCH_STOCK]: string;
  [ApiType.GET_MAIN_BUSINESS_DISTRIBUTION]: {
    stockId: IStockId;
    month: ReportMonth;
  };
  [ApiType.GET_DIVIDEND_HISTORY]: IStockId;
  [ApiType.GET_MANAGERS]: IStockId;
  [ApiType.GET_MANAGER_HOLDING_CHANGE]: IStockId;
  [ApiType.GET_REPORT_ORIGIN_INFO]: IStockId;
  [ApiType.GET_PDF_URL]: string;
  [ApiType.GET_RESEARCH_REPORT_PDF_URL]: string;
  [ApiType.GET_RESEARCH_REPORT_LIST]: string;
  [ApiType.GET_BUSINESSS_RESEARCH_REPORT_LIST]: string;
}

export interface ApiRequestReturnMap {
  [ApiType.GET_RATING_MAP]: Record<string, number>;
  [ApiType.GET_REVIEW_MAP]: Record<string, string | undefined>;
  [ApiType.GET_BLACKLIST]: string[];
  [ApiType.GET_FAVORITE_STOCK_ID_LIST]: string[];
  [ApiType.GET_STOCK_PROFILE]: IStockProfile;
  [ApiType.GET_STOCK_PROFILE_LIST_IN_CACHE]: IStockProfile[] | undefined;
  [ApiType.GET_STOCK_PROFILE_LIST_BY_FILTER]: IStockProfile[];
  [ApiType.GET_DATA_DIRECTORY_BY_SYSTEM_FILE_SELECTOR]: string;
  [ApiType.GET_DATA_DIRECTORY]: string | undefined;
  [ApiType.UPDATE_DATA_DIRECTORY]: undefined;
  [ApiType.GET_FILTER_DATA]: StockFileter;
  [ApiType.GET_STOCK_SIX_YEAR_FINANCE_REPORTS]: SingleFinancialReport[];
  [ApiType.GET_LEADING_INDICATORS]: SingleFinancialReport[];
  [ApiType.GET_K_LINES_DATA]: KLineItem[];
  [ApiType.GET_KDJ_RSI]: KdjAndRsiResult;
  [ApiType.SEARCH_STOCK]: IStockSearchItem[];
  [ApiType.GET_MAIN_BUSINESS_DISTRIBUTION]: BizItem[];
  [ApiType.GET_DIVIDEND_HISTORY]: DividendItem[];
  [ApiType.GET_MANAGERS]: ManagerItem[];
  [ApiType.GET_MANAGER_HOLDING_CHANGE]: ManagerHoldingChangeItem[];
  [ApiType.GET_REPORT_ORIGIN_INFO]: ReportOriginItem[];
  [ApiType.GET_PDF_URL]: string;
  [ApiType.GET_RESEARCH_REPORT_PDF_URL]: string;
  [ApiType.GET_RESEARCH_REPORT_LIST]: ResearchReportItem[];
  [ApiType.GET_BUSINESSS_RESEARCH_REPORT_LIST]: ResearchReportItem[];
}

export interface ApiRequestBaseReturn<T> {
  isSuccess: boolean;
  data?: T;
  code?: string;
  message?: string;
}

export type ApiRequestRawFunc<T extends ApiType> = (
  params: T extends keyof ApiRequestPamrasMap ? ApiRequestPamrasMap[T] : undefined,
) => Promise<T extends keyof ApiRequestReturnMap ? ApiRequestReturnMap[T] : undefined>;

export type ApiFuncMap = {
  [T in ApiType]: ApiRequestRawFunc<T>;
};
