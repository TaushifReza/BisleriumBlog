import React from 'react';
import '../style/Blog.css';
import { AiFillHeart, AiFillDislike, AiOutlineComment } from 'react-icons/ai';

const BlogComponent = () => {
  const blogs = [
    {
      id: 1,
      title: "This achieves official Instagram Marketing Partner status",
      date: "Feb 15, 2021",
      category: "Development",
      image: "https://source.unsplash.com/random/400x300?food",
      description: "Welcome to Blogza, where digital innovation intersects with strategic excellence. As a dynamic force in the realm of digital marketing, we are committed.",
      likes: 120,
      dislikes: 3,
      comments: 15
    },
    {
      id: 2,
      title: "Introducing a complimentary plan tailored for small teams",
      date: "March 24, 2023",
      category: "Graphic Design",
      image: "https://source.unsplash.com/random/400x300?nature",
      description: "Welcome to Blogza, where digital innovation intersects with strategic excellence. As a dynamic force in the realm of digital marketing, we are committed.",
      likes: 95,
      dislikes: 5,
      comments: 7
    },
    {
      id: 3,
      title: "Google Assistant now aids in recording stories",
      date: "April 18, 2021",
      category: "Creative",
      image: "https://source.unsplash.com/random/400x300?animal",
      description: "Welcome to Blogza, where digital innovation intersects with strategic excellence. As a dynamic force in the realm of digital marketing, we are committed.",
      likes: 200,
      dislikes: 1,
      comments: 30
    },
    {
      id: 4,
      title: "Front accounts - let's collaborate and create the world's best design",
      date: "June 14, 2022",
      category: "Technology",
      image: "https://source.unsplash.com/random/400x300?house",
      description: "Welcome to Blogza, where digital innovation intersects with strategic excellence. As a dynamic force in the realm of digital marketing, we are committed.",
      likes: 150,
      dislikes: 2,
      comments: 12
    }
  ];

  return (
    <section id="demo" className="py-28">
      <div className="container1">
        {/* <Header /> */}
        <BlogGrid blogs={blogs} />
      </div>
    </section>
  );
};

// const Header = () => {
//   return (
//     <div className="max-w-xl mx-auto text-center">
//       <h2 className="text-4xl font-bold text-dark">Customer stories</h2>
//       <p className="text-base font-medium text-gray-500 mt-6">
//         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//       </p>
//     </div>
//   );
// };

const BlogGrid = ({ blogs }) => {
  return (
    <div className="relative">
      <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-6 mt-0">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            date={blog.date}
            category={blog.category}
            image={blog.image}
            description={blog.description}
            likes={blog.likes}
            dislikes={blog.dislikes}
            comments={blog.comments}
          />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ title, date, category, image, description, likes, dislikes, comments }) => {
  return (
    <div className="group sm:flex rounded-xl">
      <div className="flex-shrink-0 relative rounded-xl overflow-hidden h-[200px] sm:w-[500px] sm:h-[300px] group">
        <img className="w-full h-full transition-all duration-500 group-hover:shadow-sm group-hover:scale-110" src={image} alt="Image Description" />
      </div>
      <div className="grow ms-14">
        <div className="p-4 flex flex-col h-full sm:p-6">
          <div className="mb-3 flex items-center">
            <p className="inline-flex items-center gap-1.5 py-1.5 rounded-md text-sm font-medium text-dark me-7 underline">{category}</p>
            <p className="text-sm text-gray-500 ms-7">{date}</p>
          </div>
          <a href="#" className="text-lg sm:text-3xl font-semibold text-dark hover:text-primary transition-all duration-500">{title}</a>
          <p className="mt-4 mb-6 text-gray-500 text-base leading-7 font-medium">{description}</p>
          <div className="flex items-center flex-wrap">
            <AiFillHeart className="text-red-500" /> <span className="ml-2 text-gray-600">{likes}</span>
            <AiFillDislike className="ml-4 text-gray-600" /> <span className="ml-2 text-gray-600">{dislikes}</span>
            <AiOutlineComment className="ml-4 text-blue-500" /> <span className="ml-2 text-gray-600">{comments}</span>
          </div>
          <a href="#" className="read-more-btn flex mt-7 hover:text-primary transition-all duration-500">Read More<i data-lucide="arrow-up-right"></i></a>
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
