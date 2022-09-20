import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Carousel } from "../common";
import SearchBar from "../common/components/search/SearchBar";
import { getSession } from "../config/session/session";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PackageCarousel from "../common/components/carousel/PackageCarousel";
import ReviewCarousel from "../common/components/carousel/ReviewCarousel";

const Search = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const [noticeBoard, setNoticeBoard] = useState([]);
  const [packageBoard, setPackageBoard] = useState([]);
  const [reviewBoard, setReviewBoard] = useState([]);

  // useNavigate의 url 뒤에 따라오는 파라미터를 받아오기위한 useLocation() 선언
  const location = useLocation();

  // 검색 결과를 url parameter로 받아오기위한 useParams()
  const { param } = useParams();

  // 검색 키워드
  const [keyword, setKeyword] = useState(param);

  // 선택한 게시판 1. 공지 2. 패키지 3. 후기
  const [range, setRange] = useState(location.state || [1, 2, 3]);

  // 페이지 로딩시 검색 에따라 axios 통신을 통해 필요 데이터 받아오기
  useEffect(() => {
    axios({
      url: `/search`,
      method: "post",
      data: { keyword: keyword, range: range },
      headers: { Authorization: getSession("Authorization") },
    })
      .then((res) => {
        console.log("123");
        console.log(res.data);
        setNoticeBoard(res.data.notice);
        setPackageBoard(res.data.package);
        setReviewBoard(res.data.review);
        console.log(res.data.package);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [noticeBoard, packageBoard, reviewBoard]);

  return (
    <div css={cssWrapper}>
      <div className="title">
        <h1>검색결과</h1>
      </div>
      <SearchBar className="wrapper" data={param} />

      <div className="title">
        <h1>패키지</h1>
      </div>
      <div className="content">
        <PackageCarousel popularPackages={packageBoard} />
      </div>

      <div className="title">
        <h1>후기</h1>
      </div>
      <div className="content">
        <ReviewCarousel popularReviews={reviewBoard} />
      </div>

      <div className="title">
        <h1>공지사항</h1>
      </div>
      <div className="content">
        <PackageCarousel popularPackages={noticeBoard} />
      </div>
      {/* <Carousel images={images} /> */}
      {/* <Carousel images={images} />; */}
    </div>
  );
};

const cssWrapper = css`
  form {
    margin: 30px auto 100px auto;
  }

  > .title {
    margin: 30px auto;
    text-align: center;
    transform: translateX(-25%);
  }
`;

export default Search;
