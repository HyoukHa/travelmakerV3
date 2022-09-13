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

const EnventNoti = () => {
  const category = 1;
  const [notiDatas, setNotiData] = useState([]);
  const navigate = useNavigate();

  const noticeBoardHandler = () => {
    navigate("/board/announcement/noticeboard/:id");
  };

  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth());
  const day = String(date.getDay());
  const updatedDay = `${year}/${month}/${day}`;
  const writtenDay = `${year}/${month}/${day}`;
  useEffect(() => {
    axios
      .post("/eventboard", category, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        setNotiData(res.data);
        console.log(res.data);
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
            <TableRow key={index} step={notiData} onClick={noticeBoardHandler}>
              <TableCell />
              <TableCell width="100px" align="left">
                {index + 1}
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

export default EnventNoti;
