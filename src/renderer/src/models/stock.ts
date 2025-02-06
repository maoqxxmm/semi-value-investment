import { IStockId, IStockProfile, ReportMonth } from '@shared/types';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const stockProfileListAtom = atom<IStockProfile[]>([]);
export const currentStockIdAtom = atom('');
export const currentStockDetailPagePropsAtom = atom<
  | {
      stockId: IStockId;
      list?: IStockId[];
    }
  | undefined
>(undefined);
export const monthAtom = atomWithStorage<ReportMonth>('stock-month', 12, undefined, {
  getOnInit: true,
});
