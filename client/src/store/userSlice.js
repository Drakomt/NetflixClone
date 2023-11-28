import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

export const fetchUser = createAsyncThunk(
  "userSlice/fetchUser",
  async (data) => {
    if (data.email && data.password) {
      // If email and password are present, use login endpoint

      return await customFetch("users/signin", "POST", data);
    } else {
      // Handle invalid data
      console.log("Failed fetchUser");
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  "userSlice/toggleFavorite",
  async (payload) => {
    const { data, headers } = payload;
    return await customFetch("users/toggleFavorite", "POST", data, headers);
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoggedIn: false,
    user:
      localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    error: null,
    loading: false,
    token:
      localStorage.getItem("token") !== null
        ? localStorage.getItem("token")
        : null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.token = action.payload.token;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user.favoritesList = action.payload.favoritesList;
        localStorage.setItem("user", JSON.stringify(state.user));
      });
  },
});

export const userReducer = userSlice.reducer;
export const { setUser, signOut } = userSlice.actions;
