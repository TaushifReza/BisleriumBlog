import React, { useContext } from 'react';
import { AiFillHeart, AiFillDislike, AiOutlineComment } from 'react-icons/ai';
import myContext from '../context/myContext';
import { Button } from '@material-tailwind/react';

const BlogPostCard = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const blogs = [
    {
      id: 1,
      title: 'React Introduction',
      date: '25 Sep 2023',
      image: 'https://source.unsplash.com/random/400x300', // Smaller image size
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 120,
      dislikes: 3,
      comments: 15
    },
    // Ensure each blog has a unique ID
    {
      id: 2,
      title: 'Advanced React Techniques',
      date: '25 Sep 2023',
      image: 'https://picsum.photos/400/300', // Smaller image size
      description: 'Explore advanced techniques in React development.',
      likes: 150,
      dislikes: 2,
      comments: 20
    },
    {
      id: 3,
      title: 'State Management in React',
      date: '25 Sep 2023',
      image: 'https://source.unsplash.com/random/400x300?food', // Smaller image size
      description: 'Understanding state management in React with Hooks and Context.',
      likes: 100,
      dislikes: 5,
      comments: 10
    },
  ];

  return (
    <section className="text-gray-600 body-font mt-0">
      <div className="container px-5 py-10 mx-auto flex flex-wrap">
        <h2 className="text-4xl font-bold text-center w-full mb-11 text-black1">Most Popular Blogs</h2>
        <div className="md:flex md:items-start md:w-1/3 pr-4">
          {blogs.map(blog => (
            <div key={blog.id} className="p-4 md:w-full">
              <div className={`h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={blog.image} alt="blog" />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{blog.date}</h2>
                  <h1 className="title-font text-lg font-medium mb-3">{blog.title}</h1>
                  <p className="leading-relaxed mb-3">{blog.description}</p>
                  <div className="flex items-center flex-wrap">
                    <AiFillHeart className="text-red-500" /> <span className="ml-2 text-gray-600">{blog.likes}</span>
                    <AiFillDislike className="ml-4 text-gray-600" /> <span className="ml-2 text-gray-600">{blog.dislikes}</span>
                    <AiOutlineComment className="ml-4 text-blue-500" /> <span className="ml-2 text-gray-600">{blog.comments}</span>
                  </div>
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
