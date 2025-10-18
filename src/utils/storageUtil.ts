import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

export const storageForRedux = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storageForRedux.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storageForRedux.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storageForRedux.delete(key);
    return Promise.resolve();
  },
};
