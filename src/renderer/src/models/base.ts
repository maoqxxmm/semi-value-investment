import { atom } from 'jotai';
import { ApiType, IStockId, StockFileter } from '@shared/types';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';
import { atomWithStorage } from 'jotai/utils';

export const favoriteStockIdListAtom = atom<IStockId[] | undefined>(undefined);

export const filterDataAtom = atom<StockFileter | undefined>(undefined);

export const favoriteStockIdSetAtom = atom((get) => new Set(get(favoriteStockIdListAtom)));

export const updateFavoriteStockAtom = atom(
  undefined,
  async (get, set, stockId: IStockId, type: 'toggle' | 'remove' | 'add') => {
    const newSet = new Set(get(favoriteStockIdSetAtom));
    const add = async () => {
      newSet.add(stockId);
      set(favoriteStockIdListAtom, Array.from(newSet));
      await safelyRequestByIpcWithErrorToast(
        ApiType.UPDATE_FAVORITE_STOCK_ID_LIST,
        Array.from(newSet),
      );
    };
    const remove = async () => {
      newSet.delete(stockId);
      set(favoriteStockIdListAtom, Array.from(newSet));
      await safelyRequestByIpcWithErrorToast(
        ApiType.UPDATE_FAVORITE_STOCK_ID_LIST,
        Array.from(newSet),
      );
    };

    if (type === 'toggle') {
      if (newSet.has(stockId)) {
        remove();
      } else {
        add();
      }
    } else if (type === 'remove') {
      remove();
    } else {
      add();
    }
  },
);

export const ratingMapAtom = atomWithStorage<Record<string, number>>('rating-map', {}, undefined, {
  getOnInit: true,
});

export const reviewMapAtom = atomWithStorage<Record<string, string | undefined>>(
  'review-map',
  {},
  undefined,
  {
    getOnInit: true,
  },
);
