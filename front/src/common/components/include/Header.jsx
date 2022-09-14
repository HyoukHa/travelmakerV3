/**
 * Header.jsx
 *
 * 책임자 : 권혁하
 * 최종 작성자 : 이창주
 * 최종 수정일 : 2022.09.14
 *
 * 수정 내용 :
 * 2022.09.14 : Menu 수정 및 링크 업데이트
 *
 */
import React, { useEffect, useState } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Profile from "../Profile";
import DropDown from "../dropdown/DropDown";
import MainLogo from "../MainLogo";
import { SignIn } from "../../../container";
import { useNavigate } from "react-router";
import { getSession } from "../../../config/session/session";

const navList = {
  게시판: [
    { title: "패키지", link: "/board/package/1" },
    { title: "Menu1-2", link: "/link1-2" },
  ],
  Menu3: [
    { title: "Menu3-1", link: "/link3-1" },
    { title: "Menu3-2", link: "/link3-2" },
  ],
  Menu4: [
    { title: "공지사항", link: "/board/announcement/notice" },
    { title: "이벤트", link: "/board/announcement/event" },
  ],
};

const Header = ({ isLogined, setIsLogined = () => {} }) => {
  const navigate = useNavigate();
  // const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {}, []);

  return (
    <header className="header-wrapper" css={cssWrapper}>
      <div className="contents">
        <div className="logo_area">
          <MainLogo />
        </div>
        <nav className="navigation">
          <ul
          // onMouseOut={() => setIsToggle(false)}
          // onMouseOver={() => setIsToggle(true)}
          >
            <DropDown
              // toggleState={setIsToggle}
              // toggle={isToggle}
              headName="게시판"
              menuList={navList.게시판}
            />
            <DropDown
              // toggle={isToggle}
              headName="알려줘"
              menuList={navList.Menu3}
            />
            <DropDown
              // toggle={isToggle}
              headName="공지사항"
              menuList={navList.Menu4}
            />
          </ul>
        </nav>

        <div className="header-right">
          {isLogined ? (
            <Profile
              img={JSON.parse(getSession("userInfo")).src_photo}
              isLogined={isLogined}
              setIsLogined={setIsLogined}
            />
          ) : (
            <SignIn isLogined={isLogined} setIsLogined={setIsLogined} />
          )}
        </div>
      </div>
    </header>
  );
};

const cssWrapper = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #dde0ea;
  z-index: 100;
  > .contents {
    display: flex;
    width: 100%;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    > .logo_area {
      > img {
        height: 60px;
      }
    }
    > .navigation {
      > ul {
        display: flex;
        padding-left: 0px;
        margin: auto;
        gap: 100px;
        list-style-type: none;

        > div {
          // li로 선언된 nav 아이템들의 스타일 적용부
          > li {
            cursor: pointer;
          }
          // hover시 변경되는 스타일 적용부
          > li:hover {
            color: red;
          }
          // nav의 각 요소간 사이 스타일 적용부
        }
      }
    }
    > .header-right {
      display: flex;
    }
  }
`;

export default Header;
