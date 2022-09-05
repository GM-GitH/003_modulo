import { Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Toolbar>
        <Typography justifyContent="center" display="flex" variant="h5" sx={{ flexGrow: 1, fontWeight: "bolder", color: "black" }}>
          <Link sx={{ marginRight: "20px", color: "black" }} component={RouterLink} to="/" underline="none" color="white">
            Home
          </Link>
          <Link sx={{ color: "black" }} component={RouterLink} to="/my-photos" underline="none" color="white">
            MyPhotos
          </Link>
        </Typography>
      </Toolbar>
    </header>
  );
};

export default Header;