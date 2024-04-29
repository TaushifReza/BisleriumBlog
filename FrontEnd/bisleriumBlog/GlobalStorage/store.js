import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../Features/Register/SignupSlice";



export const store = configureStore({
  reducer: signupReducer
});
