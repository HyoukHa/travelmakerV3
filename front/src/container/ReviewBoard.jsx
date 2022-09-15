/**
 * ReviewBoard.jsx - 후기 게시판
 */
import { Box, Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router";
import { LinkButton } from "../common";
import { getSession } from "../config/session/session";
import Package from "./Package";

const ReviewBoard = () => {
  const { pagenum } = useParams();

  return (
    <Container container={true} spacing={2} item={12}>
      <Box sx={{ alignItems: "center" }}>
        <Package id={pagenum} page="review" />
        {getSession("userInfo") !== null ? (
          <LinkButton
            content="글 작성"
            color="skyblue"
            navi="/board/review/write"
          />
        ) : null}
      </Box>
    </Container>
  );
};

export default ReviewBoard;
