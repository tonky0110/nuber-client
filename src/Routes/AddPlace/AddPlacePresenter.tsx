import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmitFn: MutationFn;
}
const AddPlacePresenter: React.SFC<IProps> = ({
  onInputChange,
  address,
  name,
  loading,
  onSubmitFn
}) => (
  <React.Fragment>
    <Helmet>
      <title>Add Place | Nuber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmitFn}>
        <ExtendedInput
          name={"name"}
          placeholder={"Name"}
          type={"text"}
          value={name}
          onChange={onInputChange}
        />
        <ExtendedInput
          name={"address"}
          placeholder={"Address"}
          type={"text"}
          value={address}
          onChange={onInputChange}
        />
        <ExtendedLink to={"find-address"}>Pick place from map</ExtendedLink>
        <Button onClick={null} value={loading ? "Adding place" : "Add Place"} />
      </Form>
    </Container>
  </React.Fragment>
);

export default AddPlacePresenter;
