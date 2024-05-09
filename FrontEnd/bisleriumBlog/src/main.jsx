import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../GlobalStorage/store.js";
import App from "./App.jsx";
import Home from "./Home";
import { ThemeProvider } from "@material-tailwind/react";

// import Blog from "./pages/blog/Blog";
import AllBlogs from "../Components/Allblogs";
// import BlogInfo from "./pages/blogInfo/BlogInfo";
// import NoPage from "./pages/nopage/NoPage";

import AdminDashboard from "../Components/AdminDashboard";
import CreateBlog from "../Components/CreateBlog";
import Signup from "../Components/Signup";
import Error404 from "../Components/Error404";
import Signin from "../Components/Signin";
import EditProfile from "../Components/EditProfile";
import  Changepassword from "../Components/Changepassword";
import Emailtemp from "../Components/Emailtemp";
import Forget from "../Components/forget";
import TwoFactor from "../Components/Twofactor";
import Verifyemail from "../Components/Verifyemail";
import MFA from "../Components/MFA.jsx";
import BlogComponent from "../Components/BlogComponent.jsx";
import ForgetVerify from "../Components/fortgetVerify.jsx";
import ResetPassword from "../Components/ResetPassword.jsx";
import ProfilePage from "../Components/Profilepage.jsx";
import ConfirmEmail from "../Components/ConfirmEmail.jsx";
import Blogdetail from "../Components/Blogdetail.jsx";
import IndividualBlog from "../Components/individualblogpage.jsx";
import Blogapi from "../Components/blogfileapi.jsx";
import Comment from "../Components/Comment.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        {/* <Home />  */}
        {/* <Blogapi></Blogapi> */}
        <Comment></Comment>
      </App>
    ),
  },
  {
    path: "/individualblog",
    element: (
      <App>
        {/* <Home />  */}
        <IndividualBlog></IndividualBlog>
      </App>
    ),
  },
  // {
  //   path: "/blog",
  //   element: <App><Blog /></App>,
  // },
  {
    path: "/allblogs",
    element: (
      <App>
        <AllBlogs />
      </App>
    ),
  },
  {
    path: "/blogs",
    element: (
      <App>
        <BlogComponent />
      </App>
    ),
  },
  // {
  //   path: "/bloginfo/:id",
  //   element: <App><BlogInfo /></App>,
  // },

  {
    path: "/dashboard",
    element: (
      <App>
        <AdminDashboard />
      </App>
    ),
  },
  {
    path: "/createblog",
    element: (
      <App>
        <CreateBlog />
      </App>
    ),
  },
  {
    path: "/signin",
    element: (
      <App>
        <Signin />
      </App>
    ),
  },
  {
    path: "/signup",
    element: (
      <App>
        <Signup />
      </App>
    ),
  },
  {
    path: "/emailtemp",
    element: (
      <App>
        <Emailtemp />
      </App>
    ),
  },
  {
    path: "/forget",
    element: (
      <App>
        <Forget />
      </App>
    ),
  },
  {
    path: "/twofactor",
    element: (
      <App>
        <TwoFactor />
      </App>
    ),
  },
  {
    path: "/verifyemail",
    element: (
      <App>
        <Verifyemail />
      </App>
    ),
  },
  {
    path: "/mfa",
    element: (
      <App>
        <MFA />
      </App>
    ),
  },
  {
    path: "/forgetverify",
    element: (
      <App>
        <ForgetVerify></ForgetVerify>
      </App>
    ),
  },
  {
    path: "/resetpassword",
    element: (
      <App>
        <ResetPassword></ResetPassword>
      </App>
    ),
  },
  {
    path: "/confirmEmail",
    element: (
      <App>
        <ConfirmEmail></ConfirmEmail>
      </App>
    ),
  },

  {
    path: "/profile",
    element: (
      <App>
        <ProfilePage />
      </App>
    ),
  },
  {
    path: "/blogdetail",
    element: (
      <App>
        <Blogdetail />
      </App>
    ),
  },
  // Other routes...
  {
    path: "/editprofile", // Route for Edit Profile page
    element: (
      <App>
        <EditProfile />
      </App>
    ),
  },
  {
    path: "/changepassword", // Route for Edit Profile page
    element: (
      <App>
        <Changepassword />
      </App>
    ),
  },
  {
    path: "/error", // Route for Edit Profile page
    element: (
      <App>
        <Error404 />
      </App>
    ),
  },
  // {
  //   path: "/*",
  //   element: <App><NoPage /></App>,
  // },
]);

// SignalR Connection

const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://1424-2400-1a00-b040-8072-29e9-6865-ff5b-c1a4.ngrok-free.app/notificationHub")
            .build();

        connection.start().then(()=>console.log("Connection started")).catch((err)=>console.error("ERROR"+err));

        // connection.on("ReceiveNotification", (data)=>{
        //   console.log("Notification received", data)
        // })

        // connection.on("ReceiveNotification", (notificationType, notificationMessage) => {
        //     const notificationElement = document.createElement("div");
        //     notificationElement.textContent = `${notificationType}: ${notificationMessage}`;
        //     document.getElementById("notifications").appendChild(notificationElement);
        // });

        // connection.start()
        //     .then(() => console.log("SignalR connection established."))
        //     .catch(err => console.error("Error establishing SignalR connection:", err));



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        {" "}
        {/* Add this line, include the theme prop if you have a custom theme */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
