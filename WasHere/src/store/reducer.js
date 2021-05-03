import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import postsReducer from "./posts";
import searchReducer from "./search";
import placeReducer from "./place";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
  search: searchReducer,
  place: placeReducer,
});
