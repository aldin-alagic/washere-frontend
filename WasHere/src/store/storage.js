import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

const setPassedWelcomeScreen = async () => {
  try {
    await AsyncStorage.setItem("passedWelcomeScreen", "true");
  } catch (error) {
    console.log("Error while trying to set welcome screen passed item", error);
  }
};

const getPassedWelcomeScreen = async () => {
  try {
    return await AsyncStorage.getItem("passedWelcomeScreen");
  } catch (error) {
    return false;
  }
};

export default { getToken, getUser, removeToken, storeToken, setPassedWelcomeScreen, getPassedWelcomeScreen };
