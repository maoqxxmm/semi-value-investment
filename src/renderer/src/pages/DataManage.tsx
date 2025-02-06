import { memo } from 'react';
import { StockProfileTable } from '@renderer/components/StockProfileTable';

export const DataManage = memo(() => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <StockProfileTable />
    </div>
  );
});

DataManage.displayName = 'DataManage';
