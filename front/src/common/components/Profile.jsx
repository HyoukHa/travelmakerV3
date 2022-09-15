import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LoginIcon from "@mui/icons-material/Login";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";

import { getSession, removeSession } from "../../config/session/session";

const menuList = [{ title: "내정보", link: "/user/mypage" }];

const Profile = ({ img, setIsLogined }) => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (anchor === "내정보") {
      navigate(`/user/` + JSON.parse(getSession("userInfo")).id);
    }

    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, idx) => (
    <Box
      key={idx}
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                // navigate(`/user/${JSON.parse(getSession("userInfo")).id}`);
                window.location.href = `/user/${
                  JSON.parse(getSession("userInfo")).id
                }`;
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <PermIdentityIcon />
                ) : index === 1 ? (
                  <LoginIcon />
                ) : (
                  <LogoutIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={"logout"} disablePadding>
          <ListItemButton
            onClick={() => {
              removeSession("Authorization");
              removeSession("userInfo");
              setIsLogined(false);
              navigate("/");
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"로그아웃"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Avatar src={img} />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Profile;
