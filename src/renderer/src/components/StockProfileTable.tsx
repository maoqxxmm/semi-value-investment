import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { memo, useRef, useState } from 'react';
import {
  Spin,
  Form as FormFromImport,
  useFormApi,
  Typography,
  Button,
  Space,
  Table,
  Input,
} from '@douyinfe/semi-ui';
import { ApiType, StockFileter } from '@shared/types';
import { DEFAULT_FILTER_DATA } from '@shared/constants';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';
import { currentStockDetailPagePropsAtom, stockProfileListAtom } from '@renderer/models/stock';
import { favoriteStockIdSetAtom, updateFavoriteStockAtom } from '@renderer/models';

const { InputNumber } = FormFromImport;
const Form = FormFromImport as any;

enum Field {
  MIN_PE = 'min-pe',
  MAX_PE = 'max-pe',
  MIN_PB = 'min-pb',
  MAX_PB = 'max-pb',
  MIN_ROE = 'min-roe',
  MAX_ROE = 'max-roe',
  MIN_MARKET_CAP = 'min-market-cap',
  YEAR = 'year',
}

const transformFilterDataToFormData = (filters: StockFileter) => ({
  [Field.MIN_ROE]: filters.roe?.[0]?.toString(),
  [Field.MAX_ROE]: filters.roe?.[1]?.toString(),
  [Field.MIN_PE]: filters.pe?.[0]?.toString(),
  [Field.MAX_PE]: filters.pe?.[1]?.toString(),
  [Field.MIN_PB]: filters.pb?.[0]?.toString(),
  [Field.MAX_PB]: filters.pb?.[1]?.toString(),
  [Field.YEAR]: filters.year?.toString(),
  [Field.MIN_MARKET_CAP]: filters.minTotalMarketCap?.toString(),
});

const convertStringToNumber = (value: string) => {
  if (!value) {
    return undefined;
  }
  const res = Number(value);
  return Number.isNaN(res) ? undefined : res;
};

const transformFormDataToFilterData = (formData: Record<string, string>): StockFileter => ({
  roe: [
    convertStringToNumber(formData[Field.MIN_ROE]),
    convertStringToNumber(formData[Field.MAX_ROE]),
  ],
  pe: [
    convertStringToNumber(formData[Field.MIN_PE]),
    convertStringToNumber(formData[Field.MAX_PE]),
  ],
  pb: [
    convertStringToNumber(formData[Field.MIN_PB]),
    convertStringToNumber(formData[Field.MAX_PB]),
  ],
  year: convertStringToNumber(formData[Field.YEAR]),
  minTotalMarketCap: convertStringToNumber(formData[Field.MIN_MARKET_CAP]),
});

