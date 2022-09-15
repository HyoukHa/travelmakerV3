import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import {
  SignUp,
  Landing,
  MyPage,
  PackageBoard,
  WriteBoard,
  ReviewBoard,
  Manage,
} from "./index";

import { NotFoundPage } from "../common/index";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyInfoUpdate from "./MyInfoUpdate";
import PackageBoardDetail from "./PackageBoardDetail";
import FollowerList from "./follow/FollowerList";
import FollowingList from "./follow/FollowingList";
import Announcement from "../noti/components/Announcement";
import NoticeDetail from "../noti/components/NoticeDetail";
import Search from "./Search";
import NoticeAndEventWrite from "../noti/components/NoticeAndEventWrite";
import NoticeAndEventUpdate from "../noti/components/NoticeAndEventUpdate";

const PageRouter = () => {
  return (
    <>
      <div className="" css={cssWrapper}>
        <Routes>
          <Route exact path="/manage" element={<Manage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/user/:id" element={<MyPage />} />
          <Route exact path="/user/update" element={<MyInfoUpdate />} />
          <Route exact path="/user/follower/:id" element={<FollowerList />} />
          <Route exact path="/user/following/:id" element={<FollowingList />} />
          <Route
            exact
            path={`/board/package/detail/:boardId`}
            element={<PackageBoardDetail />}
          />
          <Route
            exact
            path="/board/package/:pagenum"
            element={<PackageBoard />}
          />
          <Route
            exact
            path="/board/review/:pagenum"
            element={<ReviewBoard />}
          />
          <Route
            exact
            path="/board/announcement/writed"
            element={<NoticeAndEventWrite />}
          />
          <Route
            exact
            path="/board/announcement/update/:id/:noticeAndEvent"
            element={<NoticeAndEventUpdate />}
          />
          <Route exact path="/board/package/write" element={<WriteBoard />} />
          <Route exact path="/board/review/write" element={<WriteBoard />} />
          <Route
            exact
            path="/board/announcement/notice"
            element={<Announcement pageNum={0} />}
          />
          <Route
            exact
            path="/board/announcement/event"
            element={<Announcement pageNum={1} />}
          />
          <Route exact path="/" element={<Landing />} />
          <Route path="/search/:param" element={<Search />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

const cssWrapper = css`
  padding: 80px 0 0 /* footer 높이만큼 패딩 주기 */ 0;
`;

export default PageRouter;
