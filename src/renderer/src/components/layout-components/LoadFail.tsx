import { memo } from 'react';
import { IllustrationFailure, IllustrationFailureDark } from '@douyinfe/semi-illustrations';
import { Empty, Button } from '@douyinfe/semi-ui';

interface LoadFailProps {
  onReload: () => Promise<void> | void;
}

export const LoadFail = memo<LoadFailProps>((props) => {
  const { onReload } = props;
  return (
    <Empty
      image={<IllustrationFailure style={{ width: 150, height: 150 }} />}
      darkModeImage={<IllustrationFailureDark style={{ width: 150, height: 150 }} />}
      description="加载失败，请稍后重试"
    >
      <div className="flex justify-center">
        <Button onClick={onReload}>重新加载</Button>
      </div>
    </Empty>
  );
});
