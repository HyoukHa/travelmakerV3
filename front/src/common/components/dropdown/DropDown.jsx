/**
 * DropDown.jsx
 *
 */

import { useState, useRef, useEffect } from "react";

import useDetectClose from "../../hook/useDetectClose";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";

const DropDown = ({ headName, menuList, toggle, toggleState }) => {
  const dropDownRef = useRef(null);
  const [isToggle, setIsToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      css={cssWrapper}
      onMouseOver={() => setIsToggle(true)}
      onMouseOut={() => setIsToggle(false)}
    >
      <li
        onClick={() => {
          if (headName == "공지사항") {
            navigate("/board/announcement/notice");
          }
        }}
      >
        {headName}
      </li>

      <ul ref={dropDownRef} className={`${isToggle ? "active" : "inactive"}`}>
        <li>
          {menuList.map((item, idx) => {
            return (
              <Link key={idx} to={item.link}>
                {item.title}
              </Link>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

const cssWrapper = css`
  position: relative;
  > ul {
    color: black;
    background: #fff;
    border-radius: 8px;
    position: absolute;
    top: 30px;
    width: 150px;
    text-align: center;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-50%);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    padding: 10px;

    > li {
      display: flex;
      flex-direction: column;
      > a {
        text-decoration: none;
        color: black;
      }

      > a:hover {
        color: red;
      }
    }
  }

  > .active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transform: translateX(-35%);
  }
`;

export default DropDown;
