import { useEffect, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { favoriteStockIdListAtom } from '@renderer/models';
import { ApiType, IStockProfile } from '@shared/types';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

const stockProfileListAtom = atom<IStockProfile[]>([]);

export const useFavStockProfileList = () => {
  const favList = useAtomValue(favoriteStockIdListAtom);

  const [loading, setLoading] = useState(true);
  const [profileList, setProfileList] = useAtom(stockProfileListAtom);

  useEffect(() => {
    if (!favList) {
      return;
    }
    let didCancel = false;
    (async () => {
      try {
        setLoading(true);
        const res = await Promise.all(
          favList.map(
            async (stockId) =>
              await safelyRequestByIpcWithErrorToast(ApiType.GET_STOCK_PROFILE, stockId),
          ),
        );
        if (!didCancel) {
          setProfileList(res);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      didCancel = true;
    };
  }, [favList]);

  return {
    loading,
    profileList,
  };
};
