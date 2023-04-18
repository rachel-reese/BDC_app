import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Dashboard</div>
      <Button onClick={() => navigate("/checkstatus")}>Click ME</Button>
    </>
  );
};

export default Dashboard;
