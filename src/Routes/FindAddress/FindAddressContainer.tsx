import React from "react";
import ReactDOM from "react-dom";
import { geoCode, reverseCeoCode } from "../../mapHelpers";
import FindAddressPresenter from "./FindAddressPresenter";

// interface IProps extends RouteComponentProps<any> {}
interface IState {
  lat: number;
  lng: number;
  address: string;
}
class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    address: "",
    lat: 0,
    lng: 0
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  public render() {
    const { address } = this.state;
    // console.log(this.props);
    return (
      <FindAddressPresenter
        address={address}
        mapRef={this.mapRef}
        onInputChange={this.onInputChange}
        onBlur={this.onBlur}
      />
    );
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    // console.log(position);
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
    this.reverseGeocodeAddress(latitude, longitude);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: { lat, lng },
      disableDefaultUI: true,
      zoom: 15
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handelDragEnd);
  };
  public handelDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
    this.reverseGeocodeAddress(lat, lng);
  };
  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onBlur = () => {
    const { address } = this.state;
    geoCode(address);
  };
  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseCeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress
      });
    }
  };
}

export default FindAddressContainer;
