import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "place",
  initialState: {
    loading: false,
    place: {},
  },
  reducers: {
    requestStarted: (place, action) => {
      posts.loading = true;
    },

    requestFailed: (place, action) => {
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

export const { requestStarted, requestFailed } = slice.actions;
export default slice.reducer;
