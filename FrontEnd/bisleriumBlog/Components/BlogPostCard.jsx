import React, { useContext,useEffect,useState } from 'react';
import { AiFillHeart, AiFillDislike, AiOutlineComment } from 'react-icons/ai';
import myContext from '../context/myContext';
import { Button } from '@material-tailwind/react';
import { Blogurl } from "../src/index";
import { useNavigate } from "react-router-dom";
const BlogPostCard = () => {
  const context = useContext(myContext);
  const { mode } = context;

 const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      const Requestoptions = {
        method: "GET",
      };
      fetch(Blogurl + `Top3Blog`, Requestoptions)
        .then((response) => response.json())
        .then((data) => {
          setBlogs(data.result);
        });
    });
      const navigate = useNavigate();
      const individual = (id) => {
        console.log(id);
        navigate("/blogdetail", { state: id });
      };

  return (
    <section className="text-gray-600 body-font mt-0">
      <div className="container px-5 py-10 mx-auto flex flex-wrap">
        <h2 className="text-4xl font-bold text-center w-full mb-11 text-black1">
          Most Popular Blogs
        </h2>
        <div className="md:flex md:items-start md:w-1/3 pr-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-4 md:w-full">
              <div
                className={`h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out ${
                  mode === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={blog.imageUrl}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                    {blog.date}
                  </h2>
                  <h1 className="title-font text-lg font-medium mb-3">
                    {blog.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{blog.body}</p>
                  <div className="flex items-center flex-wrap">
                    <AiFillHeart className="text-red-500" />{" "}
                    <span className="ml-2 text-gray-600">
                      {blog.upVoteCoun}
                    </span>
                    <AiFillDislike className="ml-4 text-gray-600" />{" "}
                    <span className="ml-2 text-gray-600">
                      {blog.downVoteCount}
                    </span>
                    <AiOutlineComment className="ml-4 text-blue-500" />{" "}
                    <span className="ml-2 text-gray-600">
                      {blog.commentCount}
                    </span>
                  </div>
                  <a
                    onClick={() => {
                      individual(blog.id);
                    }}
                    className="read-more-btn flex mt-7 hover:text-primary transition-all duration-500 "
                  >
                    Read More<i data-lucide="arrow-up-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostCard;
