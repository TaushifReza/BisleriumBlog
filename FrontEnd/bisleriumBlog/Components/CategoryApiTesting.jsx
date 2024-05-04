import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Categoryurl } from "../src/index";

// Don't use this  or override this  , this jsx is for testing category API, creat another jsx

const Category = () => {
  const token = useSelector((state) => state.signin.token);
  const [categorydata, setcategorydata] = useState([]);
  const [Name, setName] = useState("");
   const [Description, setDescription] = useState("");
  const [updateId, setupdateId] = useState(null);

  const listCategory = async () => {
 
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

  const addcategory = async () => {
    const formData = new FormData();
    formData.append("Name", Name.trim());
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

     }
  };



  const updatecategory = async(id)=>{
     const formData = new FormData();
     formData.append("Name", Name.trim());
     formData.append("Description", Description.trim());

    const Requestoptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };
        const response = await fetch(
          `${Categoryurl}UpdateCategory/${id}`,
          Requestoptions
        );
       
        if (response.status == 205) {
          console.log("updated")
        }
  } 

    const deletecategory = async (id) => {
      
      const Requestoptions = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
       const response = await fetch(
         `${Categoryurl}DeleteCategory/${id}`,
         Requestoptions
       );
       
       if (response.status == 204) {
        console.log("deleted")
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
        categorydata.map((category) => (
          <div key={category.id} className="mb-3">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <button type="button" onClick={() => setupdateId(category.id)}>
              update{category.name}
            </button>
            <br />
            {updateId === category.id && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button type="button" onClick={()=>{updatecategory(category.id)}}>Submit</button>
              </>
            )}
            <br />
            <button type="button" onClick={() => deletecategory(category.id)}>
              delete{category.name}
            </button>
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
      <button type="button" onClick={addcategory} className="mb-8">
        Category Add
      </button>
    </>
  );
};

export default Category;
