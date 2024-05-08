import React, { useEffect, useState } from "react";
import { Blogurl } from "../../src/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Blogapi = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryID, setcategoryID] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const [getBlog, setgetBlog] = useState(false);
  const [blogs, setblogs] = useState([]);
  const [toUpdate, setToUpdate] = useState("");
  const token = useSelector((state) => state.signin.token);
  const navigate = useNavigate();

  const getAllBlog = async () => {
    const Requestoptions = {
      method: "GET",
    };

    const response = await fetch(
      `${Blogurl}GetAllBlog?pageSize=${2}&pageNumber=${1}`,
      Requestoptions
    );
    const data = await response.json();

    if (response.status == 200) {
      setblogs(data.result);
      setgetBlog(true);
    }
  };

  const individualBlog = (id) => {
    navigate("/individualblog", { state: id });
  };

  const createBlog = async () => {
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Body", body);
    formData.append("CategoryId", categoryID);
    formData.append("BlogImage", blogImg);

    const Requestoptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(Blogurl + "CreateBlog", Requestoptions);

    if (response.status == 201) {
      console.log("created");
    }
  };

  const updateBlog = async (id) => {
    const formData = new FormData();
    formData.append("Body", body);
    formData.append("BlogImage", blogImg);

    const Requestoptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    const response = await fetch(`${Blogurl}UpdateBlog/${id}`, Requestoptions);

    if (response.status == 205) {
      console.log("updated");
    }
  };

  const deleteBlog = async (id) => {
    const Requestoptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`${Blogurl}DeleteBlog/${id}`, Requestoptions);

    if (response.status == 204) {
      console.log("deleted");
    }
  };

  return (
    <>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        name="body"
        id="body"
        value={body}
        onInput={(e) => {
          setBody(e.target.value);
        }}
      />
      <input
        type="text"
        name="category"
        id="category"
        value={categoryID}
        onInput={(e) => {
          setcategoryID(+e.target.value);
        }}
      />
      <input
        type="file"
        name="blogimg"
        id="blogimg"
        onChange={(e) => {
          setBlogImg(e.target.files[0]);
        }}
      />
      <button type="button" onClick={createBlog}>
        Create Blog
      </button>{" "}
      <br />
      <button type="button" onClick={getAllBlog}>
        Get all blog
      </button>
      {/* <h1>{token}</h1> */}
      {getBlog && (
        <>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <h1>{blog.title}</h1>
              <p>{blog.body}</p>
              <button
                type="button"
                onClick={() => {
                  individualBlog(blog.id);
                }}
              >
                Read More
              </button>
              <br />
              <button
                type="button"
                onClick={() => {
                  setToUpdate(blog.id);
                }}
              >
                update
              </button>
              {toUpdate == blog.id && (
                <>
                  <input
                    type="text"
                    name="body"
                    id="bodyupate"
                    value={body}
                    onInput={(e) => {
                      setBody(e.target.value);
                    }}
                  />
                  <input
                    type="file"
                    name="blogimg"
                    id="blogimg"
                    onChange={(e) => {
                      setBlogImg(e.target.files[0]);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      updateBlog(blog.id);
                    }}
                  >
                    submit
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Blogapi;
