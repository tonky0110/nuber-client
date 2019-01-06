import React from "react";
import styled from "../../typed-components";

// style 정의
const Container = styled.input`
  border: none;
`;

// interface 정의
interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  name?: string;
  onChange: any;
}
// component 정의
const Input: React.SFC<IProps> = ({
  placeholder = "",
  type = "text",
  required = true,
  value,
  name,
  onChange
}) => (
  <Container
    onChange={onChange}
    name={name}
    type={type}
    required={required}
    value={value}
    placeholder={placeholder}
  />
);

// export
export default Input;
