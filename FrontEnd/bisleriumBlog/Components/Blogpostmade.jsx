import React, { useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineComment,
  AiFillDelete,
} from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import { Blogurl } from "../src/index";

const BlogPostsMade = ({ blogPosts }) => {
  const postsPerPage = 3; // Number of blog posts per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Calculate index of the first and last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const navigate = useNavigate();

  const individual = (id) => {
    navigate("/blogdetail", { state: id });
  };

  const userdata = useSelector((state) => state.signin.userData);
  const token = useSelector((state) => state.signin.token);

  const deleteBlog = async (id) => {
    const Requestoptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`${Blogurl}DeleteBlog/${id}`, Requestoptions);
   
    if (response.status == 200) {
      navigate("/profile");
    }
  };

  const areyousure = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteBlog(id);
        }
      });
  };
      const updateBlog = (data) => {
        navigate("/update", { state: data });
      };

    const areyousureupdate = (data) => {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            updateBlog(data)
          }
        });
    };

  return (
    <section className="py-8 bg-blueGray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          My Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(
            (blog) =>
              userdata.id == blog.userId && (
                <div
                  key={blog.id}
                  className="bg-white shadow-lg rounded-lg px-4 py-6"
                >
                  <img
                    src={blog.image}
                    alt="Blog Post"
                    className="h-40 w-full object-cover object-center mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="line-clamp-3 text-gray-800">{blog.body}</p>
                  <div className="flex items-center flex-wrap mt-4">
                    <AiFillLike className="text-red-500" />{" "}
                    <span className="ml-2 text-gray-600">
                      {blog.upVoteCount}
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
                  <div className="flex mb-2 justify-between">
                    <a
                      onClick={() => {
                        individual(blog.id);
                      }}
                      className="read-more-btn flex mt-7 hover:text-primary transition-all duration-500 "
                    >
                      Read More
                    </a>
                    {userdata.id === blog.userId && (
                      <>
                        <AiFillDelete
                          className="text-red-500 text-lg mt-8 cursor-pointer"
                          onClick={() => {
                            areyousure(blog.id);
                          }}
                        />
                        <GrUpdate className="mt-8 cursor-pointer" onClick={()=>{areyousureupdate(blog)}}/>
                      </>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(blogPosts.length / postsPerPage)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className="mx-1 px-3 py-1 bg-blue-500 text-white rounded-md"
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPostsMade;
