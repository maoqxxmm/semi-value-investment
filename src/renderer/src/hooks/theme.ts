import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import { ThemeType } from '@renderer/types';
import { themeAtom, themeSettingAtom } from '@renderer/models';

export const useTheme = () => {
  const [themeSetting, setThemeSetting] = useAtom(themeSettingAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  const onThemeChange = useMemoizedFn((t: ThemeType) => {
    setThemeSetting(t);
    if (t === 'auto') {
      return;
    }
    if (t === 'dark') {
      setTheme('dark');
      document.body.setAttribute('theme-mode', 'dark');
      return;
    }
    setTheme('light');
    document.body.removeAttribute('theme-mode');
  });

  useEffect(() => {
    if (themeSetting !== 'auto') {
      return;
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    const run = (dark: boolean) => {
      if (dark) {
        setTheme('dark');
        document.body.setAttribute('theme-mode', 'dark');
      } else {
        setTheme('light');
        document.body.removeAttribute('theme-mode');
      }
    };

    run(mql.matches);
    const listener = (e: MediaQueryListEvent) => {
      run(e.matches);
    };
    mql.addEventListener('change', listener);
    return () => {
      mql.removeEventListener('change', listener);
    };
  }, [themeSetting]);

  return useMemo(
    () => ({
      theme,
      onThemeChange,
    }),
    [theme, onThemeChange],
  );
};
