import { useSetAtom } from 'jotai';
import { useAsyncEffect } from 'ahooks';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';
import { ApiType } from '@shared/types';
import { favoriteStockIdListAtom, stockProfileListAtom } from '@renderer/models';

export const useInit = () => {
  const setFavoriteStockIdList = useSetAtom(favoriteStockIdListAtom);
  const setProfileList = useSetAtom(stockProfileListAtom);

  useAsyncEffect(async function* () {
    const res = await safelyRequestByIpcWithErrorToast(ApiType.GET_FAVORITE_STOCK_ID_LIST);
    setFavoriteStockIdList(res);
  }, []);

  useAsyncEffect(async function* () {
    const res = await safelyRequestByIpcWithErrorToast(ApiType.GET_STOCK_PROFILE_LIST_IN_CACHE);
    if (res) {
      setProfileList(res);
    }
    const filters = await safelyRequestByIpcWithErrorToast(ApiType.GET_FILTER_DATA);
    const newList = await safelyRequestByIpcWithErrorToast(
      ApiType.GET_STOCK_PROFILE_LIST_BY_FILTER,
      filters,
    );
    setProfileList(newList);
    await safelyRequestByIpcWithErrorToast(ApiType.UPDATE_STOCK_PROFILE_LIST_BY_FILTER, newList);
  }, []);
};
