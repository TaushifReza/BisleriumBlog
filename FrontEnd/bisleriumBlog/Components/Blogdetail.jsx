import React, { useState, useEffect } from "react";
import "../style/Blogdetail.css";
import {
  AiFillEye,
  AiFillLike,
  AiFillDislike,
  AiFillDelete,
} from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import Nav from "./Navbar";
import { Navbar } from "@material-tailwind/react";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import {
  Blogurl,
  Upvoteurl,
  Downvoteurl,
  Commenturl,
  LikeCommenturl,
  DislikeCommenturl,
} from "../src/index";
import { useSelector } from "react-redux";

function Blogdetail() {
  const [blog, setblog] = useState({});
  const [upvote, setupvote] = useState(false);
  const [downvote, setdownvote] = useState(false);
  const [upvoteComment, setupvoteComment] = useState(false);
  const [downvoteComment, setdownvoteComment] = useState(false);
  const [deletecomment, setdeletecomment] = useState(false);
  const token = useSelector((state) => state.signin.token);
  const [getAllComment, setGetAllComment] = useState([]);
  const [postcomment, setpostComment] = useState("");
  const [update, setupdate] = useState(false);
  const [cc, setcc] = useState(false);

  const Requestoptions = {
    method: "GET",
  };
  const id = useLocation();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(
        `${Blogurl}GetBlog/${id.state}`,
        Requestoptions
      );
      const data = await response.json();
      if (response.status == 200) {
        setblog(data.result);
      }
    };
    fetchdata();
  }, [upvote, downvote]);

  useEffect(() => {
    const getAllCommnet = async () => {
      const Requestoptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(
        Commenturl + `GetAllCommentForBlog/${id.state}`,
        Requestoptions
      );

      const data = await response.json();

      if (response.status == 200) {
        setGetAllComment(data.result);
      }
    };
    getAllCommnet();
  }, [upvoteComment, downvoteComment, cc, deletecomment]);

  const upvoteBlog = async (id) => {
    const formData = new FormData();
    formData.append("BlogId", id);
    const Requestoptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(Upvoteurl + "UpVoteBlog", Requestoptions);
    if (response.status == 201) {
      setupvote(!upvote);
    }
  };

  const downvoteBlog = async (id) => {
    const formData = new FormData();
    formData.append("BlogId", id);
    const Requestoptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(Downvoteurl + "DownVoteBlog", Requestoptions);
    if (response.status == 201) {
      setdownvote(!downvote);
    }
  };

  const LikeComment = async (id) => {
    const formData = new FormData();
    formData.append("CommentId", id);
    const Requestoptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };
    const response = await fetch(
      LikeCommenturl + "LikeComment",
      Requestoptions
    );

    if (response.status == 201) {
      setupvoteComment(!upvoteComment);
    }
  };

  const DislikeComment = async (id) => {
    const formData = new FormData();
    formData.append("CommentId", id);
    const Requestoptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };
    const response = await fetch(
      DislikeCommenturl + "DisLikeComment",
      Requestoptions
    );

    if (response.status == 201) {
      setdownvoteComment(!downvoteComment);
    }
  };

  const createComment = async (id) => {
    const Requestoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ content: postcomment, blogId: id }),
    };

    const response = await fetch(Commenturl + "CreateComment", Requestoptions);
    console.log(response);

    if (response.status == 201) {
      setcc(true);
    }
  };

  const deleteComment = async (id) => {
    const Requestoptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      `${Commenturl}DeleteComment/${id}`,
      Requestoptions
    );

    if (response.status == 204) {
      setdeletecomment(true);
      setcc(false);
    }
  };
  const updateComment = async (id) => {
    const Requestoptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ content: comment }),
    };

    const response = await fetch(
      Commenturl + `UpdateComment/${id}`,
      Requestoptions
    );

    if (response.status == 205) {
      console.log("updated");
    }
  };

  return (
    <div>
      <Nav />
      <section className="flex items-center justify-center bg-custom">
        <body className="text-gray-900 antialiased">
          <div className="max-w-4xl mx-auto py-12 px-12 lg:px-24 -mt-32 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="uppercase text-gray-900">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </h2>
                <h1 className="text-3xl mt-2 ">{blog.title}</h1>
                <p className="text-sm text-gray-600 mt-4 mb-2">
                  by {blog.user && blog.user.fullName}
                </p>
                <p className="text-sm text-gray-600 mt-3 mb-2">
                  <b>Category: {blog.category && blog.category.name}</b>
                </p>
              </div>
            </div>

            <div className="relative h-96">
              <img
                src="https://tech.feedspot.com/wp-content/uploads/2016/08/technology.jpeg"
                className="w-full h-full object-cover"
                alt="post"
              />
            </div>
            <div className="mt-6">
              <p>{blog.body}</p>
            </div>
            <hr />
            <div className="mt-4 mb-4">
              <div className="flex items-center ">
                <AiFillLike
                  className="text-blue-500 cursor-pointer text-3xl"
                  onClick={() => {
                    upvoteBlog(id.state);
                  }}
                />
                <span className="ml-3 mt-3 text-gray-600">
                  {blog.upVoteCount}
                </span>
                <AiFillDislike
                  className="ml-4 text-blue-500 cursor-pointer text-3xl"
                  onClick={() => {
                    downvoteBlog(id.state);
                  }}
                />
                <span className="ml-3 mt-3 text-gray-600">
                  {blog.downVoteCount}
                </span>
                <AiFillEye className=" ml-4 text-blue-500 text-3xl" />
                <span className="ml-3 mt-3 text-gray-600">
                  {blog.viewCount}
                </span>
              </div>
              <hr />
            </div>
            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
              <div className="comment-section">
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                  Comments
                </h2>
                {getAllComment &&
                  getAllComment.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 mb-4 shadow-lg"
                    >
                      <p className="text-gray-800 leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center justify-start space-x-4 mt-4">
                        <button className="text-indigo-500 hover:text-indigo-600 transition-colors ease-in-out duration-150">
                          <div className="flex">
                            <AiFillLike
                              className="text-blue-500 cursor-pointer text-xl"
                              onClick={() => {
                                LikeComment(comment.id);
                              }}
                            />
                            <span className="ml-3 text-gray-600">
                              {comment.likeCount}
                            </span>
                            <AiFillDislike
                              className="text-blue-500 cursor-pointer text-xl ml-4"
                              onClick={() => {
                                DislikeComment(comment.id);
                              }}
                            />
                            <span className="ml-3  text-gray-600">
                              {comment.disLikeCount}
                            </span>
                          </div>
                        </button>
                        {blog.userId == comment.userId && (
                          <>
                            <AiFillDelete
                              className=" ml-5 text-blue-500 cursor-pointer text-xl"
                              onClick={() => {
                                deleteComment(comment.id);
                              }}
                            />
                            <GrUpdate
                              className=" ml-5 text-blue-500 cursor-pointer text-lg"
                              onClick={() => {}}
                            ></GrUpdate>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                <div>
                  <textarea
                    name="comment"
                    className="w-full rounded-lg p-4 mt-4 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    placeholder="Write your comment here..."
                    rows="4"
                    onInput={(e) => {
                      setpostComment(e.target.value);
                    }}
                  ></textarea>
                  <button
                    className="w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-3 mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    onClick={() => {
                      createComment(id.state);
                    }}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </body>
      </section>
      <Footer />
    </div>
  );
}

export default Blogdetail;
