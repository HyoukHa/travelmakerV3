import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSession } from "../../config/session/session";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overlay: {
    backgroundColor: "rgba(49,92,38,0.7)",
  },
  inputOutfontDanger: {
    paddingLeft: "10px",
    color: " red",
  },
};

const NoticeAndEventUpdate = () => {
  const regex = /^[0-9~!@#$%";'^,&*()_+|</>=>`?:{[\}/^\s+|\s+$]/;

  const [open, setOpen] = useState(false);
  // 경고 창 닫기
  const closeModal = () => {
    setOpen(false);
  };
  const { id, noticeAndEvent } = useParams();
  const navigate = useNavigate();
  const currencies = [
    { value: "공지사항 | ", label: "공지" },
    { value: "이벤트 | ", label: "Event" },
  ];
  const [title, setTitle] = useState("");
  const [noticeOrEvent, setNoticeOrEvent] = useState({
    id: 0,
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
  };
  useEffect(() => {
    if (!regex.test(noticeOrEvent.title)) {
      setLastNoticeOrEvent({
        ...lastNoticeOrEvent,
        id: noticeOrEvent.id,
        title: title + noticeOrEvent.title,
        content: noticeOrEvent.content,
        imgs: noticeOrEvent.imgs,
      });
    } else {
      setOpen(true);
    }
  }, [noticeOrEvent]);
  useEffect(() => {}, [lastNoticeOrEvent]);

  useEffect(() => {
    let i;

    if (noticeAndEvent == "notice") {
      for (i = 0; i < JSON.parse(getSession("noticeBoard")).length; i++) {
        if (id == JSON.parse(getSession("noticeBoard"))[i].id) {
          setNoticeOrEvent({
            ...noticeOrEvent,
            id: JSON.parse(getSession("noticeBoard"))[i].id,
            title: JSON.parse(getSession("noticeBoard"))[i].title.replace(
              "공지사항 | ",
              ""
            ),
            content: JSON.parse(getSession("noticeBoard"))[i].content,
            imgs: JSON.parse(getSession("noticeBoard"))[i].imgs,
          });
        }
      }
    } else if (noticeAndEvent == "event") {
      for (i = 0; i < JSON.parse(getSession("eventBoard")).length; i++) {
        if (id == JSON.parse(getSession("eventBoard"))[i].id) {
          setNoticeOrEvent({
            ...noticeOrEvent,
            id: JSON.parse(getSession("eventBoard"))[i].id,
            title: JSON.parse(getSession("eventBoard"))[i].title.replace(
              "이벤트 | ",
              ""
            ),
            content: JSON.parse(getSession("eventBoard"))[i].content,
            imgs: JSON.parse(getSession("eventBoard"))[i].imgs,
          });
        }
      }
    }
  }, [id]);
  const onSubitHandler = () => {
    if (title == "공지사항 | " || title == "이벤트 | ") {
      axios
        .post(`/noticeandevent/update/${id}`, lastNoticeOrEvent, {
          headers: {
            Authorization: getSession("Authorization"),
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          console.log(res.status);
          if (title == "공지사항 | ") {
            navigate("/board/announcement/notice");
          } else if (title == "이벤트 | ") {
            navigate("/board/announcement/event");
          } else {
            setOpen(true);
          }
        })
        .catch();
    } else {
      setOpen(true);
    }
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
          <Grid sx={{ marginTop: "10px" }}>
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
              수정
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={closeModal}
        //  이것은 모달 창을 만들때 외부를 클릭하면 꺼지도록 해주는 기능입니다.
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            component="h4"
            variant="h5"
            style={{ textAlign: "center", color: "red" }}
          >
            <p>공지사항과 이벤트를 선택해주세요.</p>
            <p>제목과 내용을 입력해주세요.</p>
            <p>제목 앞에 숫자 혹은 특수 문자가 올 수 없습니다.</p>
          </Typography>
          <Grid item xs style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={closeModal}
            >
              확인
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default NoticeAndEventUpdate;
