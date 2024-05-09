import { Blogurl } from "../src/index";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const IndividualBlog = () => {
  const [blog, setblog] = useState({});
  const Requestoptions = {
    method: "GET",
  };
  const id = useLocation();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(
        `${Blogurl}GetBlog/${id.state}`,
        Requestoptions
      );
      const data = await response.json();
      if (response.status == 200) {
        setblog(data.result);
        console.log(data.result);
      }
    };
    fetchdata();
  });
  return (
    <>
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
    </>
  );
};

export default IndividualBlog;
