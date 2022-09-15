import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSession } from "../../config/session/session";
import UserFollowList from "./UserFollowList";

const FollowerList = () => {
  const [name, setName] = useState("follower");
  const { id } = useParams();
  useEffect(() => {}, [name]);

  return (
    <Box>
      <UserFollowList name={name} />
    </Box>
  );
};

export default FollowerList;
