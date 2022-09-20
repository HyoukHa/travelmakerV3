import { Avatar, Card, CardHeader, Grid, IconButton } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import React, { useEffect, useState } from "react";
import { PackageBoardDetail } from "../../../container/PackageBoardDetail";
import { useNavigate } from "react-router";
import axios from "axios";
import { getSession } from "../../../config/session/session";
import { SignIn } from "../../../container";

const PackageCard = ({ step, wish, page }) => {
  const navigate = useNavigate();
  const [isWished, setIsWished] = React.useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const heartOn = () => {
    console.log(isWished);
    if (getSession("userInfo") !== null) {
      axios({
        url: "/packageboard/wish",
        method: "post",
        data: step.id,
        headers: {
          Authorization: getSession("Authorization"),
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((res) => {
          setIsWished(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setOpen(true);
      // return <SignIn />;
    }
  };

  const userClicked = () => {
    navigate(`/user/${step.userId}`);
  };

  const cardClicked = () => {
    console.log("flag3");
    console.log(page);
    if (page === "package") {
      navigate(`/board/package/detail/${step.id}`, page);
    } else if (page === "review") {
      navigate(`/board/review/detail/${step.id}`, page);
    }
  };

  // useEffect(() => {
  //   console.log("packagecard");
  //   console.log("1:" + step.id);
  //   console.log("2:" + isWished);
  // }, [wish, isWished]);

  useEffect(() => {}, [isWished]);

  useEffect(() => {
    setIsWished(wish);
  }, [wish]);

  return (
    <Card>
      <CardHeader
        style={{ cursor: "pointer" }}
        avatar={
          <Avatar
            sx={{
              bgcolor: `#22fdef[500]`,
            }}
            style={{ cursor: "pointer" }}
            aria-label="recipe"
            src={step.userImg}
          ></Avatar>
        }
        title={step.title}
        subheader={step.written_date}
        onClick={userClicked}
      />
      <CardMedia
        component="img"
        height="194"
        image={step.imgs} //게시물 인덱스
        onClick={cardClicked}
        // alt="Paella dish"
      />
      <CardContent onClick={cardClicked}>
        <Typography
          style={{ textAlign: "center", fontSize: "strong" }}
          variant="body2"
          color="text.secondary"
          component="div"
        >
          {page === "package" ? (
            <Grid container justifyContent={"space-evenly"}>
              {"참여인원"}
              <br />
              {step.current_to} / {step.limit_to}
              {step.current_to === step.limit_to ? (
                <SportsKabaddiIcon />
              ) : (
                <EmojiPeopleIcon />
              )}
            </Grid>
          ) : (
            step.content
          )}
        </Typography>
      </CardContent>
      {page === "package" ? (
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={heartOn}>
            {isWished ? (
              <FavoriteIcon sx={{ color: "#ff002b" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <SignIn open={open} setOpen={setOpen} />
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default PackageCard;
