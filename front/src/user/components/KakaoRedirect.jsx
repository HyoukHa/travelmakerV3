import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "../../config";

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const href = window.location.href;

    let params = new URL(href).searchParams;

    let code = params.get("code");
    console.log(code);
    // navigate("/");
    // window.location.url = "http://localhost:3000";
  }, []);
};

export default KakaoRedirect;
