import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import NotiList from "./NotiList";
import EventList from "./EventList";
import { getSession } from "../../config/session/session";
import { Button } from "@mui/material";
import NoticeDetail from "./NoticeDetail";
import EventDetail from "./EventDetail";

const TabPanel = (TabPanelProps) => {
  const { children, value, index, ...other } = TabPanelProps;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const MenuBar = ({
  pageNum,
  setPageCategory = () => {},
  eventPage,
  setEventPage = () => {},
  detailPage,
  setDetailPage = () => {},
}) => {
  const navigate = useNavigate();
  // notice

  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(pageNum);
  }, [pageNum]);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  //작성하기 핸들러
  const notiBoardCreateHandler = () => {
    navigate("/board/announcement/writed");
  };

  useEffect(() => {}, []);
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            label="공지사항"
            onClick={() => {
              setPageCategory(0);
              setDetailPage({ ...detailPage, detail: false, boardId: 0 });
              setEventPage({ ...eventPage, detail: false, boardId: 0 });
            }}
          />
          <Tab
            label="이벤트"
            onClick={() => {
              setPageCategory(1);
              setDetailPage({ ...detailPage, detail: false, boardId: 0 });
              setEventPage({ ...eventPage, detail: false, boardId: 0 });
            }}
          />
        </Tabs>
        {detailPage.detail ? (
          <NoticeDetail detailPage={detailPage} setDetailPage={setDetailPage} />
        ) : (
          <TabPanel value={value} index={0}>
            <Typography p={3} component="div">
              공지사항
              {JSON.parse(getSession("userInfo")) !== null ? (
                JSON.parse(getSession("userInfo")).rank == 1 ? (
                  <Button
                    style={{ marginLeft: "5ch" }}
                    variant="contained"
                    onClick={notiBoardCreateHandler}
                  >
                    작성하기
                  </Button>
                ) : (
                  <p></p>
                )
              ) : (
                <p></p>
              )}
            </Typography>
            <Box>
              <NotiList detailPage={detailPage} setDetailPage={setDetailPage} />
            </Box>
          </TabPanel>
        )}
        {eventPage.detail ? (
          <EventDetail eventPage={eventPage} setEventPage={setEventPage} />
        ) : (
          <TabPanel value={value} index={1}>
            <Typography p={3} component="div">
              이벤트 &nbsp;&nbsp;&nbsp;
              {JSON.parse(getSession("userInfo")) !== null ? (
                JSON.parse(getSession("userInfo")).rank == 1 ? (
                  <Button
                    style={{ marginLeft: "5ch" }}
                    variant="contained"
                    onClick={notiBoardCreateHandler}
                  >
                    작성하기
                  </Button>
                ) : (
                  <p></p>
                )
              ) : (
                <p></p>
              )}
            </Typography>
            <EventList eventPage={eventPage} setEventPage={setEventPage} />
          </TabPanel>
        )}
      </Box>
    </div>
  );
};

export default MenuBar;
