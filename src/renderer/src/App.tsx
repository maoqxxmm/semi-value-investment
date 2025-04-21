import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { Nav } from '@douyinfe/semi-ui';
import {
  IconHighlight,
  IconConfig,
  IconList,
  IconHeart,
  IconTypography,
} from '@douyinfe/semi-icons-lab';
import { RouterKey } from '@renderer/types';
import { Favorite, Settings, DataManage, Notes, Report } from '@renderer/pages';
import { useInit } from '@renderer/hooks';
import { NavFooter } from '@renderer/components/layout-components';
import { currentStockDetailPagePropsAtom } from '@renderer/models';
import './global.css';

function App(): JSX.Element {
  const history = useHistory();
  const { pathname } = useLocation();
  const setCurrentProps = useSetAtom(currentStockDetailPagePropsAtom);

  useInit();

  return (
    <>
      <div className="w-full h-full flex flex-col bg-semi-color-bg-0">
        <div className="flex-none w-full">
          <Nav
            className="border-b-semi-color-border border-b-[1px]"
            mode="horizontal"
            selectedKeys={[pathname]}
            onSelect={(e) => {
              history.push(String(e.itemKey));
              setCurrentProps(undefined);
            }}
            items={[
              { itemKey: RouterKey.FAV_MANAGE, text: '收藏管理', icon: <IconHeart /> },
              { itemKey: RouterKey.NOTES, text: '阅读笔记', icon: <IconHighlight /> },
              { itemKey: RouterKey.RESEARCH_REPORT, text: '研究报告', icon: <IconTypography /> },
              { itemKey: RouterKey.DATA_MANAGE, text: '数据管理', icon: <IconList /> },
              { itemKey: RouterKey.SETTINGS, text: '设置', icon: <IconConfig /> },
            ]}
            footer={<NavFooter />}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <Switch>
            <Route exact path={RouterKey.FAV_MANAGE} component={Favorite} />
            <Route exact path={RouterKey.NOTES} component={Notes} />
            <Route exact path={RouterKey.RESEARCH_REPORT} component={Report} />
            <Route exact path={RouterKey.DATA_MANAGE} component={DataManage} />
            <Route exact path={RouterKey.SETTINGS} component={Settings} />
            <Route path="">
              <Redirect to={RouterKey.FAV_MANAGE} />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
