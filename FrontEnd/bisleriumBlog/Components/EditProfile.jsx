import React, { useState } from "react";
import "../style/signup.css";
import { Link , useNavigate} from "react-router-dom";
import Nav from './Navbar';
import Footer from './Footer';
import { useSelector } from "react-redux";
import Userurl from "../src";

const EditProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const token = useSelector((state) => state.signin.token);
  const navigate = useNavigate();
  const handleSubmit = async() => {
    

    // Check if at least one field is filled
    if (!name && !bio) {
      setError("Please fill at least one field.");
      return;
    }

    // Clear error message
    setError("");

    // Add logic here to handle form submission, such as updating the user's profile
    
     const formData = new FormData();
     formData.append("FullName", name);
     formData.append("Bio", bio);
     const Requestoptions = {
       method: "POST",
       headers: {
         Authorization: "Bearer " + token,
       },
       body: formData,
     };
     const response = await fetch(Userurl+"UpdateUserProfile", Requestoptions)
     if (response.status == 200){
        navigate("/");
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
                    Update your profile information
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 lg:col-span-2 lg:m-10 m-5">
              <div className="text-center">
                <div>
                  <h1 className="text-4xl text-sky-600 mb-3">Edit Profile</h1>

                  <div  className="space-y-5 mt-10">
                    <input
                      className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                      className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full"
                      placeholder="Bio"
                      rows="4"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button
                      type="submit"
                      className="bg-sky-600 text-white font-medium text-sm px-14 py-3"
                      onClick={handleSubmit}
                    >
                      Update
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

export default EditProfileForm;
