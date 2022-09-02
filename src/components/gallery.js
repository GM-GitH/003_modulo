import { ImageList, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ImageModal from "../features/modal/modal";
import { searchImages, selectSearchTerm } from "../features/search/searchSlice";
import Image from "./image";

const Gallery = ({ imagesObj, favGallery, setImagesObj }) => {
  const dispatch = useDispatch();
  const arrImages = imagesObj.results;
  const searchTerm = useSelector(selectSearchTerm);
  let rowHeight = 120;
  if (window.screen.width >= 1024) rowHeight = 240;

  const handlePageChange = (e, value) => {
    if (favGallery) {
      setImagesObj({
        ...imagesObj,
        results: imagesObj.totalImages.slice((value - 1) * 30, value * 30),
        currentPage: value,
      });
    } else {
      dispatch(searchImages({ searchTerm, page: value }));
    }
  };

  return (
    <>
      <ImageList cols={3} variant="quilted" rowHeight={rowHeight}>
        {arrImages.map((item) => (
          <Image key={item.id} item={item} arrImages={arrImages} rowHeight={rowHeight} />
        ))}
      </ImageList>
      <Pagination count={imagesObj.totalPages} page={imagesObj.currentPage} onChange={handlePageChange} sx={{ width: "fit-content", margin: "0 auto 5px auto" }} />
      <ImageModal favModal={favGallery} arrImages={favGallery ? imagesObj.totalImages : imagesObj.results} />
    </>
  );
};

export default Gallery;
