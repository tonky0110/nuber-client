# nuber-client

Client for the (N)Uver Clone Course on Nomad Academy. ReactJS, Apollo, Typescript

## Screens:

### Logged Out:

- [ ] Home
- [ ] Phone Login
- [ ] Verify Phone Number
- [ ] Social Login

### Logged In:

- [ ] Home
- [ ] Ride
- [ ] Edit Account
- [ ] Settings
- [ ] Places
- [ ] Add Place
- [ ] Find Address
- [ ] Challenge: Ride History

####

2.1 yarn add apollo-boost graphql react-apollo
Graphql-yoga: Backend
Apollo: Frontend(like redux)

2.2 권한(Authentication)
2.3 set default client state - Apollo boost 세팅끝!!!

2.6 yarn add prop-types
2.17 react-toastify
2.18 PhoneLoginMutation

    파라메터 2개
        1. 나 --> apollo-boost에게 출 operation이름
        2. 서버가 할 operation.

2.19 yarn add apollo
src/types/api.d.ts 파일 생성

yarn global add apollo@1.9.2
-- 2.1.9버전에서는 몇가지 변경사항이 있어 실행안됨.

package.json파일.
"precodegen": "apollo schema:download --endpoint=http://localhost:4000/graphql",
"codegen": "apollo codegen:generate src/types/api.d.ts --queries=src/\*_/_.queries.ts --addTypename --schema schema.json --target typescript --outputFlat"
