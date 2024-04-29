import { configureStore,combineReducers } from "@reduxjs/toolkit";
import signupReducer from "../Features/Register/SignupSlice";
import signinReducer from "../Features/SignIn/SignInSlice";


const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});