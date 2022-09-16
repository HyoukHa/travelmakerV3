import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyReviewCarousel from "../common/components/carousel/MyReviewCarousel";
import { getSession } from "../config/session/session";

const MyReviewBoard = ({ userId }) => {
  const [write, setWrite] = useState([]);
  const navigate = useNavigate();
  const onClickBoardPage = () => {};
  useEffect(() => {
    // 사용자의 정보를 불러올때 저장된 토큰값을 같이 보내준다.
    axios
      .get(`/reviewboard/my/${userId}`, {
        headers: { Authorization: getSession("Authorization") },
      })
      .then((res) => {
        setWrite(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="10vh"
      style={{ marginTop: "20px" }}
    >
      <Grid item style={{ width: "900px" }}>
        <Box
          style={{
            display: "grid",
            gap: "2%",
            justifyContent: `center`,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            <p>등록한 리뷰</p>
          </Typography>
          <MyReviewCarousel write={write} />
        </Box>
      </Grid>
    </Box>
  );
};

export default MyReviewBoard;
