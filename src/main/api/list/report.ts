import { ApiFuncMap, ApiType, SingleFinancialReport, ReportMonth } from '@shared/types';
import { axiosGet, makeSureIsArray } from '@main/utils';
import dayjs from 'dayjs';

const DATES_EX_YEAR: Array<{ month: ReportMonth; str: string }> = [
  { month: 9, str: '-09-30' },
  { month: 6, str: '-06-30' },
  { month: 3, str: '-03-31' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const genFinancialReport = (item: any): SingleFinancialReport => {
  const date = item['REPORT_DATE'];
  const [year, monthStr] = date.toString().split('-');
  let month: ReportMonth = 12;
  if (monthStr === '06') {
    month = 6;
  } else if (monthStr === '09') {
    month = 9;
  } else if (monthStr === '03') {
    month = 3;
  }
  return {
    month,
    year: Number(year),
    data: item,
  };
};

export type ReportParams = {
  /** 4 */
  companyType: number;
  /** 0 */
  reportDateType: number;
  /** 2 */
  ReportMonth: number;
  dates: string[];
  code: string;
};

interface getReportsRequestParams {
  code: string;
  cType: number;
  hostname: string;
  path: string;
  years: number;
  months: ReportMonth[];
}

const getReportsRequest = async (params: getReportsRequestParams) => {
  const { code, cType, hostname, path, years, months } = params;

  const dates: string[] = [];
  if (months.includes(12)) {
    let year = Number(dayjs().format('YYYY'));
    if (dayjs().unix() < dayjs(`${year}-3-31`).unix()) {
      year -= 2;
    } else {
      year -= 1;
    }
    Array.from({ length: years })
      .fill(0)
      .forEach((_, index) => dates.push(`${year - index}-12-31`));
  }
  DATES_EX_YEAR.forEach(({ month, str }) => {
    if (months.includes(month)) {
      let year = Number(dayjs().format('YYYY'));
      if (dayjs().unix() < dayjs(`${year}${str}`).unix()) {
        year -= 1;
      }
      Array.from({ length: years })
        .fill(0)
        .forEach((_, index) => dates.push(`${year - index}${str}`));
    }
  });

  const body = {
    companyType: String(cType),
    reportDateType: '0',
    reportType: '1',
    code,
  };

  // 一次只能请求 5 条数据
  const batch = 5;
  const batchResponse = await Promise.all(
    Array.from({ length: Math.ceil(dates.length / batch) }).map(async (_, index) => {
      const res = await axiosGet(`${hostname}${path}`, {
        ...body,
        dates: dates.slice(index * batch, Math.min((index + 1) * batch, dates.length)).join(','),
      });
      try {
        return res.data;
      } catch {
        return undefined;
      }
    }),
  );
  const resList = batchResponse.reduce((pre, cur) => {
    return pre.concat(cur);
  }, []);

  const usableDataList = makeSureIsArray(resList)
    .filter(Boolean)
    .map<SingleFinancialReport>(genFinancialReport)
    .sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      return b.month - a.month;
    });

  return usableDataList;
};

interface BundleRequestParams {
  stockId: string;
}

const bundleRequest = async (
  params: BundleRequestParams &
    Pick<getReportsRequestParams, 'hostname' | 'path' | 'years' | 'months'>,
) => {
  const { stockId, hostname, path, years, months } = params;
  const [code, exchange] = stockId.split('.');
  const usableCode = `${exchange.toUpperCase()}${code}`;
  for (let j = 4; j > 0; j--) {
    const data = await getReportsRequest({
      hostname,
      path,
      code: usableCode,
      cType: j,
      years,
      months,
    });
    if (!data.length) {
      continue;
    }
    return data;
  }
  return [];
};

const apiMap: Pick<
  ApiFuncMap,
  | ApiType.GET_SINGLE_FINANCIAL_REPORT
  | ApiType.GET_STOCK_SIX_YEAR_FINANCE_REPORTS
  | ApiType.GET_LEADING_INDICATORS
> = {
  [ApiType.GET_SINGLE_FINANCIAL_REPORT]: async () => {},
  [ApiType.GET_STOCK_SIX_YEAR_FINANCE_REPORTS]: async ({ stockId, years = 5, months = [12] }) => {
    const [leadingList, zcfz, lr, xjll] = await Promise.all([
      apiMap[ApiType.GET_LEADING_INDICATORS](stockId),
      bundleRequest({
        stockId,
        years,
        hostname: 'https://emweb.securities.eastmoney.com',
        path: '/PC_HSF10/NewFinanceAnalysis/zcfzbAjaxNew',
        months,
      }),
      bundleRequest({
        stockId,
        years,
        hostname: 'https://emweb.securities.eastmoney.com',
        path: '/PC_HSF10/NewFinanceAnalysis/lrbAjaxNew',
        months,
      }),
      bundleRequest({
        stockId,
        years,
        hostname: 'https://emweb.securities.eastmoney.com',
        path: '/PC_HSF10/NewFinanceAnalysis/xjllbAjaxNew',
        months,
      }),
    ]);
    return zcfz.map<SingleFinancialReport>((report, index) => {
      const leading = leadingList.find(
        (item) => item.year === report.year && item.month === report.month,
      );
      return {
        year: report.year,
        month: report.month,
        data: {
          ...report.data,
          ...leading?.data,
          ...lr[index].data,
          ...xjll[index].data,
        },
      };
    });
  },
  [ApiType.GET_LEADING_INDICATORS]: async (stockId) => {
    const url = 'https://datacenter.eastmoney.com/securities/api/data/get';
    const [code, sType] = stockId.split('.');
    const filter = `(SECUCODE="${code}.${sType.toUpperCase()}")`;

    const res = await axiosGet(url, {
      type: 'RPT_F10_FINANCE_MAINFINADATA',
      sty: 'APP_F10_MAINFINADATA',
      quoteColumns: '',
      filter,
      p: '1',
      ps: '99',
      sr: '-1',
      st: 'REPORT_DATE',
      source: 'HSF10',
      client: 'PC',
    });
    return makeSureIsArray(res.result.data).map(genFinancialReport);
  },
};

export default apiMap;
