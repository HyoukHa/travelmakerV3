import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar";

const Announcement = ({ pageNum }) => {
  const [pageCategory, setPageCategory] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (pageCategory == 0) {
      navigate("/board/announcement/notice");
    } else if (pageCategory == 1) {
      navigate("/board/announcement/event");
    } else if (pageCategory == 2) {
      navigate("/board/announcement/qna");
    }
  }, [pageCategory]);

  return (
    <div>
      <MenuBar
        pageNum={pageNum}
        pageCategory={pageCategory}
        setPageCategory={setPageCategory}
      />
    </div>
  );
};

export default Announcement;
