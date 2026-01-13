import { createSlice } from "@reduxjs/toolkit";

const initial = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initial,
  reducers: {
    userIn: (state, action) => {
      state.currentUser = action.payload;
    },
    logOut: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { logOut, userIn } = userSlice.actions;
export default userSlice.reducer;
