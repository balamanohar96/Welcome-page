import { configureStore } from "@reduxjs/toolkit";
import userSlicee from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlicee,
  },
});

export default store;
