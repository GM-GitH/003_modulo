import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterTerm, selectOrderTerm, filterByTerm, setOrderTerm } from "../features/favorites/favoritesSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Filters = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectOrderTerm);
  return (
    <ThemeProvider theme={darkTheme}>
        <Box justifyContent="space-between" display="flex">
          <TextField id="filterTerm" label="Keywords.." variant="outlined" defaultValue={useSelector(selectFilterTerm)} onChange={(e) => dispatch(filterByTerm(e.target.value))} />
          <FormControl>
            <InputLabel id="selectOrderLabel">Order by</InputLabel>
            <Select labelId="selectOrderLabel" id="selectOrder" value={order} label="Order by" onChange={(e) => dispatch(setOrderTerm(e.target.value))}>
              <MenuItem value="width">Width</MenuItem>
              <MenuItem value="height">Height</MenuItem>
              <MenuItem value="likes">Likes</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>
        </Box>
    </ThemeProvider>
  );
};

export default Filters;
