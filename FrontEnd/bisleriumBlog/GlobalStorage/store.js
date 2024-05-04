import { configureStore,combineReducers } from "@reduxjs/toolkit";

import signinReducer from "../Features/SignIn/SignInSlice";


const rootReducer = combineReducers({
  signin: signinReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});