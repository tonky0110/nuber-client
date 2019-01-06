import React from "react";
import styled from "../../typed-components";

// style 정의
const Container = styled.input`
  border: none;
`;

// interface 정의

// component 정의
const Input = ({ placeholder }) => <Container placeholder={placeholder} />;

// export
export default Input;
