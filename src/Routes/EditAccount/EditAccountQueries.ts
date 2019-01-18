import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $email: String!
    $firstName: String!
    $lastName: String!
    $profilePhoto: String!
  ) {
    UpdateMyProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;
