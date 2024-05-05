import React, { useState } from "react";
import "../style/signup.css";
import { Link } from "react-router-dom";
import Userurl from "../src";

const Forget = () => {
  const [email, setEmail] = useState("");

  const forgetPasswordhandler = async (e) => {
    const Requestoptions = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: email,
    };

    const response = await fetch(
      Userurl + "SendOtpForForgotPassword",
      Requestoptions
    );

    const data = await response.json();
    console.log(response);
    console.log(data);
    if (response.status == 200) {
      console.log(data);
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
                  <h3 className="text-4xl mb-4">Welcome Back!</h3>
                  <p className="text-gray-200 font-normal leading-relaxed">
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <div className="my-8">
                    <Link
                      to="/signin"
                      className="border text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black px-14 py-2.5"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 lg:col-span-2 lg:m-10 m-5">
              <div className="text-center">
                <div>
                  <h1 className="text-4xl text-sky-600 mb-3">
                    Forget Password
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
                    Enter your email and we'll send you a link to reset your
                    password
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
                    required
                  />

                  <button
                    className="bg-sky-600 text-white font-medium text-sm rounded-full px-14 py-3"
                    onClick={forgetPasswordhandler}
                  >
                    Submit
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

export default Forget;
