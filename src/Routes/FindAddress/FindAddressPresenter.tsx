import React from "react";
import Helmet from "react-helmet";
import AddressBar from "../../Components/AddressBar";
import styled from "../../typed-components";

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Center = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
  font-size: 30px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface IProps {
  mapRef: any;
  address: string;
  onBlur: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const { mapRef, address, onBlur, onInputChange } = this.props;
    return (
      <div>
        <Helmet>
          <title>Find Address | Nuber</title>
        </Helmet>
        <AddressBar
          name={"address"}
          value={address}
          onBlur={onBlur}
          onChange={onInputChange}
        />
        <Center>📍</Center>
        <Map ref={mapRef} />
      </div>
    );
  }
}

export default FindAddressPresenter;
