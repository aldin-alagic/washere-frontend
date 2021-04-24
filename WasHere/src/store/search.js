import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";

import { GOOGLE_API_KEY } from "@env";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    query: "",
    activeTabRoute: "",
  },
  reducers: {
    requestStarted: (search, action) => {
      posts.loading = true;
    },

    queryEntered: (search, action) => {
      // const { success, message } = action.payload;
      console.log("PAYLOAD", action.payload);
    },

    tabRouteChanged: (search, action) => {
      const { name } = action.payload;
      search.activeTabRoute = name;
    },

    requestFailed: (search, action) => {
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

export const { requestStarted, queryEntered, tabRouteChanged, requestFailed } = slice.actions;
export default slice.reducer;

export const enterQuery = (input) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "https://maps.googleapis.com/maps/api/place/textsearch/json",
      method: "GET",
      data: "",
      params: { inputtype: "textquery", fields: "formatted_address,name", input, key: GOOGLE_API_KEY },
      onStart: requestStarted.type,
      onSuccess: queryEntered.type,
      onError: requestFailed.type,
    }),
  );
};
