import { createSlice } from '@reduxjs/toolkit';
import { MOVIE_GROUP, MOVIE_SORT_ITEM } from '@/screens/Home/constants';

interface IPersistState {
  homeCategory: MOVIE_GROUP;
  homeSort?: MOVIE_SORT_ITEM;
}

const initialState: IPersistState = {
  homeCategory: MOVIE_GROUP.NOW_PLAYING,
  homeSort: undefined,
};

const slice = createSlice({
  name: 'persist',
  initialState: initialState,
  reducers: {
    updateHomeCategoryPersist: (state, action) => {
      state.homeCategory = action.payload;
    },
    updateHomeSortPersist: (state, action) => {
      state.homeSort = action.payload;
    },
  },
});

const { actions, reducer } = slice;
export const { updateHomeCategoryPersist, updateHomeSortPersist } = actions;
export default reducer;
