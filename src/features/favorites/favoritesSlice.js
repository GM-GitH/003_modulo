import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorageFavImages } from "../../features/functions";

const buildResultObject = (totalImages) => ({
  currentPage: 1,
  totalImages,
  results: totalImages.slice(0, 12),
  totalPages: Math.ceil(totalImages.length / 12),
});
const searchByDescription = (arrImages, term) => {
  const filteredImages = arrImages.filter((item) => {
    return item.description !== null ? item.description.toLowerCase().search(term.toLowerCase()) !== -1 : false;
  });
  return buildResultObject(filteredImages);
};
const arrResults = getLocalStorageFavImages();

export const favImagesSlice = createSlice({
  name: "favImages",
  initialState: {
    results: {
      results: arrResults.slice(0, 12),
      totalPages: Math.ceil(arrResults.length / 12),
      currentPage: 1,
      totalImages: arrResults,
    },
    filteredResults: {
      results: arrResults.slice(0, 12),
      totalPages: Math.ceil(arrResults.length / 12),
      currentPage: 1,
      totalImages: arrResults,
    },
    filterTerm: null,
    orderTerm: "width",
  },
  reducers: {
    updateFavImages: (state) => {
      const arrResults = getLocalStorageFavImages();
      state.results = {
        ...state.results,
        results: arrResults.slice(0, 12),
        totalPages: Math.ceil(arrResults.length / 12),
        totalImages: arrResults,
      };
      state.filteredResults = { ...state.results };
      if (state.filterTerm && state.filterTerm.length > 0) {
        state.filteredResults = searchByDescription(state.filteredResults.totalImages, state.filterTerm);
      }
    },
    filterByTerm: (state, action) => {
      if (state.filteredResults.totalImages.length === 0) state.filteredResults = { ...state.results };
      state.filterTerm = action.payload;
      if (action.payload.length > 0) {
        state.filteredResults = searchByDescription(state.results.totalImages, action.payload);
      } else state.filteredResults = { ...state.results };
    },
    setOrderTerm: (state, action) => {
      state.orderTerm = action.payload;
    },
  },
});
export const { updateFavImages, filterByTerm, setOrderTerm } = favImagesSlice.actions;
export const selectFavImages = (state) => state.favImages.results;
export const selectFilteredFavImages = (state) => state.favImages.filteredResults;
export const selectFilterTerm = (state) => state.favImages.filterTerm;
export const selectOrderTerm = (state) => state.favImages.orderTerm;
export default favImagesSlice.reducer;