import React, { useState } from "react";
import "../style/signup.css";
import { Link, useNavigate } from "react-router-dom";
import Userurl from "../src";
import Nav from './Navbar';
import Footer from './Footer';
import swal from 'sweetalert2' ;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const resetHandler = async (e) => {
    const formData = new FormData();
    formData.append("Password", password);
    formData.append("ConfirmPassword", Confirmpassword);
    formData.append("Email", email);
    formData.append("Token", token);

    const Requestoptions = {
      method: "POST",
      type: "cors",
      body: formData,
    };

    const response = await fetch(
      Userurl + "VerifyOtpForForgotPassword",
      Requestoptions
    );
    const data = await response.json()

    if (response.status == 200) {
      navigate("/signin");
    } else {
      const errors = data.errors;
      let errorMessage = "";
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorMessage += `${key}: ${errors[key]} ` + `${"\n"}`;
        }
      }
      swal.fire({
        icon: 'error',
        title: 'Invalid',
        text: errorMessage,
      });
    }
  };
  return (
    <div>
        <Nav />
    <section className="h-screen flex items-center justify-center inset-0 bg-custom">
      <div className="container 2xl:px-80 xl:px-52">
        <div
          className="bg-white rounded-lg overflow-hidden"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6">
            <div className="xl:col-span-2 lg:col-span-1">
              <div className="bg-sky-600 text-white gap-10 h-full w-full p-7 space-y-6 lg:space-y-0">
                <div className="flex flex-col justify-center text-center h-full">
                  <h1 className="text-4xl mb-4"> BISLERIUM BLOG</h1>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 lg:col-span-2 lg:m-10 m-5">
              <div className="text-center">
                <div>
                  <h1 className="text-4xl text-sky-600 mb-3">Reset Password</h1>
                </div>

                <div className="space-y-5 mt-10">
                  <input
                    className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                    // type={showPassword ? "text" : "password"}
                    type="password"
                    id="pwd"
                    name="pwd"
                    placeholder="New Password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                  />

                  <div className="relative">
                    <input
                      className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                      // type={showPassword ? "text" : "password"}
                      type="password"
                      id="pwd2"
                      name="pwd"
                      placeholder=" Confirm Password"
                      value={Confirmpassword}
                      onInput={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      // onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-3 pr-3 flex items-center text-sm leading-5" // Adjusted right padding here
                    >
                      {/* {showPassword ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>} */}
                    </button>
                  </div>

                  <button
                    className="bg-sky-600 text-white font-medium text-sm rounded-lg px-14 py-3"
                    onClick={resetHandler}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </div>
  );
};

export default ResetPassword;
