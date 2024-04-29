import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../GlobalStorage/store.js";

import Signup from "../Components/Signup";
import Signin from "../Components/Signin";
import Emailtemp from "../Components/Emailtemp";
import Forget from "../Components/forget";
import TwoFactor from "../Components/Twofactor";
import Verifyemail from "../Components/Verifyemail";
import MFA from "../Components/MFA.jsx";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/emailtemp",
    element: <Emailtemp />,
  },
  {
    path: "/forget",
    element: <Forget />,
  },
  {
    path: "/twofactor",
    element: <TwoFactor />,
  },
  {
    path: "/verifyemail",
    element: <Verifyemail />,
  },
  {
    path: "/mfa",
    element: <MFA />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
