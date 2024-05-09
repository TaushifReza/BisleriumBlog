import React, { useState, useEffect} from 'react';
import "../style/Blogdetail.css";
import { AiFillHeart, AiOutlineComment, AiFillEye, AiFillLike, AiFillDislike } from 'react-icons/ai';
import Nav from './Navbar';
import { Navbar } from '@material-tailwind/react';
import Footer from './Footer';
import { useLocation } from "react-router-dom";
import { Blogurl } from "../src/index";

const initialComments = [
  { id: 1, text: "This is a great post!", likes: 0, replies: [], replyOpen: false },
  // Add more comments as needed
];
function Blogdetail() {

  const [blog, setblog] = useState({});
 
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
          console.log(data.result);
        }
      };
      fetchdata();
    },[]);




  const [comments, setComments] = useState(initialComments);
  
  const handleAddComment = (commentText) => {
    setComments([...comments, { id: comments.length + 1, text: commentText, likes: 0, replies: [], replyOpen: false }]);
  };

  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleReplyToComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, replyOpen: !comment.replyOpen };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleAddReply = (commentId, replyText) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const newReply = { id: comment.replies.length + 1, text: replyText }; // Modified this line
        return { ...comment, replies: [...comment.replies, newReply], replyOpen: false };
      }
      return comment;
    });
    setComments(updatedComments);
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
                <p className="text-sm text-gray-600 mt-4 mb-2">by </p>
                <p className="text-sm text-gray-600 mt-3 mb-2">
                  <b>Category: {}</b>
                </p>
              </div>
            </div>

            <div className="relative h-96">
              <img
                src={blog.imgUrl}
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
                <AiFillLike className="text-blue-500 cursor-pointer text-3xl" />
                <span className="ml-3 mt-3 text-gray-600">{blog.upVoteCount}</span>
                <AiFillDislike className="ml-4 text-blue-500 cursor-pointer text-3xl" />
                <span className="ml-3 mt-3 text-gray-600">{blog.downVoteCount}</span>
                <AiFillEye className=" ml-4 text-blue-500 text-3xl" />
                <span className="ml-3 mt-3 text-gray-600">{blog.viewCount}</span>
              </div>
              <hr />
            </div>
            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
              <div className="comment-section">
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                  Comments
                </h2>
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 mb-4 shadow-lg"
                  >
                    <p className="text-gray-800 leading-relaxed">
                      {comment.text}
                    </p>
                    <div className="flex items-center justify-start space-x-4 mt-4">
                      <button
                        className="text-indigo-500 hover:text-indigo-600 transition-colors ease-in-out duration-150"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        Like {comment.likes} ❤️
                      </button>
                      <button
                        className="text-indigo-500 hover:text-indigo-600 transition-colors ease-in-out duration-150"
                        onClick={() => handleReplyToComment(comment.id)}
                      >
                        {comment.replyOpen ? "Cancel" : "Reply"} 💬
                      </button>
                    </div>
                    {comment.replies.map((reply, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-lg p-3 ml-8 mt-3"
                      >
                        <p className="text-gray-600">{reply.text}</p>
                      </div>
                    ))}
                    {comment.replyOpen && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddReply(comment.id, e.target.reply.value);
                          e.target.reply.value = "";
                        }}
                      >
                        <textarea
                          name="reply"
                          className="w-full rounded-lg p-4 mt-4 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                          placeholder="Reply to this comment..."
                          rows="2"
                        ></textarea>
                        <button className="w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-3 mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                          Send Reply
                        </button>
                      </form>
                    )}
                  </div>
                ))}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(e.target.comment.value);
                    e.target.comment.value = "";
                  }}
                >
                  <textarea
                    name="comment"
                    className="w-full rounded-lg p-4 mt-4 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    placeholder="Write your comment here..."
                    rows="4"
                  ></textarea>
                  <button className="w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-3 mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Post Comment
                  </button>
                </form>
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