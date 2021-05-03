import React from "react";
import { Button, View } from "react-native";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../store/auth";

const Settings = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggedOut());
  };

  return (
    <View>
      <Button onPress={handleLogout} title="Log out" />
    </View>
  );
};

export default Settings;
