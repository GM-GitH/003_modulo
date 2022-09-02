import { ImageListItemBar, ImageListItem, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavImages, updateFavImages } from "../features/favorites/favoritesSlice";
import { setModalImage, toggleModal } from "../features/modal/modalSlice";
import { selectFavoriteIcon, splitUrl, toggleFavoriteImg } from "../features/functions";

const srcset = (imgUrl, size) => {
  const splitted = splitUrl(imgUrl);
  return {
    src: `${splitted}?w=${size}&h=${size}&fit=crop&auto=format`,
    srcSet: `${splitted}?w=${size}&h=${size}&fit=crop&auto=format&dpr=2 2x`,
  };
};

const Image = ({ item, arrImages, rowHeight }) => {
  const [favoriteIcon, setFavoriteIcon] = useState();
  const dispatch = useDispatch();
  const favImages = useSelector(selectFavImages);

  const handleOpen = () => {
    dispatch(setModalImage(arrImages[arrImages.indexOf(item)]));
    dispatch(toggleModal());
  };

  const favoriteIconClickHandler = () => {
    setFavoriteIcon(toggleFavoriteImg(item.id, arrImages));
    dispatch(updateFavImages());
  };

  const showImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 1;
  };

  useEffect(() => {
    setFavoriteIcon(selectFavoriteIcon(item.id));
  }, [dispatch, favImages]);

  return (
    <ImageListItem data-id={item.id} onMouseOver={showImageBar} >
      <img {...srcset(item.urls.thumb, rowHeight)} alt={item.alt_description} loading="lazy" onClick={handleOpen} />
      <ImageListItemBar
        sx={{ background: "rgba(0,0,0,0.7)" }}
        title={item.description ? item.description : "Untitled"}
        position="bottom"
        actionIcon={
          <IconButton sx={{ color: "rgba(255, 0, 0, 0.7)" }} aria-label={`star ${item.title}`} onClick={favoriteIconClickHandler}>
            {favoriteIcon}
          </IconButton>
        }
        actionPosition="right"
      />
    </ImageListItem>
  );
};

export default Image;
