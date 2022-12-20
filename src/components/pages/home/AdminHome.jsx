import { Box, Heading, Img } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.authReducer?.isLoggedIn);
  console.log(isLoggedIn);

  const userDeta = JSON.parse(localStorage.getItem("User"));

  if (!userDeta) {
    return <Navigate to="/login"></Navigate>;
  }

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <Box className="home_Container">
      <Heading>Dashboard Home</Heading>
      <Img
        height="600px"
        className="hero-img2"
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="img"
      />
    </Box>
  );
};

export default AdminHome;
