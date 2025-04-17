import { atom } from 'jotai';
import { ApiType, IStockId, StockFileter } from '@shared/types';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

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

export const ratingMapAtom = atom<Record<string, number>>({});
export const reviewMapAtom = atom<Record<string, string | undefined>>({});
export const blacklistAtom = atom<string[]>([]);
export const updateRatingMapAtom = atom(
  undefined,
  async (_, set, ratingMap: Record<string, number>, noWrite?: boolean) => {
    set(ratingMapAtom, ratingMap);
    if (!noWrite) {
      await safelyRequestByIpcWithErrorToast(ApiType.UPDATE_RATING_MAP, ratingMap);
    }
  },
);
export const updateReviewMapAtom = atom(
  undefined,
  async (_, set, reviewMap: Record<string, string | undefined>, noWrite?: boolean) => {
    set(reviewMapAtom, reviewMap);
    if (!noWrite) {
      await safelyRequestByIpcWithErrorToast(ApiType.UPDATE_REVIEW_MAP, reviewMap);
    }
  },
);
export const updateblacklistAtom = atom(
  undefined,
  async (_, set, list: string[], noWrite?: boolean) => {
    set(blacklistAtom, list);
    if (!noWrite) {
      await safelyRequestByIpcWithErrorToast(ApiType.UPDATE_BLACKLIST, list);
    }
  },
);
