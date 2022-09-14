import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../config/session/session";

const EventDetail = ({ eventPage, setEventPage = () => {} }) => {
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState([]);
  const [eventNum, setEventNum] = useState(0);
  // 이전글
  const [previousEvent, setPreviousEvent] = useState([]);
  // 다음글
  const [nextEvent, setNextEvent] = useState([]);

  const eventUpdateHandler = () => {
    navigate("/board/announcement/update/" + eventDetail.id + "/event");
  };
  const deleteHandler = () => {
    axios
      .post("/noticeandevent/delete", eventDetail.id, {
        headers: {
          Authorization: getSession("Authorization"),
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        console.log(res.status);
        setEventPage({ ...eventPage, detail: false });
      })
      .catch();
  };

  const nextNoticeHandler = () => {
    setEventPage({
      ...eventPage,
      boardId: nextEvent.id,
    });
  };

  const previousNoticeHandler = () => {
    setEventPage({
      ...eventPage,
      boardId: previousEvent.id,
    });
  };

  useEffect(() => {
    let i;
    setPreviousEvent([]);
    setNextEvent([]);
    for (i = 0; i < JSON.parse(getSession("eventBoard")).length; i++) {
      if (eventPage.boardId == JSON.parse(getSession("eventBoard"))[i].id) {
        setEventDetail(JSON.parse(getSession("eventBoard"))[i]);
        setEventNum(i);
        if (i - 1 >= 0) {
          setPreviousEvent(JSON.parse(getSession("eventBoard"))[i - 1]);
        }
        if (i + 1 < JSON.parse(getSession("eventBoard")).length) {
          setNextEvent(JSON.parse(getSession("eventBoard"))[i + 1]);
        }
        if (i - 1 < 0) {
          setPreviousEvent([]);
        }
        if (i + 1 > JSON.parse(getSession("eventBoard")).length) {
          setNextEvent([]);
        }
      }
    }
  }, [eventPage]);

  useEffect(() => {
    if (eventDetail.viewCount != null) {
      axios
        .post(
          `/noticeandevent/${eventPage.boardId}`,
          eventDetail.viewCount + 1,
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
  }, [eventDetail]);
  return (
    <Grid p={5} sx={{ display: "flex" }} container alignItems="center">
      <Grid item>
        <Typography component="div">
          <h2>{eventDetail.title}</h2>
        </Typography>
        <Grid sx={{ display: "flex" }} gap="10px" item>
          <Divider orientation="vertical" variant="middle" />
          <span>{eventDetail.written_date}</span>
          <span style={{ color: "#c2bdbd" }}>{"|"}</span>
          <span>{eventDetail.updated_date}</span>
          <span style={{ color: "#c2bdbd" }}>{"|"}</span>
          <span>{eventDetail.viewCount}</span>
        </Grid>
        <Divider
          sx={{ minHeight: "30px" }}
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <h4>{"[안내]"}</h4>
        </Divider>
        <Grid>
          <Typography component="div">{eventDetail.content}</Typography>
        </Grid>

        <Divider
          sx={{ minHeight: "30px" }}
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <h6>{"[목록]"}</h6>
        </Divider>
        {previousEvent.length != 0 ? (
          <Grid onClick={previousNoticeHandler}>
            <Button>이전</Button>
            <span>{previousEvent.title}</span>
          </Grid>
        ) : (
          <span></span>
        )}
        {nextEvent.length != 0 ? (
          <Grid onClick={nextNoticeHandler}>
            <Button>다음</Button>
            <span>{nextEvent.title}</span>
          </Grid>
        ) : (
          <span></span>
        )}
        {JSON.parse(getSession("userInfo")) !== null ? (
          JSON.parse(getSession("userInfo")).rank === 1 ? (
            <Grid marginTop="5vh" gap="80%" sx={{ display: "flex" }}>
              <Grid>
                <Button onClick={eventUpdateHandler} variant="contained">
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

export default EventDetail;
