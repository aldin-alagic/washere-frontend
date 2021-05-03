import React from "react";
import ProfilePhoto from "../ProfilePhoto";

const ConnectionSimple = ({ data }) => {
  return <ProfilePhoto photoKey={data.profile_photo} size={45} />;
};

export default ConnectionSimple;
