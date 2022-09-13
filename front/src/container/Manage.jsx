/**
 * Manage -- 사용자 권한 변경 페이지
 * 관리자만 접속 가능하고, 사용자의 권한을 변경시켜줄 수 있다.
 */

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { getSession } from "../config/session/session";
import { useNavigate } from "react-router";
const Manage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const [change, setChange] = useState([]);

  const handleChange = (row) => (e) => {
    let isExist = false;
    if (change.length > 0) {
      change.map((item) => {
        console.log(item.id);
        if (item.id === row.id) {
          isExist = true;
        }
      });
    }

    if (!isExist) {
      setChange([...change, { id: row.id, rank: e.target.value }]);
    } else {
      setChange(
        change.map((item) => {
          if (item.id == row.id) {
            return { id: item.id, rank: e.target.value };
          } else {
            return item;
          }
        })
      );
    }

    setUserList(
      userList.map((item) => {
        if (row.id === item.id) {
          return {
            id: row.id,
            username: row.username,
            nickname: row.nickname,
            email: row.email,
            rank: e.target.value,
          };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {}, [userList]);

  useEffect(() => {
    console.log("change : ");
    console.log(change);
  }, [change]);

  useEffect(() => {
    if (JSON.parse(getSession("userInfo")).rank != 1) {
      navigate("/");
    } else {
      axios({
        method: "post",
        url: "/user/manage",
        headers: { Authorization: getSession("Authorization") },
      }).then((res) => {
        console.log(res.data);
        setUserList(res.data);
      });
    }
  }, []);

  const handleBtnClick = (info) => (e) => {
    if (info === "apply") {
      axios({
        url: "/user/manage/update",
        method: "post",
        data: change,
        headers: { Authorization: getSession("Authorization") },
      }).then((res) => {
        console.log(res.status);
        navigate(0);
      });
    } else if (info === "cancel") {
      navigate(-1);
    }
  };

  return (
    <div className="container" css={btnWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">username</TableCell>
              <TableCell align="left">nickname</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="right">rank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="hello">
            {userList.map((row) => (
              <TableRow
                key={row.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="left">{row.nickname}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="right">
                  <FormControl style={{ width: "200px" }}>
                    <InputLabel id="rank">rank</InputLabel>
                    <Select
                      labelId="rank"
                      id="rank"
                      value={row.rank}
                      label="rank"
                      onChange={handleChange(row)}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Packager</MenuItem>
                      <MenuItem value={3}>User</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="btn_area">
        <Button onClick={handleBtnClick("cancel")}>cancel</Button>
        <Button onClick={handleBtnClick("apply")}>apply</Button>
      </div>
    </div>
  );
};

const btnWrapper = css`
  margin-top: 50px;

  > .btn_area {
    float: right;
  }
`;

export default Manage;
