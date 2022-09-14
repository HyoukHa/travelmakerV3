import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../config/session/session";

const NoticeAndEventWrite = () => {
  const navigate = useNavigate();
  const currencies = [
    { value: "[공지사항]", label: "공지사항" },
    { value: "[이벤트]", label: "이벤트" },
  ];
  const [title, setTitle] = useState("");
  const [noticeOrEvent, setNoticeOrEvent] = useState({
    title: "",
    content: "",
    category: 1,
    userId: JSON.parse(getSession("userInfo")).id,
    imgs: "",
  });

  const [lastNoticeOrEvent, setLastNoticeOrEvent] = useState({
    title: "",
    content: "",
    category: 1,
    userId: JSON.parse(getSession("userInfo")).id,
    imgs: "",
  });

  const titleCandleChange = (e) => {
    setTitle(e.target.value);
  };
  const titleHandleChange = (info) => (e) => {
    setNoticeOrEvent({ ...noticeOrEvent, [info]: e.target.value });
    setLastNoticeOrEvent({
      ...lastNoticeOrEvent,
      title: title + noticeOrEvent.title,
      content: noticeOrEvent.content,
      imgs: noticeOrEvent.imgs,
    });
    console.log(lastNoticeOrEvent);
  };
  const onSubitHandler = () => {
    axios
      .post("/noticeandevent/insert", lastNoticeOrEvent, {
        headers: {
          Authorization: getSession("Authorization"),
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        console.log(res.status);
        if (title == "[공지사항]") {
          navigate("/board/announcement/notice");
        } else if (title == "[이벤트]") {
          navigate("/board/announcement/event");
        }
      })
      .catch();
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        justifyContent: "center",
      }}
    >
      <Box p={10}>
        <Grid container>
          <Grid display="flex">
            <FormControl sx={{ width: "150px" }}>
              <TextField
                id="outlined-select-title"
                select
                label="title*"
                value={title}
                onChange={titleCandleChange}
                helperText="Please select title"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl fullWidth sx={{ width: "1000px" }}>
              <InputLabel htmlFor="outlined-adornment-title">제목*</InputLabel>
              <OutlinedInput
                id="title"
                value={noticeOrEvent.title}
                type="text"
                onChange={titleHandleChange("title")}
                label="제목"
              />
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              sx={{ width: "1150px" }}
              id="content"
              value={noticeOrEvent.content}
              onChange={titleHandleChange("content")}
              label="content"
              multiline
              rows={20}
            />
          </Grid>
        </Grid>
        <Grid marginTop="5vh" gap="1025px" sx={{ display: "flex" }}>
          <Grid>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              variant="contained"
            >
              취소
            </Button>
          </Grid>
          <Grid>
            <Button onClick={onSubitHandler} variant="contained">
              작성
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default NoticeAndEventWrite;
