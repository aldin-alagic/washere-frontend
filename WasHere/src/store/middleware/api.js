import axios from "axios";

import * as actions from "../api";

import { API } from "../../config/config.json";

const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, headers, onStart, onSuccess, onError } = action.payload;
  console.log("METHOD", method);

  if (onStart) store.dispatch({ type: onStart });

  next(action);

  try {
    const authToken = store.getState().auth.token;
    if (authToken) {
      console.log("TOKEN", authToken);
      headers = { ...headers, Authorization: `Bearer ${authToken}` };
      console.log("HEADERS", headers);
    }
    const response = await axios.request({
      baseURL: API,
      url,
      method,
      data,
      headers,
    });
    console.log("RESPONSE", response);
    // General
    store.dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    store.dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) store.dispatch({ type: onError, payload: error.response.data.message });
  }
};

export default api;