export const StockProfileTable = memo(() => {
  const [profileList, setProfileList] = useAtom(stockProfileListAtom);
  const setCurrent = useSetAtom(currentStockDetailPagePropsAtom);
  const favSet = useAtomValue(favoriteStockIdSetAtom);
  const updateFav = useSetAtom(updateFavoriteStockAtom);
  const [loading, setLoading] = useState(true);
  const [tableIdFilter, setTableIdFilter] = useState('');
  const [tableNameFilter, setTableNameFilter] = useState('');
  const formApiRef = useRef<ReturnType<typeof useFormApi>>();

  const onFilterFetch = async () => {
    setLoading(true);
    try {
      const res = await safelyRequestByIpcWithErrorToast(ApiType.GET_FILTER_DATA);
      formApiRef.current?.setValues(transformFilterDataToFormData(res));
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    setLoading(true);
    try {
      await safelyRequestByIpcWithErrorToast(ApiType.UPDATE_FILTER_DATA, DEFAULT_FILTER_DATA);
      formApiRef.current?.setValues(transformFilterDataToFormData(DEFAULT_FILTER_DATA));
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      const values = formApiRef.current?.getValues();
      if (values) {
        const filters = transformFormDataToFilterData(values);
        const res = await safelyRequestByIpcWithErrorToast(
          ApiType.GET_STOCK_PROFILE_LIST_BY_FILTER,
          filters,
        );
        setProfileList(res);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="px-6">
        <Typography.Title heading={4} className="my-4">
          个股基础数据
        </Typography.Title>
        <Typography.Title heading={5} className="my-3">
          条件过滤
        </Typography.Title>
        <Form
          getFormApi={(api) => {
            formApiRef.current = api;
            onFilterFetch();
          }}
          layout="horizontal"
          labelPosition="inset"
        >
          <div className="mb-4 [&>*]:mr-0 [&>*]:pr-0 grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
            <InputNumber field={Field.MIN_ROE} label="最小 ROE" placeholder="不填表示无限制" />
            <InputNumber field={Field.MAX_ROE} label="最大 ROE" placeholder="不填表示无限制" />
            <InputNumber field={Field.MIN_PE} label="最小 PE" placeholder="不填表示无限制" />
            <InputNumber field={Field.MAX_PE} label="最大 PE" placeholder="不填表示无限制" />
            <InputNumber field={Field.MIN_PB} label="最小 PB" placeholder="不填表示无限制" />
            <InputNumber field={Field.MAX_PB} label="最大 PB" placeholder="不填表示无限制" />
            <InputNumber
              field={Field.MIN_MARKET_CAP}
              label="市值不小于（亿）"
              placeholder="不填表示无限制"
            />
            <InputNumber
              field={Field.YEAR}
              label="最小上市时间（年）"
              placeholder="不填表示无限制"
            />
            <Space>
              <Button theme="solid" onClick={onConfirm}>
                确认过滤
              </Button>
              <Button onClick={onReset} type="tertiary">
                重置表单
              </Button>
              <Button type="danger">更新缓存</Button>
            </Space>
          </div>
        </Form>
        <Typography.Title heading={5} className="my-3">
          数据详情
        </Typography.Title>
        <Table
          rowKey="id"
          columns={[
            {
              title: (
                <Space>
                  <div>代码</div>
                  <Input
                    style={{ width: 120 }}
                    value={tableIdFilter}
                    onChange={setTableIdFilter}
                    placeholder="请输入筛选值"
                  />
                </Space>
              ),
              width: 200,
              dataIndex: 'id',
              filteredValue: tableIdFilter ? [tableIdFilter] : [],
              onFilter: (value, record) => !!record?.id.includes(value),
            },
            {
              title: (
                <Space>
                  <div>名称</div>
                  <Input
                    style={{ width: 120 }}
                    value={tableNameFilter}
                    onChange={setTableNameFilter}
                    placeholder="请输入筛选值"
                  />
                </Space>
              ),
              width: 200,
              dataIndex: 'name',
              filteredValue: tableNameFilter ? [tableNameFilter] : [],
              onFilter: (value, record) => !!record?.name.includes(value),
              render: (name, record) => (
                <Typography.Text
                  link
                  onClick={() => setCurrent((pre) => ({ ...pre, stockId: record.id }))}
                >
                  {name}
                </Typography.Text>
              ),
            },
            {
              title: '总市值',
              width: 100,
              dataIndex: 'totalMarketCap',
              render: (cell: number) => `${(cell / 100_000_000).toFixed(0)}亿`,
            },
            {
              title: 'ROE (TTM)',
              dataIndex: 'ttmROE',
              render: (cell: number) => `${cell.toFixed(2)}%`,
            },
            {
              title: 'PE (TTM)',
              dataIndex: 'ttmPE',
              render: (cell: number) => `${cell.toFixed(2)}`,
            },
            { title: 'PB', dataIndex: 'pb', render: (cell: number) => `${cell.toFixed(2)}` },
            {
              title: '毛利率',
              dataIndex: 'GPR',
              render: (cell: number) => `${cell.toFixed(2)}%`,
            },
            { title: '价格', dataIndex: 'currentPrice' },
            { title: '涨跌幅', dataIndex: 'changeRate' },
            {
              title: '上市时间',
              dataIndex: 'years',
              render: (cell: number) => `${cell.toFixed(0)} 年`,
            },
            {
              title: '缓存状态',
              render: (_, record) => {
                return null;
              },
            },
            {
              title: '操作',
              width: 200,
              render: (_, record) => (
                <Space spacing="medium">
                  <Typography.Text link>更新缓存</Typography.Text>
                  <Typography.Text link onClick={() => updateFav(record.id, 'toggle')}>
                    {favSet.has(record.id) ? '取消收藏' : '收藏'}
                  </Typography.Text>
                </Space>
              ),
            },
          ]}
          dataSource={profileList}
          pagination={{
            popoverPosition: 'top',
            pageSize: 10,
            showTotal: true,
            showSizeChanger: true,
            pageSizeOpts: [5, 10, 20],
          }}
        />
      </div>
    </Spin>
  );
});

StockProfileTable.displayName = 'StockProfileTable';
