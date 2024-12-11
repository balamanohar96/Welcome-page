import { createSlice } from "@reduxjs/toolkit";

const userd = createSlice({
  name: "userSlice",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userd.actions;
export default userd.reducer;
