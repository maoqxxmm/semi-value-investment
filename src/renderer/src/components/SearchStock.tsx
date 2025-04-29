import React, { memo, useState } from 'react';
import { useSetAtom } from 'jotai';
import { useDebounceFn } from 'ahooks';
import { IconSearch } from '@douyinfe/semi-icons';
import { AutoComplete, Modal } from '@douyinfe/semi-ui';
import { ApiType, IStockId, IStockSearchItem } from '@shared/types';
import { currentStockDetailPagePropsAtom } from '@renderer/models';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';

interface SearchStockProps {
  visible: boolean;
  onClose: () => void;
}

export const SearchStock = memo((props: SearchStockProps) => {
  const { onClose, visible } = props;

  const setCurerent = useSetAtom(currentStockDetailPagePropsAtom);
  const [list, setList] = useState<IStockSearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (value: string) => {
    try {
      setLoading(true);
      const res = await safelyRequestByIpcWithErrorToast(ApiType.SEARCH_STOCK, value);
      setList(res.map((item) => ({ ...item, value: item.stockId, label: item.stockId })));
    } finally {
      setLoading(false);
    }
  };

  const { run: onDebouncedSearch } = useDebounceFn(onSearch, { wait: 300 });

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width="min(80%, 600px)"
      maskClosable
      onCancel={onClose}
    >
      <div className="w-full flex justify-center">
        <AutoComplete<IStockSearchItem>
          defaultActiveFirstOption
          style={{
            width: '100%',
            height: 40,
            background: 'var(--semi-color-bg-0)',
            borderRadius: 4,
          }}
          size="large"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Escape' && onClose()}
          loading={loading}
          prefix={<IconSearch />}
          data={list}
          onSearch={onDebouncedSearch}
          autoFocus
          renderItem={(item) => `${item.code}.${item.sType} ${item.name}`}
          placeholder="输入股票代码、名称、首字母搜索"
          onSelect={(stockId) => {
            onClose();
            setCurerent({ stockId: stockId as unknown as IStockId });
          }}
        />
      </div>
    </Modal>
  );
});

SearchStock.displayName = 'SearchStock';
