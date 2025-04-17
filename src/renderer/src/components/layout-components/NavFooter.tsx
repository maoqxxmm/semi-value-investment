import { memo, useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useMemoizedFn } from 'ahooks';
import { Dropdown, Button, Space, Tooltip, Toast } from '@douyinfe/semi-ui';
import { IconSun, IconMoon, IconSync, IconGallery, IconCalendar } from '@douyinfe/semi-icons';
import { ReportMonth } from '@shared/types';
import { ThemeType } from '@renderer/types';
import { useTheme } from '@renderer/hooks';
import {
  blacklistAtom,
  currentStockDetailPagePropsAtom,
  monthAtom,
  stockProfileListAtom,
} from '@renderer/models';
import { StockDetail } from '@renderer/components/StockDetail';
import { SearchStock } from '@renderer/components/SearchStock';

const monthList: ReportMonth[] = [3, 6, 9, 12];

export const NavFooter = memo(() => {
  const { theme, onThemeChange } = useTheme();
  const blacklist = useAtomValue(blacklistAtom);
  const profileList = useAtomValue(stockProfileListAtom);
  const setCurrent = useSetAtom(currentStockDetailPagePropsAtom);

  const [month, setMonth] = useAtom(monthAtom);
  const [searchVisible, setSearchVisible] = useState(false);
  const [monthMenuVisible, setMonthMenuVisible] = useState(false);
  const [themeDropdownVisible, setThemeDropdownVisible] = useState(false);

  const onThemeItemClick = (t: ThemeType) => {
    onThemeChange(t);
    setThemeDropdownVisible(false);
  };

  const onRandom = useMemoizedFn(() => {
    if (!profileList.length) {
      Toast.warning({ content: '数据请求中，请稍后...' });
      return;
    }
    const blacklistSet = new Set(blacklist);
    const item = profileList
      .filter((item) => !blacklistSet.has(item.id))
      .sort(() => Math.random() - 0.5)[0];
    setCurrent({ stockId: item.id, list: undefined });
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setSearchVisible(true);
        return;
      }
      if (e.key === 'i' && (e.metaKey || e.ctrlKey)) {
        onRandom();
        return;
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [history, onRandom]);

  return (
    <>
      <Space>
        <Dropdown
          visible={monthMenuVisible}
          onVisibleChange={setMonthMenuVisible}
          trigger="click"
          position="bottom"
          menu={monthList.map((m) => ({
            node: 'item',
            name: `${m} 月`,
            onClick: () => {
              setMonthMenuVisible(false);
              setMonth(m);
            },
          }))}
        >
          <div>
            <Tooltip position="bottom" content="更换财报期">
              <Button icon={<IconCalendar />} type="tertiary" theme="borderless">
                {month} 月
              </Button>
            </Tooltip>
          </div>
        </Dropdown>
        <Tooltip position="bottom" content="手气不错">
          <Button
            onClick={onRandom}
            className="text-semi-color-text-0"
            theme="borderless"
            icon={<IconGallery />}
          />
        </Tooltip>
        <Dropdown
          visible={themeDropdownVisible}
          onVisibleChange={setThemeDropdownVisible}
          trigger="click"
          position="bottomRight"
          menu={[
            {
              node: 'item',
              name: '浅色模式',
              icon: <IconSun />,
              onClick: () => onThemeItemClick('light'),
            },
            {
              node: 'item',
              name: '深色模式',
              icon: <IconMoon />,
              onClick: () => onThemeItemClick('dark'),
            },
            {
              node: 'item',
              name: '跟随系统',
              icon: <IconSync />,
              onClick: () => onThemeItemClick('auto'),
            },
          ]}
        >
          <div>
            <Tooltip position="bottomRight" content="更换主题">
              <Button
                className="text-semi-color-text-0"
                theme="borderless"
                icon={theme === 'dark' ? <IconMoon /> : <IconSun />}
              />
            </Tooltip>
          </div>
        </Dropdown>
      </Space>
      <StockDetail />
      <SearchStock visible={searchVisible} onClose={() => setSearchVisible(false)} />
    </>
  );
});

NavFooter.displayName = 'NavFooter';
