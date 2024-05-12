import React from 'react'
import Layout from '../Components/Layout';
import BlogPostCard from '../Components/BlogPostCard';
import BlogComponent from '../Components/BlogComponent';
function Home() {
    return (
      <Layout>
          <BlogComponent/>
          <BlogPostCard/>
      </Layout>
    )
  }
export default Home