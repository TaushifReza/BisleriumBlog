import React, { useState } from "react";
import swal from "sweetalert2";
import "../style/signup.css";
import { Link, useNavigate } from "react-router-dom";


const AddAdmin = () => {
        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [bio, setBio] = useState("");
        const [profileImg, setProfileImg] = useState(null);
        const navigate = useNavigate();

        const [showPassword, setShowPassword] = useState(false); // State for password visibility

        const togglePasswordVisibility = () => {
          setShowPassword(!showPassword); // Toggle the visibility of the password
        };
        const signupHandler = async (e) => {
          const formData = new FormData();
          formData.append("FullName", fullName.trim());
          formData.append("Email", email.trim());
          formData.append("Password", password);
          formData.append("ConfirmPassword", confirmPassword);
          formData.append("Bio", bio.trim());
          formData.append("ProfileImage", profileImg);

          const Requestoptions = {
            method: "POST",
            body: formData,
          };

          const response = await fetch("https://localhost:7094/api/Admin/RegisterAdmin", Requestoptions);
          const data = await response.json();

          if (response.status === 200) {
            navigate("/admin");
          } else {
            const errors = data.errors;
            let errorMessage = "";
            for (const key in errors) {
              if (errors.hasOwnProperty(key)) {
                errorMessage += `${key}: ${errors[key]} ` + `${"\n"}`;
              }
            }
            swal.fire({
              icon: "error",
              title: "Invalid",
              text: errorMessage,
            });
          }
        };

        return (
          <section className="h-screen flex items-center justify-center inset-0 bg-custom">
            <div className="mt-14">
              <div
                className="bg-white rounded-lg overflow-hidden"
                style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
              >
                <div className="">

                  <div className="xl:col-span-3 lg:col-span-2 lg:m-10 m-5">
                    <div className="text-center">
                      <h3 className="text-4xl text-sky-600 mb-4">
                        Create Account For Admin
                      </h3>

                      <div className="space-y-5 mt-3">
                        <input
                          className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2 px-4 w-full"
                          type="text"
                          id="fullname"
                          name="fullname"
                          placeholder="Full Name"
                          value={fullName}
                          onInput={(e) => setFullName(e.target.value)}
                          required
                        />
                        <input
                          className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2 px-4 w-full"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onInput={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div className="relative">
                          <input
                            className="text-gray-500 border-gray-300 focus:ring-0 focus:bonpm initrder-gray-400 text-sm rounded-lg py-2 px-4 w-full"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 pr-3 flex items-center text-sm leading-5" // Adjusted right padding here
                          >
                            {showPassword ? (
                              <i
                                className="fa fa-eye-slash"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            )}
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2 px-4 w-full"
                            type={showPassword ? "text" : "password"}
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onInput={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                            required
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 pr-3 flex items-center text-sm leading-5" // Adjusted right padding here
                          >
                            {showPassword ? (
                              <i
                                className="fa fa-eye-slash"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            )}
                          </button>
                        </div>
                        <input
                          className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-3 px-4 w-full"
                          type="text"
                          id="bio"
                          name="bio"
                          placeholder="Bio (optional)"
                          value={bio}
                          onInput={(e) => {
                            setBio(e.target.value);
                          }}
                          maxLength="160"
                        />
                        <input
                          className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2 px-4 w-full"
                          type="file"
                          id="profile_image"
                          name="profile_image"
                          placeholder="Profile Image (optional)"
                          onChange={(e) => {
                            setProfileImg(e.target.files[0]);
                          }}
                        />
                        <input
                          type="submit"
                          value="Sign Up"
                          className="bg-sky-600  text-white font-medium text-sm  py-3 px-6 inline-block"
                          style={{ cursor: "pointer" }}
                          onClick={signupHandler}
                        />

                        {/* <Link
                      to="/verifyemail"
                      className="bg-sky-600 text-white font-medium text-sm rounded-full px-14 py-3"
                    >
                      
                    </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
};
export default AddAdmin;
