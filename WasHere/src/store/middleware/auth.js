import axios from "axios";

import { loggedIn, loggedOut } from "../auth";
import authStorage from "../storage";

const auth = () => (next) => async (action) => {
  if (action.type === loggedIn.type) {
    const token = action.payload.data.token;
    authStorage.storeToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  if (action.type === loggedOut.type) authStorage.removeToken();

  return next(action);
};

export default auth;
