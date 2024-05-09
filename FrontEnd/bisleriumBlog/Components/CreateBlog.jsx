import React, { useState, useContext } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import myContext from '../context/myContext';
import { Link } from 'react-router-dom';
import Nav from './Navbar';
import Footer from './Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor

function CreateBlog() {
  const context = useContext(myContext);
  const { mode } = context;

  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Health & Fitness'); // Default category

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thumbnail:', thumbnail);
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Category:', category);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <div className='container mx-auto max-w-5xl py-6 mt-5 mb-5 content-center'>
        <div className={`p-5 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <div className='mb-4 flex justify-between items-center'>
          
            <h1 className="text-3xl font-bold justify-content-center">
              Create blog
            </h1>

          </div>
          {thumbnail && (
            <img className='w-full max-h-60 rounded-md mb-3 object-cover' src={URL.createObjectURL(thumbnail)} alt='thumbnail' />
          )}
          <div className='mb-3'>
            <label className="block text-sm font-semibold mb-2 mt-4">Upload Thumbnail:</label>
            <input type='file' onChange={handleThumbnailUpload} className='block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' />
          </div>
          <div className='mb-3'>
            <label className="block text-sm font-semibold mb-2 mt-4">Enter your Title:</label>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" placeholder="Blog Title" />
          </div>
          <div className='mb-3'>
            <label className="block text-sm font-semibold mb-2 mt-4">Select Category:</label>
            <select id='category' value={category} onChange={(e) => setCategory(e.target.value)} className='block w-full p-2 border rounded-md focus:ring focus:ring-blue-300'>
              <option value='Health & Fitness'>Health & Fitness</option>
              <option value='Technology'>Technology</option>
              <option value='Entertainment'>Entertainment</option>
            </select>
          </div>
          <div className='mb-5'>
            <label className="block text-xl font-semibold mb-2 mt-4">Content:</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '300px' }} />
          </div>
          <button onClick={handleSubmit}     className="bg-sky-600 text-white font-medium text-sm  px-14 py-3"
>
            Submit
          </button>
          <div className='mt-6'>
            <h2 className='text-xl font-semibold mb-2'>Preview</h2>
            <div className={`p-3 rounded-lg ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <h1 className='text-2xl font-bold'>{title}</h1>
              <h2 className='text-lg'>{category}</h2>
              <p className='whitespace-pre-line'>{content}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateBlog;