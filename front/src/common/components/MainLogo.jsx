import React from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../static/main_logo.png";

/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

const MainLogo = () => {
  const navigate = useNavigate();

  return (
    <img css={cssWrapper} src={Logo} alt="" onClick={() => navigate("/")} />
  );
};

const cssWrapper = css`
  cursor: pointer;
`;

export default MainLogo;
