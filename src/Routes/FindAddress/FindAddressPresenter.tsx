import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

interface IProps {
  mapRef: any;
}
// component가 stateless한 경우 ref를 가질 수 없다. const ---> class
class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const { mapRef } = this.props;
    return (
      <div>
        <Helmet>
          <title>Find Address | Nuber</title>
        </Helmet>
        <div>Find Address Presenter</div>;
        <Map innerRef={mapRef} />
      </div>
    );
  }
}

export default FindAddressPresenter;
