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

export const PackageBoardDetail = ({ userId }) => {
  const [board, setBoard] = useState({});
  const [isJoin, setIsJoin] = useState(false);
  const [mapstep, setMapstep] = useState(0);
  const [isDetail, setisDetail] = useState(false);
  const { boardId } = useParams();
  console.log("flag1"); //1
  console.log(board); //2
  let maxstep = 0;
  // const selectvalue = (e) => {
  //   maxstep = e.target.value;
  //   setMapstep(maxstep);
  //   console.log(mapstep);
  // };
  useEffect(() => {
    if (getSession("userInfo") !== null) {
      axios({
        url: "/packageboard/isjoin",
        method: "post",
        data: parseInt(boardId),
        headers: {
          Authorization: getSession("Authorization"),
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((res) => {
          console.log(res.data);
          setIsJoin(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    console.log("initial join");
    console.log(isJoin);
  }, [isJoin]);

  useEffect(() => {
    axios({
      url: `/packageboard/detail/${boardId}`,
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

  const doJoin = () => {
    axios({
      url: "/packageboard/join",
      method: "post",
      data: parseInt(boardId),
      headers: {
        Authorization: getSession("Authorization"),
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log(res.data);
        setIsJoin(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <Typography>
            참여자 / 모집 인원 :{" "}
            {board.limit_to - board.current_to <= 2 ? (
              <span className="color_red">{board.current_to} </span>
            ) : (
              <span className="color_blue">{board.current_to} </span>
            )}
            / {board.limit_to}
            {getSession("userInfo") !== null ? (
              <Button onClick={doJoin}>
                {!isJoin ? "참여하기" : "참여취소"}
              </Button>
            ) : null}
          </Typography>
          <Divider />

          <Container>
            <select name="steps">
              {Object.keys(board).length != 0
                ? board.location.map((item, index) => {
                    console.log("here");
                    console.log(item);
                    maxstep = index;
                    console.log("max", maxstep);
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
          </Container>
          <Container>
            <Typography>{board.content}</Typography>
          </Container>
          {userId === board.userId ? (
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

export default PackageBoardDetail;
