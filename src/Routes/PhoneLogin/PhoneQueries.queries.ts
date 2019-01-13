import { gql } from "apollo-boost";

export const PHONE_SIGN_IN = gql`
  # 프로그래머가 apollo graphql에게 줄 operation의 이름
  mutation startPhoneVerification($phoneNumber: String!) {
    # 서버가 할 operation
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;
