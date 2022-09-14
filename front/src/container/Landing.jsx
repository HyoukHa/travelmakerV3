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
import Carousel from "../common/components/carousel/Carousel";
import SearchBar from "../common/components/search/SearchBar";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const images = [
  {
    label: "lgh",
    title: "good1",
    imgs: "data:image/jpeg;base64,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",
  },
  {
    label: "Bird",
    title: "good",
    imgs: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    title: "good",
    imgs: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    title: "good",
    imgs: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "lgh",
    title: "good",
    imgs: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    title: "good",
    imgs: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    title: "good",
    imgs: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    title: "good8",
    imgs: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const Landing = () => {
  const [popularPackage, setPopularPackage] = useState([]);
  const [btnHandler, setBtnHandler] = useState({
    value: "",
    checked: false,
  });

  useEffect(() => {}, []);

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
      <div className="">
        <Carousel images={images} />
      </div>

      {/* </Container> */}
      <div>
        <Carousel images={images} />
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
