import { createSlice } from '@reduxjs/toolkit';

interface AppConfigurationState {
  imageConfig: any;
}

const appConfigurationSlice = createSlice({
  name: 'appConfiguration',
  initialState: {} as AppConfigurationState,
  reducers: {
    updateConfig: (state, action) => {
      state.imageConfig = action.payload;
    },
  },
});

export const { updateConfig } = appConfigurationSlice.actions;

export default appConfigurationSlice.reducer;
