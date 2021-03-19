import { loggedIn, loggedOut } from '../auth';
import authStorage from '../storage';

const auth = () => (next) => async (action) => {
  if (action.type === loggedIn.type) authStorage.storeToken(action.payload.data.token);
  if (action.type === loggedOut.type) authStorage.removeToken();

  return next(action);
};

export default auth;
