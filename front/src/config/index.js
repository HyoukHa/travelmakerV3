const REST_API_KEY = "09a98e92900d20878612b7c4f41272d5";
const REDIRECT_URI = "http://localhost:8080/oauth2/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login&client_id=${process.env.REACT_APP_KAKAO_REST_API}`