import { memo } from 'react';
import { useMount } from 'ahooks';
import { useAtom } from 'jotai';
import { Typography, Button, Toast } from '@douyinfe/semi-ui';
import { dataDirectoryAtom } from '@renderer/models';
import { ApiType } from '@shared/types';
import { requestByIpc, safelyRequestByIpcWithErrorToast } from '@renderer/utils';

export const Settings = memo(() => {
  const [dir, setDir] = useAtom(dataDirectoryAtom);

  useMount(async () => {
    const res = await requestByIpc(ApiType.GET_DATA_DIRECTORY);
    if (res.data) {
      setDir(res.data);
    }
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Typography.Title heading={1} className="font-bold mb-5">
        {dir ? '文件目录已选择' : '请先选择用于保存数据的文件目录'}
      </Typography.Title>
      <div className="text-semi-color-text-2 mb-6">当前选择目录: {dir || '-'}</div>
      <div className="flex items-center gap-4">
        <Button
          onClick={async () => {
            const res = await safelyRequestByIpcWithErrorToast(
              ApiType.GET_DATA_DIRECTORY_BY_SYSTEM_FILE_SELECTOR,
            );
            await safelyRequestByIpcWithErrorToast(ApiType.UPDATE_DATA_DIRECTORY, res);
            setDir(res);
          }}
        >
          选择目录
        </Button>
        <Button
          onClick={async () => {
            await safelyRequestByIpcWithErrorToast(ApiType.UPDATE_DATA_DIRECTORY, '');
            Toast.success('移除成功');
            setDir('');
          }}
        >
          移除目录
        </Button>
      </div>
    </div>
  );
});

Settings.displayName = 'Settings';
