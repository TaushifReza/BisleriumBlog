import React, { useState } from 'react';
import { AiFillHeart, AiFillDislike, AiOutlineComment } from 'react-icons/ai';

const BlogPostsMade = ({ blogPosts }) => {
    const postsPerPage = 3; // Number of blog posts per page
    const [currentPage, setCurrentPage] = useState(1); // Current page number

    // Calculate index of the first and last post on the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="py-8 bg-blueGray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-center mb-4">My Blog Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map(blog => (
                        <div key={blog.id} className="bg-white shadow-lg rounded-lg px-4 py-6">
                            <img src={blog.image} alt="Blog Post" className="h-40 w-full object-cover object-center mb-4 rounded-lg" />
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{blog.date}</p>
                            <p className="text-gray-800">{blog.description}</p>
                            <div className="flex items-center flex-wrap mt-4">
                                <AiFillHeart className="text-red-500" /> <span className="ml-2 text-gray-600">{blog.likes}</span>
                                <AiFillDislike className="ml-4 text-gray-600" /> <span className="ml-2 text-gray-600">{blog.dislikes}</span>
                                <AiOutlineComment className="ml-4 text-blue-500" /> <span className="ml-2 text-gray-600">{blog.comments}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    {[...Array(Math.ceil(blogPosts.length / postsPerPage)).keys()].map(number => (
                        <button key={number + 1} onClick={() => paginate(number + 1)} className="mx-1 px-3 py-1 bg-blue-500 text-white rounded-md">{number + 1}</button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPostsMade;
