import dayjs from 'dayjs';
import { ApiFuncMap, ApiType, KLineItem, KLineType } from '@shared/types';
import { computeKdj, makeSureIsArray, axiosGet, computeRSI } from '@main/utils';

const apiMap: Pick<ApiFuncMap, ApiType.GET_K_LINES_DATA | ApiType.GET_KDJ_RSI> = {
  [ApiType.GET_KDJ_RSI]: async (params) => {
    const klines = await apiMap[ApiType.GET_K_LINES_DATA](params);
    const kdj = computeKdj(
      klines.map((item) => item.close),
      klines.map((item) => item.low),
      klines.map((item) => item.high),
    );
    const rsi = computeRSI(klines.map((item) => item.close));
    return {
      j: kdj.j.map((item, index) => ({
        date: klines[klines.length - kdj.j.length + index].time,
        value: item,
      })),
      k: kdj.k.map((item, index) => ({
        date: klines[klines.length - kdj.k.length + index].time,
        value: item,
      })),
      d: kdj.d.map((item, index) => ({
        date: klines[klines.length - kdj.d.length + index].time,
        value: item,
      })),
      rsi: rsi.map((item, index) => ({
        date: klines[klines.length - rsi.length + index].time,
        value: item,
      })),
    };
  },
  [ApiType.GET_K_LINES_DATA]: async ({ stockId, type }) => {
    const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get';
    const [code, sType] = stockId.split('.');

    let klt = '101';
    if (type === KLineType.WEEK) {
      klt = '102';
    } else if (type === KLineType.MONTH) {
      klt = '103';
    }

    const res = await axiosGet(url, {
      secid: `${sType.toLowerCase() === 'sh' ? '1' : '0'}.${code}`,
      fields1: 'f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13',
      fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
      end: dayjs().add(1, 'day').format('YYYYMMDD'),
      klt,
      beg: '0',
      rtntype: '6',
      fqt: '1',
    });
    return makeSureIsArray(res.data.klines).map<KLineItem>((line) => {
      const items = line.split(',');
      return {
        type,
        time: items[0],
        open: Number(items[1]),
        close: Number(items[2]),
        high: Number(items[3]),
        low: Number(items[4]),
        volume: Number(items[5]),
        turnover: Number(items[6]),
        amplitude: Number(items[7]),
        changeRate: Number(items[8]),
        change: Number(items[9]),
        turnoverRate: Number(items[10]),
      };
    });
  },
};

export default apiMap;
