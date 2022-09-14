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

const EventList = ({ eventPage, setEventPage = () => {} }) => {
  const category = 1;
  const [eventDatas, setEventData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/eventboard", category, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        setEventData(res.data);
        setSession("eventBoard", JSON.stringify(res.data));
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
          {eventDatas.map((eventData, index) => (
            <TableRow
              key={index}
              step={eventData}
              onClick={() => {
                setEventPage({
                  ...eventPage,
                  detail: true,
                  boardId: eventData.id,
                  pageNum: eventDatas.length - index,
                });
              }}
            >
              <TableCell />
              <TableCell width="100px" align="left">
                {index + 1}
                {/**글번호 */}
              </TableCell>
              <TableCell width="800px">
                {eventData.title}
                {/**제목 */}
              </TableCell>
              <TableCell width="200px" align="right">
                {eventData.nickname}
                {/**작성자 */}
              </TableCell>
              <TableCell width="200px" align="right">
                {eventData.written_date}
                {/**최초 작성일 */}
              </TableCell>
              <TableCell width="200px" align="right">
                {eventData.updated_date}
                {/**수정일 */}
              </TableCell>
              <TableCell width="100px" align="right">
                {eventData.viewCount}
                {/**조회수 */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventList;
