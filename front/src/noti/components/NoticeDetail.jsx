/**
 * NoticeDetail.jsx - 공지 게시판
 */
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../config/session/session";

const NoticeDetail = ({ detailPage, setDetailPage = () => {} }) => {
  const navigate = useNavigate();
  const [noticeDetail, setNoticeDetail] = useState([]);
  const [noticeNum, setNoticeNum] = useState(0);
  // 이전글
  const [previousNotice, setPreviousNotice] = useState([]);
  // 다음글
  const [nextNotice, setnextNotice] = useState([]);

  const noticeUpdateHandler = () => {
    navigate("/board/announcement/update/" + noticeDetail.id + "/notice");
  };

  const deleteHandler = () => {
    axios
      .post("/noticeandevent/delete", noticeDetail.id, {
        headers: {
          Authorization: getSession("Authorization"),
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        console.log(res.status);
        setDetailPage({ ...detailPage, detail: false });
      })
      .catch();
  };

  const nextNoticeHandler = () => {
    setDetailPage({
      ...detailPage,
      boardId: nextNotice.id,
    });
  };

  const previousNoticeHandler = () => {
    setDetailPage({
      ...detailPage,
      boardId: previousNotice.id,
    });
  };

  useEffect(() => {
    let i;
    setPreviousNotice([]);
    setnextNotice([]);
    for (i = 0; i < JSON.parse(getSession("noticeBoard")).length; i++) {
      if (detailPage.boardId == JSON.parse(getSession("noticeBoard"))[i].id) {
        setNoticeDetail(JSON.parse(getSession("noticeBoard"))[i]);
        setNoticeNum(i);
        if (i - 1 >= 0) {
          setPreviousNotice(JSON.parse(getSession("noticeBoard"))[i - 1]);
        }
        if (i + 1 < JSON.parse(getSession("noticeBoard")).length) {
          setnextNotice(JSON.parse(getSession("noticeBoard"))[i + 1]);
        }
        if (i - 1 < 0) {
          setPreviousNotice([]);
        }
        if (i + 1 > JSON.parse(getSession("noticeBoard")).length) {
          setnextNotice([]);
        }
      }
    }
  }, [detailPage]);

  useEffect(() => {
    if (noticeDetail.viewCount != null) {
      axios
        .post(
          `/noticeandevent/${detailPage.boardId}`,
          noticeDetail.viewCount + 1,
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        )
        .then((res) => {
          console.log(res.status);
        })
        .catch();
    }
  }, [noticeDetail]);

  return (
    <Grid p={5} sx={{ display: "flex" }} container alignItems="center">
      <Grid item>
        <Typography component="div">
          <h2>{noticeDetail.title}</h2>
        </Typography>
        <Grid sx={{ display: "flex" }} gap="10px" item>
          <Divider orientation="vertical" variant="middle" />
          <span>{noticeDetail.written_date}</span>
          <span style={{ color: "#c2bdbd" }}>{"|"}</span>
          <span>{noticeDetail.updated_date}</span>
          <span style={{ color: "#c2bdbd" }}>{"|"}</span>
          <span>{noticeDetail.viewCount}</span>
        </Grid>
        <Divider
          sx={{ minHeight: "30px" }}
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <h4>{"[안내]"}</h4>
        </Divider>
        <Grid>
          <Typography component="div">{noticeDetail.content}</Typography>
        </Grid>

        <Divider
          sx={{ minHeight: "30px" }}
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <h6>{"[목록]"}</h6>
        </Divider>
        {previousNotice.length != 0 ? (
          <Grid onClick={previousNoticeHandler}>
            <Button>이전</Button>
            <span>{previousNotice.title}</span>
          </Grid>
        ) : (
          <span></span>
        )}
        {nextNotice.length != 0 ? (
          <Grid onClick={nextNoticeHandler}>
            <Button>다음</Button>
            <span>{nextNotice.title}</span>
          </Grid>
        ) : (
          <span></span>
        )}
        {JSON.parse(getSession("userInfo")) !== null ? (
          JSON.parse(getSession("userInfo")).rank === 1 ? (
            <Grid marginTop="5vh" gap="80%" sx={{ display: "flex" }}>
              <Grid>
                <Button onClick={noticeUpdateHandler} variant="contained">
                  수정
                </Button>
              </Grid>
              <Grid>
                <Button onClick={deleteHandler} variant="contained">
                  삭제
                </Button>
              </Grid>
            </Grid>
          ) : (
            <p></p>
          )
        ) : (
          <p></p>
        )}
      </Grid>
    </Grid>
  );
};

export default NoticeDetail;
