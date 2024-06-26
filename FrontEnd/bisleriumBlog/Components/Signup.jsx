

import React,{useState} from 'react';
import swal from 'sweetalert2' ;
import '../style/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import  Userurl  from '../src';


const Signup = () => {

      const [fullName, setFullName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [bio, setBio]= useState("");
      const [profileImg, setProfileImg] = useState(null);
      const navigate = useNavigate();
      
      const [showPassword, setShowPassword] = useState(false); // State for password visibility
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility of the password
      };
      const signupHandler = async(e) => {
        const formData = new FormData();
        formData.append("FullName", fullName.trim());
        formData.append("Email", email.trim());
        formData.append("Password", password);
        formData.append("ConfirmPassword", confirmPassword);
        formData.append("Bio", bio.trim());
        formData.append("ProfileImage", profileImg)
        

         const Requestoptions = {
           method: "POST",
           body: formData
         };

         const response = await fetch(Userurl+"Register",Requestoptions )
         const data = await response.json()
         
      
        
         if (response.status === 200) {
            navigate("/verifyemail");
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
                        className="border text-white font-medium text-sm  transition-all duration-300  hover:text-black1 focus:bg-white focus:text-black px-14 py-2.5"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-3 lg:col-span-2 lg:m-10 m-5">
                <div className="text-center">
                  <h3 className="text-4xl text-sky-600 mb-3">Create Account</h3>

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
                        {showPassword ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}
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
                        {showPassword ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}
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

export default Signup;
