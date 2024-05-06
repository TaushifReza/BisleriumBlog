import React, { useState } from 'react';
import "../style/Profile.css";
const ProfilePage = () => {
    const [user, setUser] = useState({
        username: "Jenna Stones",
        bio: "Solution Manager - Creative Tim Officer",
        numberOfBlogs: 50,
        likes: 350,
        comments: 89,
        profileImage: null
    });

    const handleEditProfile = () => {
        alert("Edit profile functionality to be implemented!");
    };

    const handleChangePassword = () => {
        alert("Change password functionality to be implemented!");
    };

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

    return (
        <section className="h-screen flex items-center justify-center inset-0 bg-custom">
        <div className="container 2xl:px-80 xl:px-52">
        
        <main className="profile-page">
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
            <div className="flex justify-center py-4 border-t border-blueGray-200 p-5 mt-8">
    <div className="item-spacing"><span className="font-bold">{user.numberOfBlogs}</span> - Blogs</div>
    <div className="item-spacing"><span className="font-bold">{user.likes}</span> - Likes</div>
    <div className="item-spacing"><span className="font-bold">{user.comments}</span> - Comments</div>
</div>


            <section className="py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className=" w-full mb-6 shadow-xl rounded-lg px-6 py-8">
                        <div className="text-center">
                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
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
                        <div className="mt-10 flex justify-center">
                            <button className="auth-button1" onClick={handleChangePassword}>Change Password</button><br></br>                            <button className="auth-button1" onClick={handleEditProfile}>Edit Profile</button>
                        </div>
                    
                    </div>
                </div>
            </section>
        </main>
        </div>
    </section>
    );
};

export default ProfilePage;
