import { configureStore } from "@reduxjs/toolkit";
import loginSlice  from "../Features/userLogin/LoginSlice";
export const store = configureStore({
  reducer: loginSlice,
});
