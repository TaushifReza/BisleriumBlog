import React, { useState, useContext } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import myContext from '../context/myContext';
import { Link } from 'react-router-dom';
import Nav from './Navbar';
import {
  Button,
  Typography,
} from '@material-tailwind/react';
import Input from './Input'; // Assuming Input.js is in the same directory
import Footer from './Footer';

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
    <div>
    <Nav/>
    <div className='container mx-auto max-w-5xl py-6 mt-5 mb-8'>
      <div
        className='p-5'
        style={{
          background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)',
          borderBottom: mode === 'dark' ? '4px solid rgb(226, 232, 240)' : '4px solid rgb(30, 41, 59)',
        }}
      >
        <div className='mb-2 flex justify-between'>
          <div className='flex gap-2 items-center'>
            <Link to={'/dashboard'}>
              <BsFillArrowLeftCircleFill size={25} />
            </Link>
            <Typography
              variant='h4'
              style={{
                color: mode === 'dark' ? 'white' : 'black',
              }}
            >
              Create blog
            </Typography>
          </div>
        </div>
        <div className='mb-3'>
          {thumbnail && (
            <img
              className='w-full rounded-md mb-3'
              src={thumbnail ? URL.createObjectURL(thumbnail) : ''}
              alt='thumbnail'
            />
          )}
          <Typography
            variant='small'
            color='blue-gray'
            className='mb-2 font-semibold'
            style={{ color: mode === 'dark' ? 'white' : 'black' }}
          >
            Upload Thumbnail
          </Typography>
          <input
            type='file'
            label='Upload thumbnail'
            className='shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1'
            style={{
              background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)',
            }}
            onChange={handleThumbnailUpload}
          />
        </div>
        <div className='mb-3'>
          <Input
            type='text'
            label='Enter your Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder='Enter Your Title'
            style={{
              background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)',
            }}
            name='title'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='category'>Select Category:</label>
          <select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full p-1 mt-1 rounded-md shadow-[inset_0_0_4px_rgba(0,0,0,0.6)]'
            style={{
              background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)',
            }}
          >
            <option value='Health & Fitness'>Health & Fitness</option>
            <option value='Technology'>Technology</option>
            <option value='Entertainment'>Entertainment</option>
          </select>
        </div>
        <div className='mb-3'>
          <Input
            type='textarea'
            label='Enter your Content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder='Enter Your Content'
            style={{
              background: mode === 'dark' ? '#dcdde1' : 'rgb(226, 232, 240)',
              height: '400px', // Adjust the height according to your preference
            }}
            name='content'
          />
        </div>

        <Button
          className='w-full mt-5'
          style={{
            background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
            color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
          }}
          onClick={handleSubmit}
        >
          Send
        </Button>
        <div className=''>
  <h1 className='text-center mb-3 text-2xl'>Preview</h1>
  <div
    className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5 ${
      mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'
    }

    [&>h2]:text-[30px] [&>h2]:font-bold [&>h2]:mb-2.5
    ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}

    [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
    ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}

    [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
    ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}

    [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
    ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}

    [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
    ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}

    [&>p]:text-[16px] [&>p]:mb-1.5
    ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}

    [&>ul]:list-disc [&>ul]:mb-2
    ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}

    [&>ol]:list-decimal [&>li]:mb-10
    ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}

    [&>li]:list-decimal [&>ol]:mb-2
    ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}

    [&>img]:rounded-lg
    `}
  >
    {/* Preview content */}
    <h1>{title}</h1>
    <h2>{category}</h2>
    <p>{content}</p>
  </div>
</div>

      </div>
    </div>
    <Footer />
    </div>
  );
}

export default CreateBlog;