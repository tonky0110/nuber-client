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

2.24 codegen 수정.
음... windows 환경에서는 ''도 못붙이고 ''가 없으면 !(_.local).ts도 넣을 수가 없어요. 수많은 삽질 끝에 Nicolas랑 설정을 조금 다르게 하기로 했습니다. 사실 local을 없애고싶은 이유가 @client태그가 붙은 쿼리들을 codegen에서 제외하고싶기 때문이에요. 최종 nuber-client를 보면 .local이 붙은게 AppQueries.local.ts밖에 없습니다. 그래서 저는 그냥 codegen의 설정을 --queries=src/\*\*/_.ts로 놔두고 AppQueries.local.ts => AppQueries.tsx로 바꾸었습니다. 그러면 AppQueries는 tsx확장자이기때문에 포함이 안되고 ''도 붙일 필요가 없어서 윈도우에서 동작이 가능해집니다. 꼼수이긴 하지만 윈도우에서 동작하기위해서는 이것밖에 없는것같아요 XD 헷갈리시는분들은 https://github.com/lopun/luber-client의 package.json과 Components/AppQueries를 보시면 됩니다.

2.27 facebook login
yarn add react-facebook-login

2.31
yarn add react-sidebar
