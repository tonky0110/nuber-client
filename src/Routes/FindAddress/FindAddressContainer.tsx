import React from "react";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import { geoCode, reverseCeoCode } from "../../mapHelpers";
import FindAddressPresenter from "./FindAddressPresenter";

// interface IProps extends RouteComponentProps<any> {}
interface IState {
  lat: number;
  lng: number;
  address: string;
}
interface IProps extends RouteComponentProps<any> {
  google: any;
}
class FindAddressContainer extends React.Component<IProps, IState> {
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
        onBlur={this.onInputBlur}
        onInputChange={this.onInputChange}
        onPickPlace={this.onPickPlace}
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
      minZoom: 8,
      zoom: 11
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
  public onInputBlur = async () => {
    const { address } = this.state;
    const result = await geoCode(address);
    if (result !== false) {
      const { formatted_address: formattedAddress, lat, lng } = result;
      this.setState({
        address: formattedAddress,
        lat,
        lng
      });
      // Type 1
      // const latLng = new google.maps.LatLng(lat, lng);
      // this.map.panTo(latLng);

      // Type 2
      this.map.panTo({ lat, lng });
    } else {
      return;
    }
  };
  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseCeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress
      });
    }
  };
  public onPickPlace = () => {
    const { address, lat, lng } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "/add-place",
      state: {
        address,
        lat,
        lng
      }
    });
    console.log(address, lat, lng);
  };
}

export default FindAddressContainer;
