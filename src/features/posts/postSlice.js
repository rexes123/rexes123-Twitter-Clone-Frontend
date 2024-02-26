import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
//jwtDecode causing it cannot show on the screen
// import jwtDecode from "jwt-decode";

const url = "https://fb725ff4-f580-4889-a209-d1ccc5e9ece4-00-202wcuqei341y.janeway.replit.dev";


//expory fetchPosByUser and savePost in this jsx file

//AsyncThunk for feching data
export const fetchPostsByUser = createAsyncThunk(
  "post/fetchByUser",
  async (userId) => {
    const response = await fetch(`${url}/posts/user/${userId}`);
    return response.json();
  }
);

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (postContent) => {
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    console.log(`User id is ${userId}`);

    const data = {
      title: "Post title",
      content: postContent,
      user_id: userId,
    };

    const response = await axios.post(`${url}/posts`, data)
    return response.data
  }
);


//Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: true
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    }),

      builder.addCase(savePost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      });
  },
});

export default postSlice.reducer;
