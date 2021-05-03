import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";
import { GOOGLE_API_KEY } from "@env";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "place",
  initialState: {
    loading: false,
    place: {},
  },
  reducers: {
    requestStarted: (place, action) => {
      place.loading = true;
    },

    placeFetched: (place, action) => {
      const { result } = action.payload;
      place.place = result;
    },

    requestFailed: (place, action) => {
      place.loading = false;
      showMessage({
        message: API_ERROR_MESSAGE,
        description: action.payload,
        type: "warning",
        autoHide: true,
      });
    },
  },
});

export const { requestStarted, placeFetched, requestFailed } = slice.actions;
export default slice.reducer;

export const fetchPlace = (placeId) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "https://maps.googleapis.com/maps/api/place/details/json",
      method: "GET",
      data: "",
      params: { place_id: placeId, key: GOOGLE_API_KEY },
      onStart: requestStarted.type,
      onSuccess: placeFetched.type,
      onError: requestFailed.type,
    }),
  );
};
