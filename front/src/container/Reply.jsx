/**
 * Reply.jsx -- 댓글 페이지
 * 게시판 페이지의 하단에 같이 사용될 페이지
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Input, TextField } from "@mui/material";
import { getSession } from "../config/session/session";
import { useNavigate } from "react-router";

const Reply = ({ boardId }) => {
  const navigate = useNavigate();
  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState({ boardId: boardId, content: "" });

  useEffect(() => {
    axios({
      url: `/reply/${boardId}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        setReplyList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(reply);
  }, [reply]);

  // 해야할일: 댓글 삭제(1)
  const deleteHandler = (id) => () => {
    axios({
      url: `/reply/delete`,
      method: "post",
      data: { id: id },
      headers: { Authorization: getSession("Authorization") },
    })
      .then((res) => {
        console.log(res.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    axios({
      url: `/reply/write`,
      method: "post",
      data: reply,
      headers: { Authorization: getSession("Authorization") },
    })
      .then((res) => {
        console.log(res.data);
        navigate(0);
      })
      .catch((error) => {
        console.log("로그인 해주세요");
        console.log("token : {" + getSession("Authorization") + "}");
      });
  };

  return (
    <div css={cssWrapper}>
      <Box>
        <Grid className="reply" container spacing={1} maxWidth={`768px`}>
          <div className="write_reply">
            <TextField
              id="standard-basic"
              label="댓글을 입력해주세요"
              value={reply.content}
              onChange={(e) => {
                setReply({ ...reply, content: e.target.value });
              }}
              variant="standard"
            />

            <Button onClick={handleBtnClick}>작성</Button>
          </div>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              댓글
            </Typography>
            <List>
              {replyList.map((row, idx) => {
                return (
                  <ListItem key={idx}>
                    {row.userImg === "" || row.userImg === undefined ? (
                      <ListItemAvatar>
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <AccountCircleIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </ListItemAvatar>
                    ) : (
                      <ListItemAvatar>
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <img
                            src={`${row.userImg}`}
                            style={{ width: 40, height: 40 }}
                          />
                        </Avatar>
                      </ListItemAvatar>
                    )}

                    <ListItemText primary={row.content} />
                    {JSON.parse(getSession("userInfo")).userId == row.userId ? (
                      <IconButton
                        className="cursor"
                        edge="end"
                        aria-label="delete"
                        onClick={deleteHandler(row.id)}
                      >
                        <DeleteIcon className="cursor" />
                      </IconButton>
                    ) : null}
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const cssWrapper = css`
  margin: auto;
  width: 80vw;
  color: black;
  font-size: 5rem;

  .cursor {
    cursor: pointer;
  }

  .reply {
    margin: auto;
  }

  .write_reply {
    margin: auto;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }
`;

export default Reply;
