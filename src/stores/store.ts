import { configureStore } from '@reduxjs/toolkit';
import appConfiguration from '@/stores/appConfigurationSlice';
import account from '@/stores/accountSlice';
import persist from '@/stores/persistSlice';
import { reduxStorage } from '@/utils/storageUtil.ts';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {
  TypedUseSelectorHook,
  useSelector as useAppSelector,
} from 'react-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appConfiguration: appConfiguration,
  account: account,
  persist: persist,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  devTools: __DEV__,
  whitelist: ['persist', 'account'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {
        warnAfter: 200,
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, useSelector };
export const persistor = persistStore(store);
