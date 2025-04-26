import { useState, useEffect, useRef } from 'react';
import { Modal, TextArea } from '@douyinfe/semi-ui';
import { reviewMapAtom, updateReviewMapAtom } from '@renderer/models';
import { useAtomValue, useSetAtom } from 'jotai';

interface ReviewEditModalProps {
  current: string;
  onClose: () => void;
}

export const ReviewEditModal = (props: ReviewEditModalProps) => {
  const { current, onClose } = props;

  const reviewMap = useAtomValue(reviewMapAtom);
  const updateReviewMap = useSetAtom(updateReviewMapAtom);

  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (current) {
      setText(reviewMap[current] || '');
      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 100);
    }
  }, [current]);

  const onOk = () => {
    updateReviewMap({
      ...reviewMap,
      [current]: text,
    });
    onClose();
  };

  return (
    <Modal
      width="min(90%, 600px)"
      onCancel={onClose}
      visible={!!current}
      title="评价内容"
      onOk={onOk}
      okText="确认 (⌘+Enter)"
    >
      <TextArea
        ref={textAreaRef}
        rows={3}
        value={text}
        onChange={setText}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            onOk();
          }
        }}
      />
    </Modal>
  );
};
