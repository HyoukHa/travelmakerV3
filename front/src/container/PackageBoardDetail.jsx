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

export const PackageBoardDetail = (props) => {
  const [mapstep, setMapstep] = useState(0);
  const [board, setBoard] = useState({});
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
    axios({
      url: `/packageboard/detail/${boardId}`,
      method: "get",
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
    <Container>
      <Box mt="59px" maxWidth="700px" mx="auto">
        <Typography fontWeight="bold" textAlign="center" variant="h5">
          {board.title}
        </Typography>
        <Divider />
        <Divider />
        <Typography>작성자 : {board.nickname}</Typography>
        <Divider />
        <Typography sx={{ fontSize: 10, textAlign: "right" }}>
          게시일 :{board.written_date}
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
          />
        </Container>
        <Box>
          <Typography component="legend"> 평점</Typography>
          <Rating />
        </Box>
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
      <Reply boardId={boardId} />
    </Container>
  );
};
