import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

/**
 * props 전달로 값을 받아와 pagination 카운트를 정함
 */

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const PaginationBtn = ({ count, setPageid = () => {}, pageid }) => {
  const navi = useNavigate();
  const handleChange = (e, value) => {
    setPageid(value);
    navi(`/board/package/${value}`);
  };
  /**  count는 pagebtn의 갯수를 정하는 것
   *   page는 page의 숫자에 따라 navigate하는것
   *   onchage의 handlechange에 value값에 따라 navi가 변함
   *   예) 1번 버튼을 누르면 /board/package/1
   *       2번 버튼을 누르면 /board/package/2
   */
  return (
    <div css={cssWrapper}>
      <Stack className="" spacing={2}>
        <Pagination count={count} page={pageid} onChange={handleChange} />
      </Stack>
    </div>
  );
};

const cssWrapper = css`
  justify-content: center;
  margin: 20px auto;

  nav {
    margin: auto;
  }
`;

export default PaginationBtn;
