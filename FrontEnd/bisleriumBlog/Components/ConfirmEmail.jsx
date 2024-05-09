import { useEffect } from "react";
import swal from 'sweetalert2' ;
import Userurl from "../src";
import {  useNavigate } from "react-router-dom";
const ConfirmEmail = () => {
    const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const Requestoptions = {
    method: "GET",
  };
  useEffect(async () => {
   const response = await fetch(
     Userurl + `ConfirmEmail/${id}/${token}`,
     Requestoptions
   );
   const data = response.json()
    if (response.status === 200) {
      navigate("/signin");
    }else {
      const errors = data.errors;
      let errorMessage = "";
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorMessage += `${key}: ${errors[key]} ` + `${"\n"}`;
        }
      }
      swal.fire({
        icon: 'error',
        title: 'Invalid',
        text: errorMessage,
      });
    }
  });
};
export default ConfirmEmail;
