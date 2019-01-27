import React from "react";
import { graphql, MutationFn, Query } from "react-apollo";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { geoCode } from "../../mapHelpers";
import { USER_PROFILE } from "../../sharedQueries";
import {
  getDrivers,
  reportMovement,
  reportMovementVariables,
  userProfile
} from "../../types/api";
import HomePresenter from "./HomePresenter";
import { GET_NEARBY_DRIVERS, REPORT_LOCATION } from "./HomeQueries";

interface IState {
  isMenuOpen: boolean;
  toAddress: string;
  toLat: number;
  toLng: number;
  lat: number;
  lng: number;
  distance?: string;
  duration?: string;
  price?: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
  reportLocation: MutationFn;
}

class ProfileQuery extends Query<userProfile> {}
class NearbyQueries extends Query<getDrivers> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;
  public directions: google.maps.DirectionsRenderer;
  public state = {
    distance: undefined,
    duration: undefined,
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    price: undefined,
    toAddress: "향군타워",
    toLat: 0,
    toLng: 0
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
    const { isMenuOpen, toAddress, price } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data, loading }) => (
          <NearbyQueries query={GET_NEARBY_DRIVERS}>
            {() => (
              <HomePresenter
                loading={loading}
                isMenuOpen={isMenuOpen}
                toggleMenu={this.toggleMenu}
                mapRef={this.mapRef}
                toAddress={toAddress}
                price={price}
                data={data}
                onInputChange={this.onInputChange}
                onAddressSubmit={this.onAddressSubmit}
              />
            )}
          </NearbyQueries>
        )}
      </ProfileQuery>
    );
  }

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    this.setState({
      lat,
      lng
    });
    this.loadMap(lat, lng);
  };

  public loadMap = (lat, lng) => {
    const { google: { maps = {} } = {} } = this.props;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 15
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };

  public handleGeoWatchSuccess = (position: Position) => {
    const { reportLocation } = this.props;
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    this.userMarker.setPosition({ lat, lng });
    this.map.panTo({ lat, lng });
    reportLocation({
      variables: {
        lat,
        lng
      }
    });
    console.log(this.props);
  };
  public handleGeoWatchError = () => {
    console.log("No watching you");
  };

  public handleGeoError = () => {
    console.log("No location");
  };

  public onInputChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value } as any);
  };

  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google: { maps = {} } = {} } = this.props;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const {
        lat: toLat,
        lng: toLng,
        formatted_address: formattedAddress
      } = result;
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat: toLat,
          lng: toLng
        }
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat: toLat, lng: toLng });
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      this.map.fitBounds(bounds);
      this.setState(
        {
          toAddress: formattedAddress,
          toLat,
          toLng
        },
        this.createPath
      );
    }
  };

  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);

    const directionOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    directionService.route(directionOptions, this.handleRouteRequest);
  };

  public handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
      this.setState({
        distance,
        duration
      });
      // this.setPlace(); // 원래 있어야하는 자리 API권한 문제로 direction이 안되는 관계로 아래에 작성.
    } else {
      toast.error("There is no route there, you have to swim");
    }
    this.setPlace();
  };

  public setPlace = () => {
    const { distance = "20.0 km" } = this.state;

    const price =
      parseFloat(
        distance
          .replace(" km", "")
          .split(",")
          .join("")
      ) * 3.0;
    this.setState({ price });
  };
}

export default graphql<any, reportMovement, reportMovementVariables>(
  REPORT_LOCATION,
  {
    name: "reportLocation"
  }
)(HomeContainer);
