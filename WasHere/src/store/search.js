import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";

import { GOOGLE_API_KEY } from "@env";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    searchQuery: "",
    activeTabRoute: "",
    places: [],
  },
  reducers: {
    requestStarted: (search, action) => {
      search.loading = true;
    },

    queryEntered: (search, action) => {
      const { query } = action.payload;
      search.query = query;
    },

    tabRouteChanged: (search, action) => {
      const { name } = action.payload;
      search.activeTabRoute = name;
    },

    placesSearched: (search, action) => {
      const { results } = action.payload;
      search.places = results;
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

export const { requestStarted, queryEntered, tabRouteChanged, requestFailed, placesSearched } = slice.actions;
export default slice.reducer;

export const searchPlaces = (input) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "https://maps.googleapis.com/maps/api/place/textsearch/json",
      method: "GET",
      data: "",
      params: { inputtype: "textquery", fields: "formatted_address,name", input, key: GOOGLE_API_KEY },
      onStart: requestStarted.type,
      onSuccess: placesSearched.type,
      onError: requestFailed.type,
    }),
  );
};
