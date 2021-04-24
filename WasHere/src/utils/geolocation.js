import axios from "axios";

import { GOOGLE_API_KEY } from "@env";

export const getAddress = async (latitude, longitude) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
  );
  return response.data.results[0].formatted_address;
};
