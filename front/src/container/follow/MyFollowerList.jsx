import { Box } from "@mui/system";
import React from "react";
import UserFollowList from "./UserFollowList";

const MyFollowerList = () => {
  const name = "myfollower";
  return (
    <Box>
      <UserFollowList name="myfollower" />
    </Box>
  );
};

export default MyFollowerList;
