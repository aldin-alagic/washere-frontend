import React from "react";
import ProfilePhoto from "../ProfilePhoto";

const ConnectionSimple = ({ data }) => {
  return <ProfilePhoto profileId={data.id} photoKey={data.profile_photo} size={45} style={{ marginRight: 10 }} />;
};

export default ConnectionSimple;
