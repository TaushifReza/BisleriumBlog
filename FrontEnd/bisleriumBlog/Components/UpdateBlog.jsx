import React, { useState, useContext, useEffect } from "react";
import myContext from "../context/myContext";
import Nav from "./Navbar";
import Footer from "./Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the editor
import { useSelector } from "react-redux";
import { Blogurl, Categoryurl } from "../src/index";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateBlog() { 
  const blogdata = useLocation();
  const blog = blogdata.state
  const context = useContext(myContext);
  const { mode } = context;
  const [categorydata, setcategorydata] = useState([]);
  const [content, setContent] = useState(blog.body);
  const [category, setCategory] = useState(blog.category.name); // Default category

  const [title, setTitle] = useState(blog.title);

  const [blogImg, setBlogImg] = useState("");

  const token = useSelector((state) => state.signin.token);
  const navigate = useNavigate();
 



  const updateBlog = async (id) => {
    const formData = new FormData();
    formData.append("Body", content);
    formData.append("BlogImage", blogImg);

    const Requestoptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    const response = await fetch(`${Blogurl}UpdateBlog/${id}`, Requestoptions);

    if (response.status == 205) {
      navigate("/profile")
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <div className="container mx-auto max-w-5xl py-6 mt-5 mb-5 content-center">
        <div
          className={`p-5 rounded-lg shadow-lg ${
            mode === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold justify-content-center">
              Update blog
            </h1>
          </div>

          <div className="mb-3">
            <input
              type="file"
              onChange={(e) => {
                setBlogImg(e.target.files[0]);
              }}
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-2 mt-4">
              Enter your Title:
            </label>
            <input
              type="text"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Blog Title"
           
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-2 mt-4">
              Select Category:
            </label>
            <input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              
            >
       
            </input>
          </div>
          <div className="mb-5">
            <label className="block text-xl font-semibold mb-2 mt-4">
              Content:
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(content) => setContent(content)}
              style={{ height: "300px" }}
            />
          </div>
          <button
            onClick={()=>{updateBlog(blog.id)}}
            className="bg-sky-600 text-white font-medium text-sm  px-14 py-3"
          >
            Update
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateBlog;
