import { AxiosError } from 'axios';
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';
import { DataDirecotry, ErrorCode, FileName, MetaDataKey, MetaDataType } from '@shared/types';
import { getDirectoryBySystemSelector, getFileText, writeFileText } from '@main/utils';
import { ApiFuncMap, ApiType } from '@shared/types';
import { DEFAULT_FILTER_DATA } from '@shared/constants';

const store = new Store({});

export const getMetaData = <T extends keyof MetaDataType>(key: T) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (store as any).get(key) as MetaDataType[T] | undefined;
};

export const setMetaData = <T extends keyof MetaDataType>(key: T, data: MetaDataType[T]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store as any).set(key, data);
  return undefined;
};

export const assertDataDirectoryIsSelected = () => {
  const dir = getMetaData(MetaDataKey.DATA_DIRECOTRY);
  if (!dir) {
    throw new AxiosError('数据目录未选择', ErrorCode.DATA_DIRECTORY_NOT_SELECTED);
  }
  return dir;
};

const apiMap: Pick<
  ApiFuncMap,
  | ApiType.GET_FAVORITE_STOCK_ID_LIST
  | ApiType.UPDATE_FAVORITE_STOCK_ID_LIST
  | ApiType.GET_DATA_DIRECTORY_BY_SYSTEM_FILE_SELECTOR
  | ApiType.GET_DATA_DIRECTORY
  | ApiType.UPDATE_DATA_DIRECTORY
  | ApiType.GET_FILTER_DATA
  | ApiType.UPDATE_FILTER_DATA
  | ApiType.GET_RATING_MAP
  | ApiType.UPDATE_RATING_MAP
  | ApiType.GET_REVIEW_MAP
  | ApiType.UPDATE_REVIEW_MAP
  | ApiType.GET_BLACKLIST
  | ApiType.UPDATE_BLACKLIST
  | ApiType.GET_RANDOM_NOTE_TEXT
> = {
  [ApiType.GET_RANDOM_NOTE_TEXT]: async () => {
    const dir = assertDataDirectoryIsSelected();
    const parentPath = path.join(dir, DataDirecotry.NOTES);
    const files = fs.readdirSync(parentPath);
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filepath = path.join(parentPath, randomFile);
    const res = await getFileText(filepath);
    return {
      title: randomFile.split('_').slice(0, -1).join('_'),
      content: res,
    };
  },
  [ApiType.GET_RATING_MAP]: async () => {
    const dir = assertDataDirectoryIsSelected();
    const filepath = path.join(dir, DataDirecotry.BASE, FileName.RATING);
    if (fs.existsSync(filepath)) {
      const res = await getFileText(filepath);
      return JSON.parse(res);
    } else {
      return {};
    }
  },
  [ApiType.UPDATE_RATING_MAP]: async (ratingMap) => {
    await writeFileText(
      path.join(assertDataDirectoryIsSelected(), DataDirecotry.BASE),
      FileName.RATING,
      JSON.stringify(ratingMap),
    );
  },
  [ApiType.GET_REVIEW_MAP]: async () => {
    const dir = assertDataDirectoryIsSelected();
    const filepath = path.join(dir, DataDirecotry.BASE, FileName.REVIEW);
    if (fs.existsSync(filepath)) {
      const res = await getFileText(filepath);
      return JSON.parse(res);
    } else {
      return {};
    }
  },
  [ApiType.UPDATE_REVIEW_MAP]: async (reviewMap) => {
    await writeFileText(
      path.join(assertDataDirectoryIsSelected(), DataDirecotry.BASE),
      FileName.REVIEW,
      JSON.stringify(reviewMap),
    );
  },
  [ApiType.GET_BLACKLIST]: async () => {
    const dir = assertDataDirectoryIsSelected();
    const filepath = path.join(dir, DataDirecotry.BASE, FileName.BLACKLIST);
    if (fs.existsSync(filepath)) {
      const res = await getFileText(filepath);
      return JSON.parse(res);
    } else {
      return [];
    }
  },
  [ApiType.UPDATE_BLACKLIST]: async (list) => {
    await writeFileText(
      path.join(assertDataDirectoryIsSelected(), DataDirecotry.BASE),
      FileName.BLACKLIST,
      JSON.stringify(list),
    );
  },
  [ApiType.GET_FAVORITE_STOCK_ID_LIST]: async () => {
    const dir = assertDataDirectoryIsSelected();
    const filepath = path.join(dir, DataDirecotry.BASE, FileName.FAVORITE_STOCK_ID_LIST);
    if (fs.existsSync(filepath)) {
      const res = await getFileText(filepath);
      return JSON.parse(res);
    } else {
      return [];
    }
  },
  [ApiType.UPDATE_FAVORITE_STOCK_ID_LIST]: async (stockIdList) => {
    await writeFileText(
      path.join(assertDataDirectoryIsSelected(), DataDirecotry.BASE),
      FileName.FAVORITE_STOCK_ID_LIST,
      JSON.stringify(stockIdList),
    );
  },
  [ApiType.GET_DATA_DIRECTORY_BY_SYSTEM_FILE_SELECTOR]: getDirectoryBySystemSelector,
  [ApiType.GET_DATA_DIRECTORY]: async () => getMetaData(MetaDataKey.DATA_DIRECOTRY),
  [ApiType.UPDATE_DATA_DIRECTORY]: async (dir) => setMetaData(MetaDataKey.DATA_DIRECOTRY, dir),
  [ApiType.GET_FILTER_DATA]: async () =>
    getMetaData(MetaDataKey.FILTER_DATA) || DEFAULT_FILTER_DATA,
  [ApiType.UPDATE_FILTER_DATA]: async (data) => setMetaData(MetaDataKey.FILTER_DATA, data),
};

export default apiMap;
