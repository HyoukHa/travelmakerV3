import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "../../config";

const KakaoRedirect = () => {
  const { Kakao } = window;
  const navigate = useNavigate();

  useEffect(() => {
    const href = window.location.href;

    let params = new URL(href).searchParams;

    let code = params.get("code");
    console.log(code);

    Kakao.Auth.setAccessToken(code);
    console.log("hello1");
    console.log(Kakao.Auth.getAccessToken());
    // Kakao.API.request({
    //   url: "/v2/user/me", // 사용자 정보 가져오기
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    // navigate("/");
    // window.location.url = "http://localhost:3000";
  }, []);
};

export default KakaoRedirect;
