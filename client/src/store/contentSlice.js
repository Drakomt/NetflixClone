import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";
import { TypeFilter } from "../utils/filter";

export const getContent = createAsyncThunk(
  "contentSlice/getContent",
  async (data, headers) =>
    await customFetch(
      `content/filter${data.type ? "?type=" + data.type : ""}`,
      "GET",
      data,
      headers
    )
);

export const getSingleContent = createAsyncThunk(
  "contentSlice/getSingleContent",
  async (data, headers) =>
    await customFetch(
      `content/random${data.type ? "?type=" + data.type : ""}`,
      "GET",
      data,
      headers
    )
);

export const getGenres = createAsyncThunk(
  "contentSlice/getGenres",
  async (data, headers) =>
    await customFetch("content/genres", "GET", data, headers)
);

export const contentSlice = createSlice({
  name: "contentSlice",
  initialState: {
    error: null,
    loading: false,
    singleContent: null,
    genres: [],
    content: [],
    movies: [],
    series: [],
  },
  reducers: {
    setSingleContent(state, action) {
      state.singleContent = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setSeries(state, action) {
      state.series = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        //state.singleContent = action.payload.singleContent;
        state.content = action.payload.content;
        const { movies, series } = TypeFilter(action.payload.content);
        state.movies = movies;
        state.series = series;
        //console.log("content: ", action.payload.content);

        // state.movies = action.payload.movies;
        // state.series = action.payload.series;
      })
      .addCase(getContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getSingleContent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleContent = action.payload;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.genres = action.payload;
        //console.log("Genres: " + action.payload);
      });
  },
});

export const contentReducer = contentSlice.reducer;
export const { setSingleContent, setContent, setMovies, setSeries } =
  contentSlice.actions;
