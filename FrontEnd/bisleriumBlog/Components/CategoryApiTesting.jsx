import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Categoryurl } from "../src/index";

// Don;t use this  or ovveride this  , this jsx is for testing category API, creat another jsx
const Category = () => {
  const token = useSelector((state) => state.signin.token);
  const [categorydata, setcategorydata] = useState([]);
  const [Name, setName] = useState("");

  const listCategory = async (e) => {
    e.preventDefault();
    const Requestoptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      Categoryurl + "GetAllCategory",
      Requestoptions
    );

    const data = await response.json();
    if (response.status == 200) {
      setcategorydata(data.result.category);
    }
  };

  const addcategory = async (e) => {
    const formData = new FormData();
    formData.append("Name", Name.trim());
    console.log(Name)
    const Requestoptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };
    const response = await fetch(
      Categoryurl + "CreateCategory",
      Requestoptions
    );
     const data = await response.json();
     if (response.status == 200) {
       console.log(data)
     }
  };

  return (
    <>
      <button type="button" onClick={listCategory}>
        Category List
      </button>
      {categorydata.length == 0 ? (
        <p>Please Click to see data</p>
      ) : (
        categorydata.map((category,index) => (
          <div key={index}>
            <h1>{category.name}</h1>
          </div>
        ))
      )}

      <input
        type="text"
        name="category"
        id="category"
        placeholder="Enter category"
        value={Name}
        onInput={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={addcategory}>
        Category Add{" "}
      </button>
    </>
  );
};

export default Category;
