import dotenv from "dotenv";
import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainer";
dotenv.config();

const googleMapApiKey = process.env.Google_MAP_API_KEY || "";

export default GoogleApiWrapper({
  apiKey: googleMapApiKey
})(FindAddressContainer);
