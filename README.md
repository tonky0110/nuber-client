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

2.39
cloudinary
login --> setting --> upload --> uploadpresets --> add upload preset --> signing mode: unsigned --> save

Upload Manipulations --> Incoming Transformation:

yarn add axios

2.46 Google Map
yarn add google-map-react
https://console.cloud.google.com/apis/
maps javascript api --> 사용설정. --> 사용자 인증 정보

keys.ts
export const MAPS_KEY = "구글API키";

css 트릭(중앙배치)
margin: auto;
top: 0;
left: 0;
right: 0;
bottom: 0;

getCurrentPosition검색 --> Geolocation.getCurrentPosition()

2.49 reverse geocode
https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}

https://console.developers.google.com/google/maps-apis/apis/geocoding-backend.googleapis.com/credentials?project=reactsimplestarter-tonky0110&hl=ko&duration=P14D

※ Geocoding APIs 권한 추가.
Check your settings in the Google API Console for this API key. Be sure that the

- Maps JavaScript,
- Places,
- Geolocation,
- Geocode APIs are all enabled.

  2.51 구글 map api 신용카드를등록하면 300달러 어치를 무료로 사용할수있습니다. 동의없이 초과시엔 자동결제는 되지않는다고 하네요 .
