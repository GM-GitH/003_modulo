import { Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  function changeBackground(e) {
    e.target.style.textDecoration === 'underline' ? e.target.style.textDecoration = 'none' : e.target.style.textDecoration = 'underline';
  }

  return (
      <Toolbar sx={{display: "block"}}>
        <Typography justifyContent="center" display="flex" variant="h5" sx={{ flexGrow: 1, fontWeight: "bolder", color: "white" }}>
          <Link sx={{ marginRight: "20px", color: "white" }} component={RouterLink} to="/" underline="none" color="white" onMouseOver={changeBackground} onMouseLeave={changeBackground}>
            Home
          </Link>
          <Link sx={{ marginRight: "20px", color: "white" }} component={RouterLink} to="/search" underline="none" color="white" onMouseOver={changeBackground} onMouseLeave={changeBackground}>
            Search
          </Link>
          <Link sx={{ color: "white" }} component={RouterLink} to="/my-photos" underline="none" color="white" onMouseOver={changeBackground} onMouseLeave={changeBackground}>
            MyPhotos
          </Link>
        </Typography>
      </Toolbar>
  );
};

export default Header;