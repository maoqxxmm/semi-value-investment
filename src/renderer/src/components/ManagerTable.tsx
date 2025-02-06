import { memo } from 'react';
import { Table, Card } from '@douyinfe/semi-ui';
import { ManagerItem } from '@shared/types';
import { formatFinancialNumber } from '@renderer/utils';

interface ManagerTableProps {
  managerItems: ManagerItem[];
}

export const ManagerTable = memo((props: ManagerTableProps) => {
  const { managerItems } = props;

  return (
    <Table
      size="small"
      dataSource={managerItems}
      columns={[
        {
          title: '高管名称',
          dataIndex: 'PERSON_NAME',
        },
        {
          title: '薪酬',
          dataIndex: 'SALARY',
          render: (cell) => formatFinancialNumber(cell),
        },
        {
          title: '职位',
          dataIndex: 'POSITION',
        },
      ]}
      pagination={false}
    />
  );
});

ManagerTable.displayName = 'ManagerTable';

export const ManagerTableWithCard = memo((props: ManagerTableProps) => {
  return (
    <Card
      style={{ height: '100%' }}
      bodyStyle={{ overflow: 'auto', width: '100%', height: '100%' }}
    >
      <ManagerTable {...props} />
    </Card>
  );
});

ManagerTableWithCard.displayName = 'ManagerTableWithCard';
