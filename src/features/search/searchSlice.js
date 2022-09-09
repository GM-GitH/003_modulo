import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchImages = createAsyncThunk("searchImages/fetchImages", async ({ searchTerm, page = 1 }) => {
  const options = {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`,
    },
  };
  const apiUrl = process.env.REACT_APP_URI;
  let url;
  const searchNonEmpty = searchTerm.length > 0;
  searchNonEmpty ? (url = `${apiUrl}search/photos?query=${searchTerm}&per_page=12&page=${page}`) : (url = `${apiUrl}photos?per_page=12&order_by=popular&page=${page}`);
  const data = await fetch(url, options);
  const json = await data.json();
  if (searchNonEmpty) return { results: json.results, totalPages: json.total_pages, currentPage: page };
  return { results: json, totalPages: 10, currentPage: page };
});

export const searchImagesSlice = createSlice({
  name: "searchImages",
  initialState: {
    results: {},
    status: null,
    term: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.results = action.payload;
      })
      .addCase(searchImages.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setSearchTerm } = searchImagesSlice.actions;

export const selectSearchImages = (state) => state.searchImages.results;
export const selectStatusSearchImages = (state) => state.searchImages.status;
export const selectSearchTerm = (state) => state.searchImages.term;

export default searchImagesSlice.reducer;
