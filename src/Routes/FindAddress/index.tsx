import dotenv from "dotenv";
dotenv.config();
import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainer";
// import { MAPS_KEY } from "../../keys";

const googleMapApiKey = process.env.Google_MAP_API_KEY || "";

export default GoogleApiWrapper({
  apiKey: googleMapApiKey // {MAPS_KEY}
})(FindAddressContainer);
