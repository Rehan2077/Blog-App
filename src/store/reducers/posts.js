import { createSlice } from "@reduxjs/toolkit";

const initialState = { allPost: null };

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPost = action.payload;
    },
  },
});

export const { setAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
