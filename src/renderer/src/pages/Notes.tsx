import markdownit from 'markdown-it';
import { atom, useAtom } from 'jotai';
import { memo, useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { safelyRequestByIpcWithErrorToast } from '@renderer/utils';
import { ApiType } from '@shared/types';

const md = markdownit();

interface Article {
  title: string;
  content: string[];
  current: number;
}

const articleAtom = atom<Article | null>(null);

export const Notes = memo(() => {
  const [article, setArticle] = useAtom(articleAtom);

  const fetch = async (force?: boolean) => {
    if (article && !force) {
      return;
    }
    const data = await safelyRequestByIpcWithErrorToast(ApiType.GET_RANDOM_NOTE_TEXT);

    const div = document.createElement('div');
    div.innerHTML = md.render(data.content);
    const content: string[] = [];
    for (const firstLevel of div.childNodes) {
      if (['UL', 'OL'].includes(firstLevel.nodeName)) {
        for (const secondLevel of firstLevel.childNodes) {
          if (['LI'].includes(secondLevel.nodeName)) {
            content.push((secondLevel as HTMLDivElement).innerHTML);
          }
        }
      }
    }

    setArticle({
      title: data.title,
      content,
      current: Math.floor(Math.random() * content.length),
    });
  };

  const onPrev = () => {
    setArticle((pre) => (pre ? { ...pre, current: pre.current + 1 } : null));
  };

  const onNext = () => {
    setArticle((pre) => (pre ? { ...pre, current: pre.current - 1 } : null));
  };

  useEffect(() => {
    fetch();

    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        fetch(true);
      }
      if (e.code === 'ArrowLeft') {
        onPrev();
      }
      if (e.code === 'ArrowRight') {
        onNext();
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [fetch]);

  if (!article) {
    return (
      <div className="w-full h-full text-semi-color-text-1 flex justify-center items-center text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className="markdown-it max-w-[1000px] text-semi-color-text-1 text-xl/9 mb-4"
        dangerouslySetInnerHTML={{ __html: article.content[article.current] }}
      />
      <div className="text-semi-color-text-3 mb-8">——《{article.title}》</div>
      <div className="flex justify-center gap-6">
        <Button disabled={article.current === 0} onClick={onPrev}>
          上一段 (←)
        </Button>
        <Button disabled={article.current === article.content.length - 1} onClick={onNext}>
          下一段 (→)
        </Button>
        <Button onClick={() => fetch(true)}>继续随机 (Space)</Button>
      </div>
    </div>
  );
});

Notes.displayName = 'Notes';
