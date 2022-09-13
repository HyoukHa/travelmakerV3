import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSession } from "../../config/session/session";
import UserFollowList from "./UserFollowList";

const FollowerList = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (JSON.parse(getSession("userInfo")).id == id) {
      setName("myFollower");
    } else {
      setName("userFollower");
    }
  }, [name]);

  return (
    <Box>
      <UserFollowList name={name} />
    </Box>
  );
};

export default FollowerList;
