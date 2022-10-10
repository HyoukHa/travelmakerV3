import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import KakaoMap from "../common/components/map/KakaoMap";
import { useParams } from "react-router";
import axios from "axios";
import { Reply } from ".";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getSession } from "../config/session/session";

export const ReviewBoardDetail = () => {
  const [board, setBoard] = useState({});
  const [mapstep, setMapstep] = useState(0);
  const [isDetail, setisDetail] = useState(false);
  const { boardId } = useParams();
  const [mapDay, setMapDay] = useState(0);
  console.log("reviewboarddetail flag1"); //1
  console.log(board); //2
  let maxstep = 0;
  const daychange = (e) => {
    setMapDay(e.target.value);
    console.log("지금 있는곳", e.target.value);
  };
  useEffect(() => {
    console.log("rend", mapDay);
  }, [mapDay]);

  useEffect(() => {
    console.log("boardId : " + boardId);
    axios({
      url: `/reviewboard/detail/${boardId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log("321321");
        console.log(res.data);
        setBoard({ ...res.data, location: JSON.parse(res.data.location) });
        setMapstep(maxstep);
        console.log(mapstep);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [boardId]);

  return (
    <div css={cssWrapper}>
      <Container>
        <Box mt="59px" maxWidth="700px" mx="auto">
          <Typography fontWeight="bold" textAlign="center" variant="h5">
            {board.title}
          </Typography>
          <Divider />
          <Divider />
          <Typography>작성자 : {board.nickname}</Typography>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>비용 : {board.budget}</Typography>
            <Typography>기간 : {board.duration} 일</Typography>
          </div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>조회수 : {board.viewCount}</Typography>
            <Typography>작성일 : {board.written_date}</Typography>
          </div>
          <Divider />
          <Divider />

          <Container>
            <select name="steps" onChange={daychange} defaultValue={0}>
              {Object.keys(board).length != 0
                ? board.location.map((item, index) => {
                    // console.log("here");
                    // console.log(item);
                    // maxstep = index;
                    // console.log("max", maxstep);
                    return (
                      <option
                        key={index}
                        value={index}
                        // onChange={selectvalue}
                      >
                        {index + 1} 일차
                      </option>
                    );
                  })
                : null}
            </select>
            <KakaoMap
              isDetail={isDetail}
              board={board.location}
              maxstep={maxstep}
              mapDay={mapDay}
            />
          </Container>
          <Container>
            <Typography>{board.content}</Typography>
          </Container>
          {getSession("userInfo") !== null &&
          JSON.parse(getSession("userInfo")).id === board.userId ? (
            <Box display="flex" justifyContent="center" justifyItems="center">
              <Button>수정</Button>
              <Button>삭제</Button>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" justifyItems="center">
              <Button>뒤로 가기</Button>
            </Box>
          )}
        </Box>
      </Container>
      <Reply boardId={boardId} />
    </div>
  );
};

const cssWrapper = css`
  .color_red {
    color: red;
  }

  .color_blue {
    color: blue;
  }
`;

export default ReviewBoardDetail;
