import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setSession } from "../../config/session/session";

const NotiList = ({ detailPage, setDetailPage = () => {} }) => {
  const category = 1;
  const [notiDatas, setNotiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/noticeboard", category, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        setNotiData(res.data);
        setSession("noticeBoard", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell width="100px" align="left">
              글 번호
            </TableCell>
            <TableCell width="800px">제목</TableCell>
            <TableCell width="200px" align="right">
              작성자
            </TableCell>
            <TableCell width="200px" align="right">
              게시일
            </TableCell>
            <TableCell width="200px" align="right">
              수정일
            </TableCell>
            <TableCell width="100px" align="right">
              조회수
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {notiDatas.map((notiData, index) => (
            <TableRow
              key={index}
              step={notiData}
              onClick={() => {
                setDetailPage({
                  ...detailPage,
                  detail: true,
                  boardId: notiData.id,
                  pageNum: notiDatas.length - index,
                });
              }}
            >
              <TableCell />
              <TableCell width="100px" align="left">
                {notiDatas.length - index}
                {/**글번호 */}
              </TableCell>
              <TableCell width="800px">
                {notiData.title}
                {/**제목 */}
              </TableCell>
              <TableCell width="200px" align="right">
                {notiData.nickname}
                {/**작성자 */}
              </TableCell>
              <TableCell width="200px" align="right">
                {notiData.written_date}
                {/**최초 작성일 */}
              </TableCell>
              <TableCell width="200px" align="right">
                {notiData.updated_date}
                {/**수정일 */}
              </TableCell>
              <TableCell width="100px" align="right">
                {notiData.viewCount}
                {/**조회수 */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default NotiList;
