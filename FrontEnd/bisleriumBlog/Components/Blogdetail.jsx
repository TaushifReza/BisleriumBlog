import React, { useState } from 'react';
import "../style/Blogdetail.css";
import { AiFillHeart, AiOutlineComment, AiFillEye } from 'react-icons/ai';
import Nav from './Navbar';
import { Navbar } from '@material-tailwind/react';
import Footer from './Footer';

const initialComments = [
  { id: 1, text: "This is a great post!", likes: 0, replies: [], replyOpen: false },
  // Add more comments as needed
];
function Blogdetail() {
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
                <h2 className="uppercase text-gray-600">23 Sep 2020</h2>
                <h1 className="font-display text-4xl md:text-3xl text-gray-900 mt-2">This is my third & latest post</h1>
                <p className="text-sm text-gray-600 mt-4 mb-2">by Himani Acharya</p>
                <p className="text-sm text-gray-600 mt-3 mb-2"><b>Category: Technology and education</b></p>
              </div>
            </div>
            <hr />
            <div className="mt-4 mb-4">
              <div className="flex items-center ">
                <AiFillHeart className="text-red-500 cursor-pointer" />
                <span className="ml-3 mt-3 text-gray-600">Likes</span>
                <AiOutlineComment className="ml-4 text-blue-500 cursor-pointer" />
                <span className="ml-3 mt-3 text-gray-600">Comment</span>
                <AiFillEye className="text-red-500 cursor-pointer" />
                <span className="ml-3 mt-3 text-gray-600">Views</span>
              </div>
              <hr />
            </div>
            <div className="relative h-96">
              <img src="https://images.unsplash.com/photo-1501631259223-89d4e246ed23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1960&amp;q=80" className="w-full h-full object-cover" alt="post" />
            </div>
            <div className="mt-6">
              <p>Today, I met a young girl from India who'd recently come to the UK.

                She'd worked in hotels before, but her resume had a gap – she'd taken time off to care for her sick father. Her English was excellent, but there was sadness in her voice when she explained.

                She told me about putting her schooling on hold, running her family's business…the dreams she had to put aside.
                It reminded me how often women make those sacrifices, especially in some cultures.

                "But you made it here," I pointed out, "That takes strength."💪

                Her smile told me she wasn't used to hearing that.
                I saw a spark in her.

                "Did you ever want to study further?" I asked.
                "What's the point of studying that way just for the sake of a certificate if it's not to study to learn something?"  She replied back with a smile.

                "If you could have done anything, if nothing stood in your way, what would you be?" I asked.

                "A doctor," she said quickly,  "It was always my dream... but,"  she paused,
                "I don't just dream about things beyond my reach."

                Though everyone has the luxury to dream more than what they can achieve in the present.
                That hit me hard!!
                I thought of all the chances I'd had, the doors that opened for me.

                We didn't have the perfect job for her yet. "But I know people..." I began, "There might be a way to get you an internship somewhere, to learn the system, and to get back into the work world"
                Her face lit up – that hope was the same in any language.
                As she left, I couldn't help but think about the unseen struggles people face. Opportunity isn't equal for everyone.

                It's a luxury to DREAM, it's a luxury to choose a CAREER, it's a luxury to be LAZY.
                Today, that hit me harder than usual !!!!

                Tell me below: Do you think you're privileged? What does privilege mean to you?
              </p>
            </div>
            <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
              <div className="comment-section">
                <h2 className="text-2xl font-bold text-gray-900 mb-5">Comments</h2>
                {comments.map((comment, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 mb-4 shadow-lg">
                    <p className="text-gray-800 leading-relaxed">{comment.text}</p>
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
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 ml-8 mt-3">
                        <p className="text-gray-600">{reply.text}</p>
                      </div>
                    ))}
                    {comment.replyOpen && (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddReply(comment.id, e.target.reply.value);
                        e.target.reply.value = '';
                      }}>
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

                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment(e.target.comment.value);
                  e.target.comment.value = '';
                }}>
                  <textarea
                    name="comment"
                    className="w-full rounded-lg p-4 mt-4 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    placeholder="Write your comment here..."
                    rows="4"
                  ></textarea>
                  <button
                    className="w-full text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-3 mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
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