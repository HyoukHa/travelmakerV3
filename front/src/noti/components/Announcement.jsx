import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar";

const Announcement = ({ pageNum }) => {
  const [pageCategory, setPageCategory] = useState(pageNum);
  const [detailPage, setDetailPage] = useState({
    detail: false,
    boardId: 0,
    pageNum: 0,
  });
  const [eventPage, setEventPage] = useState({
    detail: false,
    boardId: 0,
    pageNum: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (pageCategory == 0) {
      navigate("/board/announcement/notice");
    } else if (pageCategory == 1) {
      navigate("/board/announcement/event");
    }
  }, [pageCategory]);
  useEffect(() => {
    setDetailPage({ ...detailPage, detail: false, boardId: 0 });
    setEventPage({ ...eventPage, detail: false, boardId: 0 });
  }, [pageNum, pageCategory]);

  return (
    <div>
      <MenuBar
        pageNum={pageNum}
        pageCategory={pageCategory}
        setPageCategory={setPageCategory}
        eventPage={eventPage}
        setEventPage={setEventPage}
        detailPage={detailPage}
        setDetailPage={setDetailPage}
      />
    </div>
  );
};

export default Announcement;
