import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../style/Profile.css";
import BlogPostsMade from './Blogpostmade'; // Import the BlogPostsMade component
import Layout from './Layout';
import { useSelector } from "react-redux";
import Userurl from "../src";
import { Blogurl } from "../src/index";
import swal from "sweetalert2";

const ProfilePage = () => {
    const navigate = useNavigate(); // Initialize navigate
    const token = useSelector((state) => state.signin.token);
    const userDetail = useSelector((state) => state.signin.userData);
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({
        username: userDetail.fullName,
        bio: userDetail.bio,
        numberOfBlogs: 50,
        likes: 350,
        comments: 89,
        profileImage: userDetail.profileImageUrl
    });

    const handleEditProfile = () => {
        navigate('/editprofile'); 
    };

    const handleChangePassword = () => {
        navigate('/changepassword'); 
    };


      useEffect(() => {
        const Requestoptions = {
          method: "GET",
        };
        fetch(Blogurl + `GetAllBlog`, Requestoptions)
          .then((response) => response.json())
          .then((data) => {
            setBlogs(data.result);
          });
      });

    const handleDeleteprofile = async()=>{
         const Requestoptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(Userurl + "DeleteUser", Requestoptions);
    
    if (response.status == 200) {
      navigate("/signin");
    }

    }
    const onUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prevState => ({ ...prevState, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const areyousure = ()=>{
        swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
           handleDeleteprofile()
          }
        });
    }



    return (
        <Layout>
            <div className="h-screen flex items-center justify-center inset-0 bg-custom">
                <div className="container 2xl:px-80 xl:px-52">
                    <main className="profile-page">
                        {/* Background image section */}
                        <section className="relative block" style={{ height: '300px' }}>
                            <div className="container mx-auto px-4 relative" style={{ top: '50%' }}>
                                <div className="flex justify-center">
                                    <label htmlFor='profile' className="cursor-pointer">
                                        <img src={user.profileImage || "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"} className="rounded-full border-4 border-white shadow-lg" style={{ maxWidth: '150px', maxHeight: '150px' }} alt="avatar" />
                                    </label>
                                    <input onChange={onUpload} type='file' id='profile' name='profile' style={{ display: 'none' }} />
                                </div>
                            </div>
                        </section>
                        {/* User information section */}
                        <div className="flex justify-center py-4 border-t border-blueGray-200 p-5 mt-8">
                            <div className="item-spacing"><span className="font-bold">{user.numberOfBlogs}</span> - Blogs</div>
                            <div className="item-spacing"><span className="font-bold">{user.likes}</span> - Likes</div>
                            <div className="item-spacing"><span className="font-bold">{user.comments}</span> - Comments</div>
                        </div>
                        <section className="py-16 bg-blueGray-200">
                            <div className="container mx-auto px-4">
                                <div className="w-full mb-6 shadow-xl rounded-lg px-6 py-8">
                                    <div className="text-center">
                                        <h3 className="text-4xl text-black1 font-semibold leading-normal mb-2 text-blueGray-700">
                                            {user.username}
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg"></i>
                                            {user.location}
                                        </div>
                                        <p className="text-lg leading-relaxed text-blueGray-700">
                                            {user.bio}
                                        </p>
                                    </div>
                                    <div className="mt-10 mb-10 flex justify-center">
                                        <button className="auth-button1 mb-4" onClick={handleChangePassword}>Change Password</button>
                                        <button className="auth-button1 mb-4" onClick={handleEditProfile}>Edit Profile</button>
                                        <button className="auth-button1 mb-4" onClick={areyousure}>Delete Profile</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
            <BlogPostsMade blogPosts={blogs} /> {/* Render the BlogPostsMade component */}
        </Layout>
    );
};

export default ProfilePage;
