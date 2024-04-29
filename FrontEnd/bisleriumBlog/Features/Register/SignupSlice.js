import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  id: "" 
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { token, id } = action.payload;
      state.token = token;
      state.id = id;
    },
  },
});

export const { signup } = signupSlice.actions;
export default signupSlice.reducer