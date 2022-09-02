import { Box } from "@mui/material";
import Filters from "../components/filters";
import FavImages from "../features/favorites/favorites";

const MyPhotos = () => {
  return (
    <>
      <Box mt="50px"/>
      <Filters />
      <FavImages />
    </>
  );
};

export default MyPhotos;
