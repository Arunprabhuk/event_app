import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileList: [],
};

const eventAuthReducer = createSlice({
  name: "eventauth",
  initialState,
  reducers: {
    updateUserProfileList: (state, action) => {
      state.userProfileList = action.payload;
    },
  },
});

export const { updateUserProfileList } = eventAuthReducer.actions;
export default eventAuthReducer.reducer;
