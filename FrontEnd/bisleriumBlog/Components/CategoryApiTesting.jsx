import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Categoryurl } from "../src/index";

// Don;t use this  or ovveride this  , this jsx is for testing category API, creat another jsx  
const Category = () => {
  const token = useSelector((state) => state.signin.token);
  const [categorydata, setcategorydata] = useState([]);
  const Requestoptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const listCategory = async (e) => {
    e.preventDefault();
    const response = await fetch(
      Categoryurl + "GetAllCategory",
      Requestoptions
    );

    const data = await response.json();
    if (response.status == 200) {
      setcategorydata(data.result.category);
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
        categorydata.map((category) => 

          (<div>
            <h1>{category.name}</h1>
          </div>)
        )
      )}
    </>
  );
};

export default Category;
