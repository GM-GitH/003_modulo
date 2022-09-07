import { Modal, Box, Fade, Backdrop, Typography, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavImages, updateFavImages } from "../favorites/favoritesSlice";
import { selectFavoriteIcon, setLocalStorageFavImages, splitUrl, toggleFavoriteImg } from "../../features/functions";
import { selectModalImage, setModalImage, selectModalOpen, toggleModal } from "./modalSlice";

const ImageModal = ({ favModal, arrImages }) => {
  const modalStyle = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "80%",
    bgcolor: "#0a1929",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  const [favoriteIcon, setFavoriteIcon] = useState();
  const dispatch = useDispatch();
  const open = useSelector(selectModalOpen);
  const img = useSelector(selectModalImage);
  const arrFavImages = useSelector(selectFavImages).totalImages;
  const src = img.urls ? splitUrl(img.urls.thumb) + "?w=480&h=480&auto=format" : "";
  const imgAddedDate = favModal ? new Date(img.date).toLocaleDateString() : "";
  const updateDescription = (e) => {
    const arrFavImagesCopy = [...arrFavImages];
    const imgIndex = arrFavImagesCopy.findIndex((item) => {
      if (item.id === img.id) return true;
    });
    arrFavImagesCopy[imgIndex] = { ...arrFavImagesCopy[imgIndex], description: e.target.value };
    setLocalStorageFavImages(arrFavImagesCopy);
    dispatch(updateFavImages());
    dispatch(setModalImage(arrFavImagesCopy[imgIndex]));
  };
  const imageDescription = favModal ? (
    <TextField id="outlined-multiline-static" multiline rows={4} placeholder="< Empty >" defaultValue={img.description} onChange={updateDescription} />
  ) : (
    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
      {img.description}
    </Typography>
  );
  const handleClose = () => {
    dispatch(toggleModal());
  };
  const favoriteIconClickHandler = () => {
    setFavoriteIcon(toggleFavoriteImg(img.id, arrImages));
    dispatch(updateFavImages());
  };
  const downloadImage = () => {
    fetch(img.urls.full)
      .then((response) => response.blob())
      .then((blobObject) => {
        const blob = window.URL.createObjectURL(blobObject);
        const anchor = document.createElement("a");
        anchor.style.display = "none";
        anchor.href = blob;
        anchor.download = `${img.id}`;
        document.body.appendChild(anchor);
        anchor.click();
        window.URL.revokeObjectURL(blob);
      })
      .catch(() => console.log("The image couldn/'t be downloaded."));
  };
  useEffect(() => {
    setFavoriteIcon(selectFavoriteIcon(img.id));
  }, [open]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle} color="white">
          <img src={src} alt="" loading="lazy" height={400} />
          <List dense sx={{ padding: "5px 0" }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText secondary={`Size: ${img.width}x${img.height}`} />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText secondary={`Likes: ${img.likes}`} />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText secondary={`Added: ${imgAddedDate}`} />
            </ListItem>
          <IconButton sx={{ color: "red", position: "absolute", padding: "5px 0",right: 30, top: 0 }} aria-label={`star ${img.title}`} onClick={favoriteIconClickHandler}>
            {favoriteIcon}
          </IconButton>
            <IconButton sx={{ color: "white", padding: "5px 0", position: "absolute", right: 0, top: 0 }} onClick={downloadImage}>
              <DownloadIcon />
            </IconButton>
          </List>
          {imageDescription}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImageModal;