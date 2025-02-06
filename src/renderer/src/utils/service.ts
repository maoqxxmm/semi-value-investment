import { Toast } from '@douyinfe/semi-ui';
import {
  ApiType,
  ApiRequestPamrasMap,
  ApiRequestReturnMap,
  ApiRequestBaseReturn,
  ErrorCode,
} from '@shared/types';
import { AxiosError } from 'axios';

export const requestByIpc = async <T extends ApiType>(
  ...args: T extends keyof ApiRequestPamrasMap
    ? [type: T, params: ApiRequestPamrasMap[T]]
    : [type: T]
): Promise<ApiRequestBaseReturn<unknown>> => {
  const [type, params] = args;
  return await window.electron.ipcRenderer.invoke(type, params);
};

let dataDirectoryNotSelectedToast = false;

export const safelyRequestByIpcWithErrorToast = async <T extends ApiType>(
  ...args: T extends keyof ApiRequestPamrasMap
    ? [type: T, params: ApiRequestPamrasMap[T]]
    : [type: T]
) => {
  const [type, params] = args;
  const res = await requestByIpc(...args);
  if (res.code === ErrorCode.DATA_DIRECTORY_NOT_SELECTED) {
    location.href = location.href.replace(location.hash, '#/settings');
    if (!dataDirectoryNotSelectedToast) {
      dataDirectoryNotSelectedToast = true;
      Toast.error({
        content: '请先选择用于保存数据的文件目录',
        onClose: () => (dataDirectoryNotSelectedToast = false),
        showClose: false,
      });
    }
    throw new Error('请先选择用于保存数据的文件目录');
  }

  if (res.isSuccess) {
    return res.data as T extends keyof ApiRequestReturnMap ? ApiRequestReturnMap[T] : undefined;
  }

  Toast.error({ content: res.message || '请求失败' });
  console.error(res.message || '请求失败', type, params, res);
  throw new AxiosError(res.message || '请求失败', res.code || '-1');
};
