import Gallery from "../../components/gallery";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectStatusSearchImages, selectSearchTerm, searchImages, selectSearchImages } from "./searchSlice";
import { Alert, CircularProgress } from "@mui/material";

// https://www.freecodecamp.org/news/javascript-debounce-example/
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const SearchImages = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const images = useSelector(selectSearchImages);
  const status = useSelector(selectStatusSearchImages);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(searchImages({ searchTerm: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);
  switch (status) {
    case "fulfilled":
      return <Gallery imagesObj={images} />;
    case "error":
      return (
        <Alert severity="error" sx={{ margin: "5px 0" }}>
          We cannot connect to the server. Try again later.
        </Alert>
      );
    case "loading":
    default:
      return <CircularProgress sx={{ display: "block", margin: "10px auto" }} />;
  }
};

export default SearchImages;
