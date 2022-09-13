import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

function UserInfo() {
  const profileClickHandler = () => {
    // 프로필 바꾸는 함수
  };

  return (
    <Box mt="100px">
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        >
          <Avatar
            sx={{ width: 300, height: 300 }}
            onclick={profileClickHandler}
            src={
              "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
            }
          >
            {" "}
          </Avatar>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        >
          <Button justifyContent="center" variant="contained" color="info">
            username
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        <Grid display="flex" gap="1vw">
          <Card>
            <CardActionArea>
              <CardContent width="300">
                <Typography gutterBottom variant="h5" component="div">
                  follower
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  0
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  following
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  0
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Box>
      <Box
        display="block"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        <Typography variant="h4" mt="100px" textAlign="center">
          {" "}
          &lt; My Package &gt;{" "}
        </Typography>
        <Carousel />
        <Typography variant="h4" mt="50px" textAlign="center">
          &lt; Review &gt;{" "}
        </Typography>
        <Carousel />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        <Grid display="flex" gap="1vw">
          <Button variant="contained">수정</Button>
          <Button variant="contained" color="error">
            탈퇴
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default UserInfo;
