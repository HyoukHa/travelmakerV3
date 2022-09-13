/**
 * NoticeDetail.jsx - 공지 게시판
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSession } from "../../config/session/session";

const NoticeDetail = () => {
  const [noticeDetail, setNoticeDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    let i;
    for (i = 0; i < JSON.parse(getSession("noticeBoard")).length; i++) {
      if (id == JSON.parse(getSession("noticeBoard"))[i].id) {
        setNoticeDetail(JSON.parse(getSession("noticeBoard"))[i].id);
      }
    }
    console.log(noticeDetail);
    // axios
    //   .post(`/nonoticeboard/${id}`)
    //   .then((res) => {
    //     setNoticeDetail(res.data);
    //     console.log(res.data);
    //   })
    //   .catch();
  }, [noticeDetail]);
  return <div></div>;
};

export default NoticeDetail;
