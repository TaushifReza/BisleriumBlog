import React, { useContext, useState } from 'react';
import "../style/Blogdetail.css"
import myContext from '../context/myContext';

import { AiFillHeart, AiFillDislike, AiOutlineComment } from 'react-icons/ai';

function Blogdetail() {
   // State for storing comments
   const [comments, setComments] = useState([]);

   // Function to handle adding new comment
   const handleAddComment = (comment) => {
     setComments([...comments, comment]);
   };
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <body className="font-sans text-gray-700 antialiased bg-white ">
      <div className="relative h-96">
        <img src="https://images.unsplash.com/photo-1501631259223-89d4e246ed23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1960&amp;q=80" className="w-full h-full object-cover" alt="post" />
      </div>
      <div className="max-w-4xl mx-auto bg-white py-12 px-12 lg:px-24 -mt-32 relative z-10">
        <h2 className="mt-4 uppercase tracking-widest text-xs text-gray-600">23 Sep 2020</h2>
        <h1 className="font-display text-2xl md:text-3xl text-gray-900 mt-4">This is my third &amp;latest post</h1>
        <div className="flex items-center flex-wrap">
          <AiFillHeart className="text-red-500" /> <span className="ml-2 text-gray-600">likes</span>
          <AiFillDislike className="ml-4 text-gray-600" /> <span className="ml-2 text-gray-600">dislikes</span>
          <AiOutlineComment className="ml-4 text-blue-500" /> <span className="ml-2 text-gray-600">comment</span>
        </div>
        <div className="prose prose-sm sm:prose lg:prose-lg mt-6">
          <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
          <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
          <h2>Section Header</h2>
          <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>
        </div>
        {/* Comment section */}
        <div className="comment-section mt-8">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {/* Display existing comments */}
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 rounded p-4 mb-2">
              <p>{comment}</p>
            </div>
          ))}
          {/* Form for adding new comment */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const newComment = e.target.comment.value;
            if (newComment.trim() !== '') {
              handleAddComment(newComment);
              e.target.comment.value = '';
            }
          }}>
            <textarea name="comment" className="w-full rounded p-2 mb-2" placeholder="Write your comment here..." rows="4"></textarea>
            <button type="submit" style={{ backgroundColor: '#3182ce', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Post Comment</button>
          </form>
        </div>
      </div>
    </body>
  );
}

export default Blogdetail;
