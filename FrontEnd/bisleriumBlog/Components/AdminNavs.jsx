import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const AdminNavs = () => {
  const [blogPostscount, setBlogPostscount] = useState("");
  const [blogcategoriescount, setBlogcategoriescount] = useState("");
  const [comments, setCommentsCount] = useState("");
  const [upvotes, setUpvotes] = useState("");
  const [downvotes, setDownvotes] = useState("");
  const [date, setdate] = useState("");
   const token = useSelector((state) => state.signin.token);


  useEffect(() => {
    
    axios
      .get(`https://localhost:7094/api/Admin/AdminDashboardData`,{headers: {"Authorization" : `Bearer ${token}`}})
      .then((response) => {
        setBlogPostscount(response.data.result.allTimeData.blogCount);
        setBlogcategoriescount(
          response.data.result.categoriesWithBlogCount.length
        );
        setCommentsCount(response.data.result.allTimeData.commentsCount);
        setUpvotes(response.data.result.allTimeData.upvotesCount);
        setDownvotes(response.data.result.allTimeData.downvotesCount);
      })
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:7094/api/Admin/AdminDashboardData?year=${+date.split("-")[0]}&month=${+date.split("-")[1]}`,{headers: {"Authorization" : `Bearer ${token}`}})
      .then((response) => {
        console.log(response)
        setBlogPostscount(response.data.result.monthSpecificData.blogCount);
        setBlogcategoriescount(
          response.data.result.categoriesWithBlogCount.length
        );
        setCommentsCount(response.data.result.monthSpecificData.commentsCount);
        setUpvotes(response.data.result.monthSpecificData.upvotesCount);
        setDownvotes(response.data.result.monthSpecificData.downvotesCount);
      })
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, [date]);

  return (
    <>
      <div className="flex justify-end mb-3 ">
        <input
          type="month"
          name=""
          id=""
          value={date}
          onChange={(e) => {
            setdate(e.target.value);
          }}
        />
      </div>

      <div class="row">
        <div class="col-md-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="mb-4">
                {date == "" ? (
                  <span class="badge badge-soft-primary float-right">
                    All Time
                  </span>
                ) : (
                  <span class="badge badge-soft-primary float-right">
                    {date}
                  </span>
                )}

                <h5 class="card-title mb-0">Blog Posts</h5>
              </div>
              <div class="row d-flex align-items-center mb-4">
                <div class="col-8">
                  <h2 class="d-flex align-items-center mb-0">
                    {blogPostscount}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="mb-4">
                {date == "" ? (
                  <span class="badge badge-soft-primary float-right">
                    All Time
                  </span>
                ) : (
                  <span class="badge badge-soft-primary float-right">
                    {date}
                  </span>
                )}
                <h5 class="card-title mb-0">Comments</h5>
              </div>
              <div class="row d-flex align-items-center mb-4">
                <div class="col-8">
                  <h2 class="d-flex align-items-center mb-0">{comments}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="mb-4">
                {date == "" ? (
                  <span class="badge badge-soft-primary float-right">
                    All Time
                  </span>
                ) : (
                  <span class="badge badge-soft-primary float-right">
                    {date}
                  </span>
                )}
                <h5 class="card-title mb-0">Upvotes</h5>
              </div>
              <div class="row d-flex align-items-center mb-4">
                <div class="col-8">
                  <h2 class="d-flex align-items-center mb-0">{upvotes}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="mb-4">
                {date == "" ? (
                  <span class="badge badge-soft-primary float-right">
                    All Time
                  </span>
                ) : (
                  <span class="badge badge-soft-primary float-right">
                    {date}
                  </span>
                )}
                <h5 class="card-title mb-0">Down Votes</h5>
              </div>
              <div class="row d-flex align-items-center mb-4">
                <div class="col-8">
                  <h2 class="d-flex align-items-center mb-0">{downvotes}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavs;
