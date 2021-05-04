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
    feed: {
      posts: [],
      lastPostId: null,
    },
    user: {
      posts: [],
    },
    search: {
      posts: [],
    },
  },
  reducers: {
    requestStarted: (posts, action) => {
      posts.loading = true;
    },

    postCreated: (posts, action) => {
      const { success, message } = action.payload;
      posts.loading = false;
      showMessage({
        message,
        type: success ? "success" : "warning",
        icon: "success",
        autoHide: true,
      });
      if (success) {
        RootNavigation.navigate(routes.MAP);
      }
    },

    feedFetched: (posts, action) => {
      const { data, isReload } = action.payload;

      if (isReload) {
        posts.feed.posts = data.posts;
      } else {
        posts.feed.posts = posts.feed.posts.concat(data.posts);
      }
      posts.feed.lastPostId = data.lastPostId;
      posts.loading = false;
    },

    postFetched: (posts, action) => {
      const { data } = action.payload;
      posts.post = data;
      posts.loading = false;
    },

    postsFetched: (posts, action) => {
      const { data } = action.payload;
      posts.user.posts = data;
      posts.loading = false;
    },

    likeToggled: (posts, action) => {
      const { data } = action.payload;

      const updatePost = (post) => {
        if (post.id === data.post_id) {
          if (post.liked) post._count.likes--;
          else post._count.likes++;

          post.liked = !post.liked;
        }
        return post;
      };

      // Toggle like if the post is in some of the arrays
      posts.feed.posts = posts.feed.posts.map(updatePost);
      posts.user.posts = posts.user.posts.map(updatePost);
      posts.search.posts = posts.search.posts.map(updatePost);

      // Toggle like if the post is opened in the post details screen
      posts.post = updatePost(posts.post);
    },

    commentAdded: (posts, action) => {
      const { success, message, data } = action.payload;

      showMessage({
        message,
        icon: "success",
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

export const {
  requestStarted,
  feedFetched,
  postFetched,
  postsFetched,
  likeToggled,
  commentAdded,
  postCreated,
  requestFailed,
} = slice.actions;
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

export const getFeed = (lastPostId) => (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const loading = getState().posts.loading;

  // Do not fetch new posts if we are already fetching them
  if (loading) return;

  dispatch(
    apiCallBegan({
      url: `/user/${userId}/feed`,
      method: "GET",
      data: "",
      params: { number: 5, lastPostId },
      onStart: requestStarted.type,
      onSuccess: feedFetched.type,
      onError: requestFailed.type,
      passData: { isReload: lastPostId ? false : true },
    }),
  );
};

export const getPost = (id) =>
  apiCallBegan({
    url: `/post/${id}`,
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: postFetched.type,
    onError: requestFailed.type,
  });

export const getPosts = (userId) =>
  apiCallBegan({
    url: `/user/${userId}/posts`,
    method: "GET",
    data: "",
    onStart: requestStarted.type,
    onSuccess: postsFetched.type,
    onError: requestFailed.type,
  });

export const toggleLike = (postId) =>
  apiCallBegan({
    url: `/post/${postId}/toggle-like`,
    method: "POST",
    data: {},
    onStart: null,
    onSuccess: likeToggled.type,
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
