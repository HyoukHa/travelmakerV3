/**
 * PackageBoard.jsx - 패키지 게시판
 */
import { Container, Grid, Box } from "@mui/material";
import React, { useEffect } from "react";
import { LinkButton } from "../common";
import Package from "./Package";
import { useParams } from "react-router-dom";
import { getSession } from "../config/session/session";

const PackageBoard = () => {
  const { pagenum } = useParams();

  return (
    <Container container={true} spacing={2} item={12}>
      <Box sx={{ alignItems: "center" }}>
        <Package id={pagenum} page="package" />
        {getSession("userInfo") !== null &&
        JSON.parse(getSession("userInfo")).rank <= 2 ? (
          <LinkButton
            content="글 작성"
            color="skyblue"
            navi="/board/package/write"
          />
        ) : null}
      </Box>
    </Container>
  );
};

export default PackageBoard;
