import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

export const createUser = createAsyncThunk(
  "signUpSlice/createUser",
  async (data) => await customFetch("users/signup", "POST", data)
);

export const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {
    error: null,
    loading: false,
    isSignedUp: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSignedUp = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        // state.error = action.payload.error.message;
      });
  },
});

export const signUpReducer = signUpSlice.reducer;
export const {} = signUpSlice.actions;
