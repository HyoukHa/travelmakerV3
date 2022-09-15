import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSession } from "../../config/session/session";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  img: {
    width: 100,
    height: 100,
  },
};

const UserFollowList = ({ name }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    if (name == "follower") {
      // follower
      axios
        .get(`/follower/${id}`)
        .then((res) => {
          setUserLists(res.data);
        })
        .catch();
    } else if (name == "following") {
      // following
      axios
        .get(`/following/${id}`)
        .then((res) => {
          console.log(res.data);
          setUserLists(res.data);
        })
        .catch(() => {});
    }
  }, [name]);

  return (
    <Box mt="2vh">
      {userLists.map((userList, idx) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
          key={idx}
          gap="10px"
        >
          <Box
            mt="5vh"
            onClick={() => {
              navigate(`/user/${userList.targetUserId}`);
            }}
          >
            {userList.userImg == "" || userList.userImg == null ? (
              <Avatar sx={style.img}>
                <AccountCircleIcon sx={style.img} />
              </Avatar>
            ) : (
              <Avatar sx={style.img}>
                <img src={`${userList.userImg}`} style={style.img} />
              </Avatar>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
            paddingTop="30px"
          >
            <h3>{userList.targetNickname}</h3>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default UserFollowList;
