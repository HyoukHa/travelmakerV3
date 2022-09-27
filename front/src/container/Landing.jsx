/**
 * Landing.jsx - 메인 페이지로 사용될 페이지
 *
 * 책임자 :
 * 최종 작성자 :
 * 최종 수정일 :
 *
 * 수정 내용 :
 *
 * 년/월/일 시:분 => 수정내용
 *
 */

import React, { useEffect, useState } from "react";
import PackageCarousel from "../common/components/carousel/PackageCarousel";
import SearchBar from "../common/components/search/SearchBar";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import Button from "@mui/material/Button";
import ReviewCarousel from "../common/components/carousel/ReviewCarousel";

const Landing = () => {
  const { Kakao } = window;
  const [popularPackage, setPopularPackage] = useState([]);
  const [popularReview, setPopularReview] = useState([]);
  const [btnHandler, setBtnHandler] = useState({
    value: "",
    checked: false,
  });

  let a =
    "http://localhost:3000/oauth2/kakao/callback?code=jqvd90bl6CWMbROxvUvRF1nz1ul5l4XtYAIgvhf0iPjoe3z7aZrsGkkCsPoApCivIK1pQgorDKYAAAGDfaM7TQ";

  useEffect(() => {
    axios
      .get("/packageboard/popular")
      .then((res) => {
        setPopularPackage(res.data);
      })
      .catch();

    axios
      .get("/reviewboard/popular")
      .then((res) => {
        setPopularReview(res.data);
      })
      .catch();
  }, []);
  useEffect(() => {}, [popularPackage, popularReview]);

  // const onPay = () => {
  //   axios({
  //     url: `http://kauth.kaka.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API}$redirect_uri=${kakao.redirectUri}$response_type=code`,
  //     method: "post",
  //     headers: { "Content-Type": "application/json; charset=utf-8" },
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // };

  const kakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/oauth2/kakao/callback",
      scope: "profile, account_email, gender",
      success: (authObj) => {
        console.log("successing!");
        console.log(authObj);
      },
      // scope : 동의 란에 추가할 항목들 >> 설정해둔 개인정보 동의항목을 동의받기위한 부분을 추가하는 기능
    });
    // axios({
    //   url: "https://kauth.kakao.com/oauth/authorize?client_id=5a7ad09889dd0284f8b4e384bfa8c151$redirect_uri=http://localhost:3000/oauth2/kakao/callback$response_type=code",
    //   method: "get",
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <div css={cssWrapper}>
      <div className="player-wrapper">
        <video muted autoPlay loop playsInline controls={false}>
          <source src="./static/cutecat.mp4" type="video/mp4" />
        </video>
        <div className="search-bar">
          <SearchBar />
        </div>
      </div>

      <div className="">
        <Button className="btn" onClick={kakaoLogin}>
          <img src="./kakaoLogo.png" alt="kakao" />
        </Button>
        {/* <a href="https://kauth.kakao.com/oauth/authorize?client_id=5a7ad09889dd0284f8b4e384bfa8c151$redirect_uri=http://localhost:3000/oauth2/kakao/callback$response_type=code">
          <img src="./kakaoLogo.png" alt="kakao" />
        </a> */}
      </div>

      {/* <Container maxWidth="sm"> */}
      <div>
        <PackageCarousel popularPackages={popularPackage} />
      </div>

      {/* </Container> */}
      <div>
        <ReviewCarousel popularReviews={popularReview} />
      </div>
    </div>
  );
};

const cssWrapper = css`
  color: white;
  /** 각 영역 사이 간격 */
  > div + div {
    margin-top: 50px;
  }

  > .player-wrapper {
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: center;
    > .search-bar {
      position: absolute;
      top: 100%;
      transform: translate(-50%, -400%);
      left: 50%;
      z-index: 10 !important;
    }
  }
  > .search {
    margin-top: -30px;
    align-items: center;
    height: 40px;
    text-align: center;
    > span {
      background-color: white;
    }
  }
  > .carousel1 {
    height: 200px;
    background-color: red;
    margin: 100px 0;
  }
  > .carousel2 {
    height: 200px;
    background-color: blue;
  }
`;

export default Landing;
