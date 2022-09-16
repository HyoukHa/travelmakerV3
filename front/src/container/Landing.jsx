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
import ReviewCarousel from "../common/components/carousel/ReviewCarousel";

const Landing = () => {
  const [popularPackage, setPopularPackage] = useState([]);
  const [popularReview, setPopularReview] = useState([]);
  const [btnHandler, setBtnHandler] = useState({
    value: "",
    checked: false,
  });

  useEffect(() => {
    axios
      .get("/packageboard/popular")
      .then((res) => {
        setPopularPackage(res.data);
        console.log(res.data);
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
