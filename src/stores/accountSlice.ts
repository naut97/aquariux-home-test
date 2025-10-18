import { createSlice } from '@reduxjs/toolkit';

interface IAccountState {
  info: any;
  watchList: any;
}

const initialState: IAccountState = { info: null, watchList: null };

const slice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    updateAccount: (state, action) => {
      state.info = action.payload;
    },
    updateWatchList: (state, action) => {
      state.watchList = action.payload;
    },
  },
});

const { actions, reducer } = slice;
export const { updateAccount, updateWatchList } = actions;
export default reducer;
