import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ThemeType } from '@renderer/types';

export const themeSettingAtom = atomWithStorage<ThemeType>('theme', 'auto', undefined, {
  getOnInit: true,
});
export const themeAtom = atom<Exclude<ThemeType, 'auto'>>('light');
export const dataDirectoryAtom = atom('');
