import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reducer",
  initialState: {},
  reducers: {
    login: (state, action) => ({ ...action.payload }),
    logout: (state, action) => null,
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
