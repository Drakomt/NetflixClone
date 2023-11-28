import { contentReducer } from "./contentSlice";
import { signUpReducer } from "./signUpSlice";
import { userReducer } from "./userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  userSlice: userReducer,
  signUpSlice: signUpReducer,
  contentSlice: contentReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
