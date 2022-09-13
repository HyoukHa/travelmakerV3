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
  const [board, setBoard] = useState({});
  const { boardId } = useParams();

  useEffect(() => {
    axios({
      url: `/packageboard/detail/${boardId}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
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
        <Box>
          <Typography component="legend"> 평점</Typography>
          <Rating />
        </Box>
        <Divider />
        <Typography>작성자 : {board.nickname}</Typography>
        <Divider />
        <Typography sx={{ fontSize: 10, textAlign: "right" }}>
          게시일 :{board.written_date}
        </Typography>
        <Divider />
        <Container>
          <KakaoMap />
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
      <Reply boardId={boardId} />
    </Container>
  );
};
