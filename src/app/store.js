import { configureStore } from '@reduxjs/toolkit'
import favImagesReducer from '../features/favorites/favoritesSlice'
import searchImagesReducer from '../features/search/searchSlice'
import imageModalReducer from '../features/modal/modalSlice'

export const store = configureStore({
  reducer: {
    searchImages: searchImagesReducer,
    favImages: favImagesReducer,
    imageModal: imageModalReducer
  }
})
