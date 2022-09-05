import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/search";
import MyPhotos from "./pages/myPhotos";
import Header from "./layout/header";
import { Box, Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <Box className="app" display="flex" flexDirection="column" sx={{ backgroundColor: "white" }}>
      <CssBaseline />
      <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="my-photos" element={<MyPhotos />} />
          </Routes>
        </Container>
    </Box>
  );
}

export default App;