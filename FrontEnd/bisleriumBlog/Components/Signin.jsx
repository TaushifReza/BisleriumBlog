import React, { useState } from "react";
import "../style/signup.css";
import { Link, useNavigate } from "react-router-dom";
import Userurl from "../src";
import { useDispatch } from "react-redux";
import { signIn } from "../Features/SignIn/SignInSlice";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signinHandler = async (e) => {
    const formData = new FormData();
    formData.append("Email", email.trim());
    formData.append("Password", password);
    console.log(email, password);
    const Requestoptions = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(Userurl + "Login", Requestoptions);
    const data = await response.json();
    if (response.status == 200) {
      dispatch(signIn({ token: data.result.token, userData: data.result.userData }));
      navigate("/");
    }
  };
  return (
    <section className="h-screen flex items-center justify-center inset-0 bg-custom">
      <div className="container 2xl:px-80 xl:px-52">
        <div
          className="bg-white rounded-lg overflow-hidden"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6">
            <div className="xl:col-span-2 lg:col-span-1">
              <div className="bg-sky-600 text-white gap-10 h-full w-full p-7 space-y-6 lg:space-y-0">
                <span className="font-semibold tracking-widest uppercase">
                  BISLERIUM_BLOG
                </span>

                <div className="flex flex-col justify-center text-center h-full">
                  <h1 className="text-4xl mb-4">Hello Friend!</h1>
                  <p className="text-gray-200 font-normal leading-relaxed">
                    Enter your personal details and start journey with us
                  </p>
                  <div className="my-8">
                    <Link
                      to="/signup"
                      className="border text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black px-14 py-2.5"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 lg:col-span-2 lg:m-10 m-5">
              <div className="text-center">
                <div>
                  <h1 className="text-4xl text-sky-600 mb-3">
                    Sign In BisleriumBlog
                  </h1>

                  <div className="flex items-center justify-center gap-2 my-5">
                    <a
                      href="#"
                      className="border rounded-full flex items-center justify-center transition-all duration-300 focus:bg-sky-600 focus:text-white hover:bg-sky-600 hover:text-white h-10 w-10"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href="#"
                      className="border rounded-full flex items-center justify-center transition-all duration-300 focus:bg-sky-600 focus:text-white hover:bg-sky-600 hover:text-white h-10 w-10"
                    >
                      <i className="fa-brands fa-google-plus-g"></i>
                    </a>
                    <a
                      href="#"
                      className="border rounded-full flex items-center justify-center transition-all duration-300 focus:bg-sky-600 focus:text-white hover:bg-sky-600 hover:text-white h-10 w-10"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </div>

                  <p className="text-sm font-medium leading-relaxed">
                    Or use your email account
                  </p>
                </div>

                <div className="space-y-5 mt-10">
                  <input
                    className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                  />
                 <div className="relative">
  <input
    className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
    // type={showPassword ? "text" : "password"}
    type="password"
    id="pwd"
    name="pwd"
    placeholder="Password"
    value={password}
    onInput={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    // onClick={togglePasswordVisibility}
    className="absolute inset-y-0 right-3 pr-3 flex items-center text-sm leading-5" // Adjusted right padding here
  >
    {/* {showPassword ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>} */}
  </button>
</div>

                  <Link
                    to="/forget"
                    className="text-gray-500 font-medium underline block"
                  >
                    Forget Your Password?
                  </Link>

                  <button
                    className="bg-sky-600 text-white font-medium text-sm rounded-full px-14 py-3"
                    onClick={signinHandler}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
