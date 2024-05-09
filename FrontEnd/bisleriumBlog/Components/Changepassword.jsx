import React, { useState } from "react";
import swal from 'sweetalert2' ;
import "../style/signup.css";
import Nav from './Navbar';
import Footer from './Footer';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Userurl from "../src";
const ChangePasswordForm = () => {
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
   const token = useSelector((state) => state.signin.token);
  const navigate = useNavigate();

  const handleSubmit = async() => {
    

    // Check if all fields are filled
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Clear error message
    setError("");

    // Add logic here to handle password change, such as sending a request to update the password
    const formData = new FormData();
     formData.append("CurrentPassword", oldPassword);
     formData.append("NewPassword", newPassword);
     formData.append("ConfirmPassword", confirmPassword);
     const Requestoptions = {
       method: "POST",
       headers: {
         Authorization: "Bearer " + token,
       },
       body: formData,
     };
     const response = await fetch(Userurl+"ChangePassword", Requestoptions)
     const data = await response.json()
     if (response.status === 200){
        navigate("/")
     }else {
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
                <span className="font-semibold tracking-widest uppercase">
                  BISLERIUM_BLOG
                </span>

                <div className="flex flex-col justify-center text-center h-full">
                  <h1 className="text-4xl mb-4">Hello Friend!</h1>
                  <p className="text-gray-200 font-normal leading-relaxed">
                    Update your password
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 lg:col-span-2 lg:m-10 m-5">
              <div className="text-center">
                <div>
                  <h1 className="text-4xl text-sky-600 mb-3">Change Password</h1>

                  <div  className="space-y-5 mt-10">
                    <input
                      className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                      type="password"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                      className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button
                      type="submit"
                      className="bg-sky-600 text-white font-medium text-sm px-14 py-3"
                      onClick={handleSubmit}
                    >
                      Change Password
                    </button>
                  </div>
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

export default ChangePasswordForm;
