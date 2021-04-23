import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";
import * as RootNavigation from "../navigation/RootNavigation";
import routes from "../navigation/routes";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    post: {},
    feed: [],
  },
  reducers: {
    requestStarted: (posts, action) => {
      posts.loading = true;
    },

    postCreated: (posts, action) => {
      const { success, message } = action.payload;
      posts.loading = false;
      showMessage({
        message: success ? "Success!" : "Error!",
        description: message,
        type: success ? "success" : "warning",
        autoHide: true,
      });
      if (success) {
        RootNavigation.navigate(routes.MAP);
      }
    },

    feedFetched: (posts, action) => {
      const { data } = action.payload;
      posts.feed = data;
      posts.loading = false;
    },

    postFetched: (posts, action) => {
      const { data } = action.payload;
      posts.post = data;
      posts.loading = false;
    },

    commentAdded: (posts, action) => {
      const { success, message, data } = action.payload;

      showMessage({
        message: success ? "Success!" : "Error!",
        description: message,
        type: success ? "success" : "warning",
        autoHide: true,
      });

      if (success) posts.post.comments = data.comments;
      posts.loading = false;
    },

    requestFailed: (auth, action) => {
      auth.loading = false;
      showMessage({
        message: API_ERROR_MESSAGE,
        description: action.payload,
        type: "warning",
        autoHide: true,
      });
    },
  },
});

export const { requestStarted, feedFetched, postFetched, commentAdded, postCreated, requestFailed } = slice.actions;
export default slice.reducer;

export const createPost = (description, isPublic, latitude, longitude, photos) =>
  apiCallBegan({
    url: "/post",
    method: "POST",
    data: { description, is_public: isPublic, latitude, longitude, photos },
    onStart: requestStarted.type,
    onSuccess: postCreated.type,
    onError: requestFailed.type,
  });

export const getFeed = () =>
  apiCallBegan({
    url: "/user/68/feed",
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: feedFetched.type,
    onError: requestFailed.type,
  });

export const getPost = (id) =>
  apiCallBegan({
    url: `/post/${id}`,
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: postFetched.type,
    onError: requestFailed.type,
  });

export const addComment = (postId, text) =>
  apiCallBegan({
    url: `/post/${postId}/comment`,
    method: "POST",
    data: { text },
    onStart: requestStarted.type,
    onSuccess: commentAdded.type,
    onError: requestFailed.type,
  });
