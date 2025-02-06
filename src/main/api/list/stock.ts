import path from 'path';
import { ApiFuncMap, ApiType, DataDirecotry, FileName, IStockProfile } from '@shared/types';
import { getFileText, makeSureiIsArray, writeFileText } from '@main/utils';
import { axiosGet } from '@main/utils';
import { assertDataDirectoryIsSelected } from './base';
import dayjs from 'dayjs';

const apiMap: Pick<
  ApiFuncMap,
  | ApiType.GET_STOCK_PROFILE_LIST_BY_FILTER
  | ApiType.GET_STOCK_PROFILE
  | ApiType.UPDATE_STOCK_PROFILE_LIST_BY_FILTER
  | ApiType.GET_STOCK_PROFILE_LIST_IN_CACHE
  | ApiType.SEARCH_STOCK
> = {
  [ApiType.GET_STOCK_PROFILE]: async (stockId) => {
    const keyMap = {
      名称: 'f58',
      行业代码: 'f12',
      行业名称: 'f14',
      市场: 'f107',
      代码: 'f57',
      总市值: 'f116',
      市盈率TTM: 'f164',
      市净率: '167',
      毛利率: 'f168',
      最新价: 'f43',
      涨跌幅: '169',
      上市日期: 'f189',
    };
    const [code, sType] = stockId.split('.');
    const [res, other] = await Promise.all([
      axiosGet('https://push2.eastmoney.com/api/qt/stock/get', {
        fltt: 1,
        invt: 2,
        fields: Object.values(keyMap).join(','),
        secid: `${sType.toLowerCase() === 'sh' ? '1' : '0'}.${code}`,
      }),
      axiosGet('https://push2.eastmoney.com/api/qt/slist/get', {
        fltt: 1,
        invt: 2,
        fields: Object.values(keyMap).join(','),
        pn: 1,
        np: 1,
        spt: 1,
        secid: `${sType.toLowerCase() === 'sh' ? '1' : '0'}.${code}`,
      }),
    ]);
    const { data } = res || {};
    const ttmPE = data?.[keyMap['市盈率TTM']] || 0;
    const pb = data?.[keyMap['市净率']];
    const ttmROE = (pb / ttmPE) * 100;
    const date = data?.[keyMap['上市日期']];
    const bizId = other?.data?.diff?.[1]?.[keyMap['行业代码']];
    const bizName = other?.data?.diff?.[1]?.[keyMap['行业名称']];

    return {
      origin: data,
      id: stockId,
      code: data?.[keyMap['代码']],
      stockExchangeName: data?.[keyMap['市场']],
      ttmPE,
      ttmROE,
      pb,
      name: data?.[keyMap['名称']],
      totalMarketCap: data?.[keyMap['总市值']],
      bizId,
      bizName,
      GPR: data?.[keyMap['毛利率']],
      currentPrice: data?.[keyMap['最新价']],
      changeRate: data?.[keyMap['涨跌幅']],
      years: Number(dayjs().format('YYYY')) - Number(dayjs(date).format('YYYY')),
      date,
    };
  },
  [ApiType.SEARCH_STOCK]: async (keyword) => {
    const sTypeOrder = ['SH', 'SZ', 'BJ', 'SH', 'HK'];
    const res = await axiosGet('https://search-codetable.eastmoney.com/codetable/search/web', {
      client: 'web',
      keyword,
      pageIndex: 1,
      pageSize: 20,
    });
    try {
      return makeSureiIsArray(res?.result)
        .map((item) => {
          const { securityTypeName } = item;
          let sType = 'UNKNOWN';
          if (securityTypeName === '深A') {
            sType = 'SZ';
          } else if (securityTypeName === '沪A') {
            sType = 'SH';
          } else if (securityTypeName === '京A') {
            sType = 'BJ';
          } else if (securityTypeName === '科创板') {
            sType = 'SH';
          } else if (securityTypeName === '港股') {
            sType = 'HK';
          }
          return {
            stockId: `${item.code}.${sType}`,
            name: item.shortName,
            code: item.code,
            sType,
          };
        })
        .sort((a, b) => {
          const aIndex = sTypeOrder.findIndex((item) => a.sType === item);
          const bIndex = sTypeOrder.findIndex((item) => b.sType === item);
          if (aIndex === -1) {
            return 1;
          }
          if (bIndex === -1) {
            return -1;
          }
          return aIndex - bIndex;
        });
    } catch {
      return [];
    }
  },
  [ApiType.GET_STOCK_PROFILE_LIST_IN_CACHE]: async () => {
    try {
      const dir = assertDataDirectoryIsSelected();
      const jsonStr = await getFileText(
        dir,
        DataDirecotry.PROFILE_LIST_CACHE,
        FileName.PROFILE_STOCK_LIST,
      );
      const json = JSON.parse(jsonStr);
      if (Array.isArray(json)) {
        return json;
      }
      return undefined;
    } catch {
      return undefined;
    }
  },
  [ApiType.UPDATE_STOCK_PROFILE_LIST_BY_FILTER]: async (profileList) => {
    const dir = assertDataDirectoryIsSelected();
    await writeFileText(
      path.join(dir, DataDirecotry.PROFILE_LIST_CACHE),
      FileName.PROFILE_STOCK_LIST,
      JSON.stringify(profileList),
    );
  },
  [ApiType.GET_STOCK_PROFILE_LIST_BY_FILTER]: async (params) => {
    const url = 'https://data.eastmoney.com/dataapi/xuangu/list';
    const { pe, pb, roe, minTotalMarketCap, year } = params;

    let filter = '';
    if (typeof pe?.[0] === 'number') {
      filter += `(PE9>=${pe[0]})`;
    }
    if (typeof pe?.[1] === 'number') {
      filter += `(PE9<=${pe[1]})`;
    }
    if (typeof minTotalMarketCap === 'number') {
      filter += `(TOTAL_MARKET_CAP>=${minTotalMarketCap * 100_000_000})`;
    }
    if (year) {
      filter += `(@LISTING_DATE="OVER${year}Y")`;
    }
    if (typeof pb?.[0] === 'number') {
      filter += `(PBNEWMRQ>=${pb[0]})`;
    }
    if (typeof pb?.[1] === 'number') {
      filter += `(PBNEWMRQ<=${pb[1]})`;
    }

    // 该接口请求有个数显著，需要拆分
    const list = await Promise.all(
      Array.from({ length: 6 }).map(async (_, index) => {
        try {
          const res = await axiosGet(url, {
            st: 'CHANGE_RATE',
            sr: '-1',
            ps: '1000',
            p: `${index + 1}`,
            sty: 'SECUCODE,SECURITY_CODE,SECURITY_NAME_ABBR,NEW_PRICE,CHANGE_RATE,VOLUME_RATIO,HIGH_PRICE,LOW_PRICE,PRE_CLOSE_PRICE,VOLUME,DEAL_AMOUNT,TURNOVERRATE,PE9,TOTAL_MARKET_CAP,ROE_WEIGHT,LISTING_DATE,INDUSTRY,PBNEWMRQ,SALE_GPR',
            filter,
            source: 'SELECT_SECURITIES',
            client: 'WEB',
          });

          if (!Array.isArray(res?.result?.data)) {
            return [];
          }

          return makeSureiIsArray(res.result.data)
            .map<IStockProfile>((item) => {
              const { SECUCODE } = item;
              const [code, stockExchangeName] = SECUCODE.split('.');

              const ttmPE = item['PE9'];
              const pb = item['PBNEWMRQ'];
              const ttmROE = (pb / ttmPE) * 100;

              return {
                ...item,
                id: SECUCODE,
                code,
                stockExchangeName,
                name: item['SECURITY_NAME_ABBR'],
                totalMarketCap: item['TOTAL_MARKET_CAP'],
                industry: item['INDUSTRY'],
                GPR: Number(item['SALE_GPR']) || 0,
                ttmPE,
                pb,
                ttmROE,
                currentPrice: item.NEW_PRICE,
                changeRate: item.CHANGE_RATE,
                date: item.LISTING_DATE,
                years:
                  Number(dayjs().format('YYYY')) - Number(dayjs(item.LISTING_DATE).format('YYYY')),
              };
            })
            .filter((item) => {
              if (typeof roe?.[0] === 'number') {
                return item.ttmROE >= roe[0];
              }
              if (typeof roe?.[1] === 'number') {
                return item.ttmROE <= roe[1];
              }
              return true;
            });
        } catch {
          return [];
        }
      }),
    );

    return list
      .reduce((pre, cur) => [...pre, ...cur], [])
      .sort((a, b) => Number(a.code) - Number(b.code));
  },
};

export default apiMap;
