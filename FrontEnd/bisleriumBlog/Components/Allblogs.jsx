import React from "react";
import Nav from "./Navbar";
import Footer from "./Footer";
import { AiFillHeart, AiFillDislike, AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";

function AllBlogs() {
  const blogs = [
    {
      id: 1, // Assuming you have a unique identifier such as an id
      likes: 120,
      dislikes: 3,
      comments: 15,
    },
    // You can add more blog items here with unique 'id'
  ];

  return (
    <div className="bg-white">
      <Nav />

      {/* Text Header */}
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
          <a
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            href="#"
          >
            List of Blogs
          </a>
          <br></br>
          <p className="text-lg text-gray-600">
            Scroll down to view all the blogs
          </p>
        </div>
      </header>

      {/* Topic Navigation */}
      <div className="mb-4">
        <nav className="w-full py-4 border-t border-b bg-gray-100">
          <div className="w-full container mx-auto flex justify-center">
            <div className="flex flex-wrap">
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                Technology
              </a>
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                Automotive
              </a>
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                Finance
              </a>
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                Politics
              </a>
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                Culture
              </a>
              <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                Sports
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div className="container mx-auto py-6">
        {/* Posts Section */}
        <section className="w-full md:w-2/3 mx-auto px-3">
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex flex-col shadow rounded-lg overflow-hidden"
              >
                {/* Article Image */}
                <a href="#" className="hover:opacity-75">
                  <img
                    src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${blog.id}`}
                    className="w-full h-auto"
                  />
                </a>
                <div className="bg-white flex flex-col justify-start p-6 space-y-3">
                  <a
                    href="#"
                    className="text-blue-700 text-sm font-bold uppercase"
                  >
                    Environment
                  </a>
                  <div className="flex items-center flex-wrap">
                    <AiFillHeart className="text-red-500" />{" "}
                    <span className="ml-2 text-gray-600">{blog.likes}</span>
                    <AiFillDislike className="ml-4 text-gray-600" />{" "}
                    <span className="ml-2 text-gray-600">{blog.dislikes}</span>
                    <AiOutlineComment className="ml-4 text-blue-500" />{" "}
                    <span className="ml-2 text-gray-600">{blog.comments}</span>
                  </div>
                  <a href="#" className="text-xl font-bold hover:text-gray-700">
                    Environment image
                  </a>
                  <p className="text-sm">
                    By{" "}
                    <a href="#" className="font-semibold hover:text-gray-800">
                      David Grzyb
                    </a>
                    , Published on April 25th, 2020
                  </p>
                  <a href="#" className="text-gray-700 hover:text-black">
                    Continue Reading <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>
            ))}

            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex flex-col shadow rounded-lg overflow-hidden"
              >
                {/* Article Image */}
                <a href="#" className="hover:opacity-75">
                  <img
                    src={`https://tech.feedspot.com/wp-content/uploads/2016/08/technology.jpeg`}
                    className="w-full h-auto"
                  />
                </a>
                <div className="bg-white flex flex-col justify-start p-6 space-y-3">
                  <a
                    href="#"
                    className="text-blue-700 text-sm font-bold uppercase"
                  >
                    Technology
                  </a>
                  <div className="flex items-center flex-wrap">
                    <AiFillHeart className="text-red-500" />{" "}
                    <span className="ml-2 text-gray-600">{blog.likes}</span>
                    <AiFillDislike className="ml-4 text-gray-600" />{" "}
                    <span className="ml-2 text-gray-600">{blog.dislikes}</span>
                    <AiOutlineComment className="ml-4 text-blue-500" />{" "}
                    <span className="ml-2 text-gray-600">{blog.comments}</span>
                  </div>
                  <a href="#" className="text-xl font-bold hover:text-gray-700">
                    Tech is the best thing to do in 2024
                  </a>
                  <p className="text-sm">
                    By{" "}
                    <a href="#" className="font-semibold hover:text-gray-800">
                      David Grzyb
                    </a>
                    , Published on April 25th, 2020
                  </p>
                  <a href="#" className="text-gray-700 hover:text-black">
                    Continue Reading <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 py-8">
            <a
              href="#"
              className="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white flex items-center justify-center rounded-full"
            >
              1
            </a>
            <a
              href="#"
              className="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white flex items-center justify-center rounded-full"
            >
              2
            </a>
            <a
              href="#"
              className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 flex items-center justify-center rounded-full"
            >
              Next <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </section>
      </div>
      <hr></hr>
      {/* Invitation to Create a Blog */}
      <div className=" mx-auto py-6 mb-4 mt-2">
        <section className="w-full md:w-2/3 mx-auto text-center px-3 py-8 bg-blue-100 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Do you want to create a blog?
          </h2>

          <Link
            to="/createblog"
            className="bg-sky-600 text-white font-medium text-sm  px-14 py-3"
          >
            Create Blog
          </Link>
        </section>
        <hr></hr>
      </div>

      <Footer />
    </div>
  );
}

export default AllBlogs;
