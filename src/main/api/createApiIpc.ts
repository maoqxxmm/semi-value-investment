import { ipcMain } from 'electron';
import { AxiosError } from 'axios';
import { ApiRequestBaseReturn } from '@shared/types';
import stockApiMap from './list/stock';
import baseApiMap from './list/base';
import reportApiMap from './list/report';
import klinesApiMap from './list/klines';
import moreInfoApiMap from './list/more-info';

const apiMap = {
  ...stockApiMap,
  ...baseApiMap,
  ...reportApiMap,
  ...klinesApiMap,
  ...moreInfoApiMap,
};

export const createApiIpc = () => {
  Object.entries(apiMap).forEach(([name, func]) => {
    ipcMain.handle(name, async (_, params) => {
      try {
        const res = (await (func as any)(params)) as ApiRequestBaseReturn<unknown>;
        return {
          isSuccess: true,
          data: res,
        };
      } catch (e: any) {
        if (e instanceof AxiosError) {
          return {
            isSuccess: false,
            code: e.code || '-1',
            message: e.message || '未知错误',
          };
        }
        return {
          isSuccess: false,
          code: e?.code || '500',
          message: e?.message || '未知错误',
        };
      }
    });
  });
};
