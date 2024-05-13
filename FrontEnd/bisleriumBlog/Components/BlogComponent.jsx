import React, { useEffect, useState } from "react";
import "../style/Blog.css";
import { Blogurl } from "../src/index";
import { AiFillHeart, AiFillDislike, AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);

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
  

  return (
    <section id="demo" className="py-28">
      <div className="container1">
        <BlogGrid blogs={blogs} />
      </div>
    </section>
  );
};

const BlogGrid = ({ blogs }) => {
  return (
    <div className="relative">
      <div className="flex flex-wrap  justify-between ">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id= {blog.id}
            title={blog.title}
            viewcount={blog.viewcount}
            date={new Date(blog.createdAt).toLocaleDateString()}
            category={blog.categoryID}
            image={blog.imageUrl}
            description={blog.body}
            likes={blog.upVoteCount}
            dislikes={blog.downVoteCount}
            comments={blog.commentCount}
          />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({
  id,
  title,
  date,
  category,
  image,
  description,
  likes,
  dislikes,
  comments,
  viewcount,
}) => {
  const navigate = useNavigate();
  const individual = (id) => {
    console.log(id);
    navigate("/blogdetail", { state: id });
  };

  return (
    <div className="group sm:flex rounded-xl">
      <div className="flex-shrink-0 relative rounded-xl overflow-hidden h-[200px] sm:w-[500px] sm:h-[300px] group">
        <img
          className="w-full h-full transition-all duration-500 group-hover:shadow-sm group-hover:scale-110"
          src={image}
          alt="Image Description"
        />
      </div>
      <div className="grow ms-14">
        <div className="p-4 flex flex-col h-full sm:p-6">
          <div className="mb-3 flex items-center">
            <p className="inline-flex items-center gap-1.5 py-1.5 rounded-md text-sm font-medium text-dark me-7 underline ">
              {category}
            </p>
            <p className="text-sm text-gray-500 ms-7">{date}</p>
          </div>
          <a
            href="#"
            className="text-lg sm:text-3xl font-semibold text-dark hover:text-primary transition-all duration-500"
          >
            {title}
          </a>
          <p className=" line-clamp-3 mt-4 mb-6 text-gray-500 text-base leading-7 font-medium ">
            {description}
          </p>

          <div className="flex items-center flex-wrap">
            <AiFillHeart className="text-red-500" />{" "}
            <span className="ml-2 text-gray-600">{likes}</span>
            <AiFillDislike className="ml-4 text-gray-600" />{" "}
            <span className="ml-2 text-gray-600">{dislikes}</span>
            <AiOutlineComment className="ml-4 text-blue-500" />{" "}
            <span className="ml-2 text-gray-600">{comments}</span>
            <p>view</p>
            <span className="ml-2 text-gray-600">{viewcount}</span>
          </div>
          <a
            onClick={()=>{individual(id)}}
            className="read-more-btn flex mt-7 hover:text-primary transition-all duration-500 "
          >
            Read More<i data-lucide="arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
