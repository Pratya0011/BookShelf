import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: true,
  userData: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const { setIsLogin, setUserData } = appSlice.actions;
export default appSlice.reducer;
