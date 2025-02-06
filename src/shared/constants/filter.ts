import { StockFileter } from '@shared/types';

export const DEFAULT_FILTER_DATA: StockFileter = {
  year: 5,
  pe: [0, 30],
  roe: [10, undefined],
  minTotalMarketCap: 50,
};
