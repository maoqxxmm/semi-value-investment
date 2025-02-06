import { memo } from 'react';
import dayjs from 'dayjs';
import { Table, Card } from '@douyinfe/semi-ui';
import { ManagerHoldingChangeItem } from '@shared/types';
import { formatFinancialNumber } from '@renderer/utils';

interface ManagerHoldingChangeTableProps {
  changes: ManagerHoldingChangeItem[];
}

export const ManagerHoldingChangeTable = memo((props: ManagerHoldingChangeTableProps) => {
  const { changes } = props;

  return (
    <Table
      size="small"
      dataSource={changes.filter((item) => !!item.AVERAGE_PRICE)}
      columns={[
        {
          title: '变动日期',
          dataIndex: 'END_DATE',
          render: (time) => dayjs(time).format('YYYY-MM-DD'),
        },
        {
          title: '变动人',
          dataIndex: 'EXECUTIVE_NAME',
        },
        {
          title: '变动数量(股)',
          dataIndex: 'CHANGE_NUM',
          render: (cell) => formatFinancialNumber(cell),
        },
        {
          title: '交易均价(元)',
          dataIndex: 'AVERAGE_PRICE',
        },
        {
          title: '结存股票(股)',
          dataIndex: 'CHANGE_AFTER_HOLDNUM',
          render: (cell) => formatFinancialNumber(cell),
        },
        {
          title: '董监高管',
          dataIndex: 'HOLDER_NAME',
        },
        {
          title: '高管职位',
          dataIndex: 'POSITION',
        },
        {
          title: '与高管关系',
          dataIndex: 'EXECUTIVE_RELATION',
        },
      ]}
      pagination={false}
    />
  );
});

ManagerHoldingChangeTable.displayName = 'ManagerHoldingChangeTable';

export const ManagerHoldingChangeTableWithCard = memo((props: ManagerHoldingChangeTableProps) => {
  return (
    <Card
      style={{ height: '100%' }}
      bodyStyle={{ overflow: 'auto', width: '100%', height: '100%' }}
    >
      <ManagerHoldingChangeTable {...props} />
    </Card>
  );
});

ManagerHoldingChangeTableWithCard.displayName = 'ManagerHoldingChangeTableWithCard';
