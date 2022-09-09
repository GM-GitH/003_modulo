import { Box, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../features/search/searchSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const SearchBox = () => {
  const dispatch = useDispatch();
  return (
    <Box>
      <ThemeProvider theme={darkTheme}>
        <TextField label="Search..." id="searchTerm" onChange={(e) => dispatch(setSearchTerm(e.target.value))} />
      </ThemeProvider>
    </Box>
  );
};

export default SearchBox;
