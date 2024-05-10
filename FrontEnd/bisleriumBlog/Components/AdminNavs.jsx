import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AdminNavs = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [comments, setCommentsCount] = useState([]);
    const [upvotes, setUpvotes] = useState([]);
    const [downvotes, setDownvotes] = useState([]);
  
    useEffect(() => {
      // Fetch blog posts
      axios.get(`https://localhost:7094/api/Admin/AdminDashboardData?year=${2024}&month=${5}`)
        .then(response => {
          setBlogPosts(response.data.result.allTimeData.blogCount);
          setCommentsCount(response.data.result.allTimeData.commentsCount);
          setUpvotes(response.data.result.allTimeData.downvotesCount);
          setDownvotes(response.data.result.allTimeData.upvotesCount);
        })
        .catch(error => console.error('Error fetching blog posts:', error));
  
      
    }, []);
  
    return (
        <>
            <div class="row">
                <div class="col-md-6 col-xl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-4">
                                <span class="badge badge-soft-primary float-right">All Time</span>
                                <h5 class="card-title mb-0">Blog Posts</h5>
                            </div>
                            <div class="row d-flex align-items-center mb-4">
                                <div class="col-8">
                                    <h2 class="d-flex align-items-center mb-0">
                                        {blogPosts}
                                    </h2>
                                </div>
                            </div>
                            <div class="progress shadow-sm" Style="height: 5px;">
                                <div class="progress-bar bg-success" role="progressbar" Style="width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="col-md-6 col-xl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-4">
                                <span class="badge badge-soft-primary float-right">All Time</span>
                                <h5 class="card-title mb-0">Categories</h5>
                            </div>
                            <div class="row d-flex align-items-center mb-4">
                                <div class="col-8">
                                    <h2 class="d-flex align-items-center mb-0">
                                        {comments}
                                    </h2>
                                </div>
                            </div>
                            <div class="progress shadow-sm" Style="height: 5px;">
                                <div class="progress-bar bg-danger" role="progressbar" Style="width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-4">
                                <span class="badge badge-soft-primary float-right">All Time</span>
                                <h5 class="card-title mb-0">Upvotes</h5>
                            </div>
                            <div class="row d-flex align-items-center mb-4">
                                <div class="col-8">
                                    <h2 class="d-flex align-items-center mb-0">
                                        {upvotes}
                                    </h2>
                                </div>
                            </div>
                            <div class="progress shadow-sm" Style="height: 5px;">
                                <div class="progress-bar bg-warning" role="progressbar" Style="width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-4">
                                <span class="badge badge-soft-primary float-right">All Time</span>
                                <h5 class="card-title mb-0">Down Votes</h5>
                            </div>
                            <div class="row d-flex align-items-center mb-4">
                                <div class="col-8">
                                    <h2 class="d-flex align-items-center mb-0">
                                        {downvotes}
                                    </h2>
                                </div>
                            </div>
                            <div class="progress shadow-sm" Style="height: 5px;">
                                <div class="progress-bar bg-info" role="progressbar" Style="width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default AdminNavs