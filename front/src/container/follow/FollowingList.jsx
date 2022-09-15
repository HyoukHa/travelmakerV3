import { Box } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSession } from "../../config/session/session";
import UserFollowList from "./UserFollowList";

const FollowingList = () => {
  const [name, setName] = useState("following");
  const { id } = useParams();

  useEffect(() => {}, [name]);

  return (
    <Box>
      <UserFollowList name={name} />
    </Box>
  );
};

export default FollowingList;
