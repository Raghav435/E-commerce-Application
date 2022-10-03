import { Box } from "@chakra-ui/react";
import React from "react";
import "./styles/HomePage.css";
import HeroImageSlider from "../components/HeroImageSlider";
import HeroHome from "../components/HeroHome";

const Home = () => {
  return (
    <Box>
      <HeroImageSlider />
      <HeroHome />
    </Box>
  );
};

export default Home;
