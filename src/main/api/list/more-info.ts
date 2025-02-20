import {
  ApiFuncMap,
  ApiType,
  BizItem,
  DividendItem,
  ManagerHoldingChangeItem,
  ManagerItem,
  ReportMonth,
  ReportOriginItem,
  ResearchReportItem,
  ServiceBizItem,
} from '@shared/types';
import dayjs from 'dayjs';
import { axiosGet, makeSureIsArray } from '@main/utils';

const apiMap: Pick<
  ApiFuncMap,
  | ApiType.GET_MAIN_BUSINESS_DISTRIBUTION
  | ApiType.GET_DIVIDEND_HISTORY
  | ApiType.GET_MANAGERS
  | ApiType.GET_MANAGER_HOLDING_CHANGE
  | ApiType.GET_REPORT_ORIGIN_INFO
  | ApiType.GET_PDF_URL
  | ApiType.GET_RESEARCH_REPORT_PDF_URL
  | ApiType.GET_RESEARCH_REPORT_LIST
  | ApiType.GET_BUSINESSS_RESEARCH_REPORT_LIST
> = {
  [ApiType.GET_MAIN_BUSINESS_DISTRIBUTION]: async ({ stockId, month }) => {
    const url = 'https://datacenter.eastmoney.com/securities/api/data/v1/get';
    const res = await axiosGet(url, {
      reportName: 'RPT_F10_FN_MAINOP',
      columns:
        'SECUCODE,SECURITY_CODE,REPORT_DATE,MAINOP_TYPE,ITEM_NAME,MAIN_BUSINESS_INCOME,MBI_RATIO,MAIN_BUSINESS_COST,MBC_RATIO,MAIN_BUSINESS_RPOFIT,MBR_RATIO,GROSS_RPOFIT_RATIO,RANK',
      filter: `(SECUCODE="${stockId}")`,
      pageNumber: '1',
      pageSize: '200',
      sortTypes: '-1,1,1',
      sortColumns: 'REPORT_DATE,MAINOP_TYPE,RANK',
      source: 'HSF10',
      client: 'PC',
    });

    if (res.code !== 0) {
      return [];
    }

    const list = makeSureIsArray(res.result.data) as ServiceBizItem[];

    const bizList: BizItem[] = [];
    list.forEach((item) => {
      // 2 按照产品分类，3 按照地区分类
      if (item.MAINOP_TYPE !== '2') {
        return;
      }
      const [year, monthStr] = item.REPORT_DATE.split(' ')[0].split('-');
      const data: BizItem = {
        year: Number(year),
        month: Number(monthStr) as ReportMonth,
        ratio: item.MBI_RATIO,
        income: item.MAIN_BUSINESS_INCOME,
        name: item.ITEM_NAME,
        gpr: item.GROSS_RPOFIT_RATIO,
      };
      if (data.month === month) {
        bizList.push(data);
      }
    });

    return bizList;
  },
  [ApiType.GET_DIVIDEND_HISTORY]: async (stockId) => {
    const url = 'https://datacenter.eastmoney.com/securities/api/data/v1/get';
    const res = await axiosGet(url, {
      reportName: 'RPT_F10_DIVIDEND_CURVE',
      columns: 'ALL',
      filter: `(SECUCODE="${stockId}")(TRADE_DATE>='${dayjs().add(-3, 'year').format('YYYY-MM-DD')}')`,
      pageNumber: 1,
      sortTypes: 1,
      sortColumns: 'TRADE_DATE',
      source: 'HSF10',
      client: 'PC',
    });
    return makeSureIsArray<DividendItem>(res?.result?.data).map((item) => ({
      ...item,
      TRADE_DATE: dayjs(item.TRADE_DATE).format('YYYY-MM-DD'),
    }));
  },
  [ApiType.GET_MANAGERS]: async (stockId) => {
    const url = 'https://datacenter.eastmoney.com/securities/api/data/v1/get';
    const res = await axiosGet(url, {
      reportName: 'RPT_F10_ORGINFO_MANAINTRO',
      columns: 'ALL',
      filter: `(SECUCODE="${stockId}")`,
      pageNumber: 1,
      source: 'HSF10',
      client: 'PC',
    });
    return makeSureIsArray<ManagerItem>(res?.result?.data);
  },
  [ApiType.GET_MANAGER_HOLDING_CHANGE]: async (stockId) => {
    const url = 'https://datacenter.eastmoney.com/securities/api/data/v1/get';
    const res = await axiosGet(url, {
      reportName: 'RPT_F10_TRADE_EXCHANGEHOLD',
      columns:
        'SECUCODE,SECURITY_CODE,SECURITY_INNER_CODE,SECURITY_NAME_ABBR,SECURITY_PINYIN,ORG_CODE,END_DATE,HOLDER_NAME,CHANGE_NUM,AVERAGE_PRICE,CHANGE_AFTER_HOLDNUM,TRADE_WAY,EXECUTIVE_NAME,POSITION,EXECUTIVE_RELATION',
      filter: `(SECUCODE="${stockId}")`,
      pageNumber: 1,
      pageSize: 100,
      sortTypes: -1,
      sortColumns: 'END_DATE',
      source: 'HSF10',
      client: 'PC',
    });
    return makeSureIsArray<ManagerHoldingChangeItem>(res?.result?.data);
  },
  [ApiType.GET_REPORT_ORIGIN_INFO]: async (stockId) => {
    const url = 'https://datacenter.eastmoney.com/securities/api/data/v1/get';
    const res = await axiosGet(url, {
      reportName: 'RPT_PCF10_ORIG_REPORT',
      columns:
        'YEAR,SECUCODE,SECURITY_CODE,REPORT_DATE,REPORT_TYPE,PUBLISH_SITUATIONS,OPINION_TYPE',
      filter: `(SECUCODE="${stockId}")`,
      pageNumber: 1,
      sortTypes: -1,
      sortColumns: 'REPORT_DATE',
      source: 'HSF10',
      client: 'PC',
    });
    return makeSureIsArray<ReportOriginItem>(res?.result?.data);
  },
  [ApiType.GET_PDF_URL]: async (article) => {
    const url = 'https://np-cnotice-stock.eastmoney.com/api/content/ann';
    const res = await axiosGet(url, {
      art_code: `${article}`,
      client_source: 'web',
      page_index: '1',
    });
    return res.data.attach_url;
  },
  [ApiType.GET_RESEARCH_REPORT_LIST]: async (stockId) => {
    const [code, sType] = stockId.split('.');
    const url = 'https://np-areport-pc.eastmoney.com/api/security/rep';
    const res = await axiosGet(url, {
      client_source: 'web',
      business: 'f10',
      page_index: 1,
      page_size: 999,
      begin_time: dayjs().add(-3, 'year').format('YYYY-MM-DD'),
      end_time: dayjs().format('YYYY-MM-DD'),
      stock_list: `${sType.toLowerCase() === 'sh' ? '1' : '0'}.${code}`,
      type: 'A',
      report_type: '0,1',
    });
    return makeSureIsArray<ResearchReportItem>(res?.data?.list);
  },
  [ApiType.GET_RESEARCH_REPORT_PDF_URL]: async (article) => {
    const url = 'https://np-creport-pc.eastmoney.com/api/content/rep';
    const res = await axiosGet(url, {
      art_code: `${article}`,
      client_source: 'web',
      page_index: '1',
    });
    return res.data.attach_url;
  },
  [ApiType.GET_BUSINESSS_RESEARCH_REPORT_LIST]: async (bizId) => {
    const url = 'https://np-areport-pc.eastmoney.com/api/security/rep';
    const res = await axiosGet(url, {
      client_source: 'web',
      business: 'f10',
      page_index: 1,
      page_size: 999,
      begin_time: dayjs().add(-3, 'year').format('YYYY-MM-DD'),
      end_time: dayjs().format('YYYY-MM-DD'),
      indu_old_industry_code: Number(bizId.replace('BK', '')),
      report_type: '2',
    });
    return makeSureIsArray<ResearchReportItem>(res?.data?.list);
  },
};

export default apiMap;
