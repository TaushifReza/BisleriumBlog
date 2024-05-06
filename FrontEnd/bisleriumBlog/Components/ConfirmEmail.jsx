import { useEffect } from "react";
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
    fetch(Userurl + `ConfirmEmail/${id}/${token}`, Requestoptions);
  }).then((response) => {
    if (response.status == 200) {
        navigate("/signin");
    }
  });
};
export default ConfirmEmail;
