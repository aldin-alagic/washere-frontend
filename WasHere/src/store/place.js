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
    photoURL: null,
  },
  reducers: {
    requestStarted: (place, action) => {
      place.loading = true;
    },

    placeFetched: (place, action) => {
      const { result } = action.payload;
      console.log("SETTING PLACE DETAILS");
      place.place = result;
    },

    placePhotoFetched: (place, action) => {
      const { responseURL } = action.payload;
      place.photoURL = responseURL;
      place.loading = false;
    },

    placePhotoEmptied: (place, action) => {
      place.photoURL = null;
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

export const { requestStarted, placeFetched, placePhotoFetched, placePhotoEmptied, requestFailed } = slice.actions;
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

export const fetchPlacePhoto = (photoreference) => (dispatch) => {
  console.log("GIVEN PHOTO REFERENCE", photoreference);
  dispatch(
    apiCallBegan({
      url: "https://maps.googleapis.com/maps/api/place/photo",
      method: "GET",
      data: "",
      params: { maxwidth: 1000, photoreference, key: GOOGLE_API_KEY },
      onStart: requestStarted.type,
      onSuccess: placePhotoFetched.type,
      onError: requestFailed.type,
    }),
  );
};

export const setEmptyPlacePhoto = () => (dispatch) => {
  dispatch({ type: placePhotoEmptied.type });
};
