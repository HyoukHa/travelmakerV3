import { Box } from "@mui/material";
import React from "react";
import UserFollowList from "./UserFollowList";

const MyFollowingList = () => {
  const name = "myfollowing";
  return (
    <Box>
      <UserFollowList name="myfollowing" />
    </Box>
  );
};

export default MyFollowingList;
