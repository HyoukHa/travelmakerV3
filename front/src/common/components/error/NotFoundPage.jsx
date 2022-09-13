import { Button } from "@mui/material";
import React, { useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

/**
 * name === undefined >> 존재하지 않는 페이지,
 * name === "user" >> 존재하지 않는 사용자,
 * name === "board" >> 존재하지 않는 게시글
 */
const NotFoundPage = ({ name }) => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleOnClick = (info) => (e) => {
    if (name === "auth") {
      if (info === "home") {
        navigate("/");
      } else if (info === "back") {
        navigate(-2);
      }
    } else if (info === "home") {
      navigate("/");
    } else if (info === "back") {
      navigate(-1);
    }
  };

  return (
    <div css={cssWrapper}>
      <Box className="name_router">
        {name === undefined ? (
          <div>
            <p>Issue</p>
            <p>Not Exist Route</p>
          </div>
        ) : name === "user" ? (
          <div>
            <p>Issue</p>
            <p>Not Exist User</p>
          </div>
        ) : name === "board" ? (
          <div>
            <p>Issue</p>
            <p>Not Exist Board</p>
          </div>
        ) : (
          <div>
            <p>Issue</p>
            <p>Wrong Parameter abt "name"</p>
          </div>
        )}
      </Box>
      <div className="btn_area">
        <Button onClick={handleOnClick("home")}>홈으로</Button>
        <Button onClick={handleOnClick("back")}>뒤로가기</Button>
      </div>
    </div>
  );
};

const cssWrapper = css`
  justify-content: center;
  text-align: center;
  margin-top: 30vh;

  > .name_router {
    font-size: 2rem;
    color: red;
  }

  > .btn_area {
  }
`;

export default NotFoundPage;
