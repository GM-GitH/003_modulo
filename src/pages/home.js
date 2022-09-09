import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

export const Home = () => {
  const style = {
    display: "block",
    textAlign: "center",
    color: "white",
    fontFamily: "Arial",
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search");
  };

  return (
    <>
      <div style={style}>
        <h1 style={{marginTop: 100}}>Welcome to the most powerful photo engine in the world!</h1>
        <Button sx={{ marginTop: 5 }} variant="contained" endIcon={<SearchIcon />} onClick={handleClick}>
          Search
        </Button>
      </div>
    </>
  );
};
