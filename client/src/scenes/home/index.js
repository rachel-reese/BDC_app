import React from "react";
import Landing from "components/Landing";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Landing/>
      
    </>
  );
};

export default HomePage;
