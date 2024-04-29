import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userData: {},
};
export const signInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { token, userData } = action.payload;
      state.token = token;
      state.userData = userData;
    },
  },
});

export const { signIn } = signInSlice.actions;
export default signInSlice.reducer;