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

// const data = {
//   duration=2,
//   schedule=[
//     [
//       {x=126.920428387117, y=37.5485252946282, addressName="서울 마포구 서교동 365-29"},
//       {x=126.92673403106848, y=37.557560076670406, addressName="서울 마포구 동교동 192-45"},
//       {x=126.92443913897051, y=37.55275180872968, addressName="서울 마포구 서교동 338-19"},
//       {x=126.923778562273, y=37.5568707448873, addressName="서울 마포구 동교동 165"},
//       {x=126.925554591431, y=37.550874837441, addressName="서울 마포구 상수동 72-1"}
//     ],
//     [
//       {x=126.849533759513, y=37.5509646154307, addressName="서울 강서구 화곡동 980-16"},
//       {x=126.67602846821862, y=37.545433516040895, addressName="인천 서구 심곡동 244"},
//       {x=126.895456780022, y=37.4568411485862, addressName="서울 금천구 시흥동 1020"},
//       {x=127.09768172993404, y=37.322115297572424, addressName="경기 용인시 수지구 풍덕천동 720"},
//       {x=126.951561853867, y=37.4783683761407, addressName="서울 관악구 봉천동 1570-1"},
//       {x=126.89627166361284, y=37.5263617665219, addressName="서울 영등포구 당산동3가 385-1"},
//       {x=126.99057555769706, y=37.53242563258956, addressName="서울 용산구 이태원동 34-87"}
//     ]
//   ],
//   limit_to=20,
//   title=test20,
//   startdate="2022-10-25T15:00:00.000Z",
//   content=test20,
//   budged=20000
// }

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getSession } from "../config/session/session";

const PackageBoardDetail = (props) => {
  const [board, setBoard] = useState({});
  const [isJoin, setIsJoin] = useState(false);
  const { boardId } = useParams();

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
        console.log(res.data);
        setBoard(res.data);
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
            <KakaoMap />
            <Typography>{board.content}</Typography>
          </Container>
          {props.userId === board.userId ? (
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
