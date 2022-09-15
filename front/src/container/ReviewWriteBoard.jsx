import {
  Box,
  Container,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import KakaoMap from "../common/components/map/KakaoMap";
import { getSession } from "../config/session/session";

const ReviewWriteBoard = ({ userId }) => {
  const [board, setBoard] = useState({});
  const [mapstep, setMapstep] = useState(0);
  const [isDetail, setisDetail] = useState(false);
  const { boardId } = useParams();
  const [mapDay, setMapDay] = useState(0);
  const [imgSrc, setImgSrc] = React.useState([]);
  let maxstep = 0;

  const [writeData, setWriteData] = useState({
    title: "",
    content: "",
  });
  const handleDataChange = (column) => (e) => {
    setWriteData({ ...writeData, [column]: e.target.value });
  };
  const daychange = (e) => {
    setMapDay(e.target.value);
    console.log("지금 있는곳", e.target.value);
  };
  const handleImgUpload = (e) => {
    // 이미지 값들 저장
    const nowSelectImgList = e.target.files;
    console.log(nowSelectImgList);
    // formData 선언
    const formData = new FormData();
    // 업로드 할 값이 여러개로 for문을 사용하여
    // formData에 append를하여 RequestParam 값과 이미지값 저장
    for (let i = 0; i < nowSelectImgList.length; i++) {
      formData.append("multiPratFile", nowSelectImgList[i]);
    }
    console.log("1" + nowSelectImgList);
    console.log("2" + formData);

    //이미지 전송하여 s3에 올리기
    axios
      .post("/board/upload", formData)
      .then((res) => {
        console.log(res.FormData);
        console.log(res.data, res.status);
        setImgSrc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePh = (item) => (e) => {
    setImgSrc(imgSrc.filter((element) => element !== item));
  };
  useEffect(() => {
    axios({
      url: `/reviewboard/detail/${boardId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log("321321");
        console.log(res.data);
        setBoard({ ...res.data, location: JSON.parse(res.data.location) });
        setMapstep(maxstep);
        console.log(mapstep);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [boardId]);
  const sendData = (e) => {
    axios({
      url: "/reviewboard/write",
      method: "post",
      data: {
        title: writeData.title,
        content: writeData.content,
        boardId: boardId,
        // imgurl: imgSrc,
      },
      headers: { Authorization: getSession("Authorization") },
    })
      .then((res) => {
        console.log(res.data);
        Navigate("/board/review/1");
        return false;
      })
      .catch((error) => {
        console.log(error);
      });
    // return false;
  };

  return (
    <Container>
      <Box mt="59px" maxWidth="700px" mx="auto">
        <Typography fontWeight="bold" textAlign="center" variant="h5">
          {board.title}
        </Typography>
        <Divider />
        <Divider />
        <Typography>작성자 : {board.nickname}</Typography>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>비용 : {board.budget}</Typography>
          <Typography>기간 : {board.duration} 일</Typography>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>조회수 : {board.viewCount}</Typography>
          <Typography>작성일 : {board.written_date}</Typography>
        </div>
        <Divider />
        <Divider />

        <Container>
          <select name="steps" onChange={daychange} defaultValue={0}>
            {Object.keys(board).length != 0
              ? board.location.map((item, index) => {
                  // console.log("here");
                  // console.log(item);
                  // maxstep = index;
                  // console.log("max", maxstep);
                  return (
                    <option
                      key={index}
                      value={index}
                      // onChange={selectvalue}
                    >
                      {index + 1} 일차
                    </option>
                  );
                })
              : null}
          </select>
          <KakaoMap
            isDetail={isDetail}
            board={board.location}
            maxstep={maxstep}
            mapDay={mapDay}
          />
          <TextField
            fullWidth
            style={{ marginTop: 5 }}
            label="제목"
            id="fullWidth"
            value={writeData.title}
            onChange={handleDataChange("title")}
          />
          {/* 내용 */}
          <TextField
            fullWidth
            style={{
              marginTop: 5,
              marginBottom: 10,
            }}
            label="내용"
            id="fullWidth"
            value={writeData.content}
            onChange={handleDataChange("content")}
            sx={{
              "& .MuiInputBase-root": {
                height: 300,
              },
            }}
          />
          {/* 사진 */}
          {/*===== 사용할거니까 지우지 말아주세요===================================================== */}
          {/* <Button variant="contained" component="label">
                   파일 첨부
                   <input
                     type="file"
                     accept="image/*"
                     name="imgfile"
                     required="이미지 파일이 아닙니다."
                     pattern="/(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/"
                     multiple="multiple"
                     hidden
                     onChange={handleImgUpload}
                   />
                 </Button> */}
          {/*===== 사용할거니까 지우지 말아주세요===================================================== */}
          <ImageList cols={8} sx={{ bgcolor: "black" }}>
            {imgSrc.map((item, index) => (
              <ImageListItem key={index}>
                <ImageListItemBar
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      onClick={deletePh(item)}
                    >
                      <ClearIcon />
                    </IconButton>
                  }
                />
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={item} style={{ objectFit: "contain" }} />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Box>
    </Container>
  );
};

export default ReviewWriteBoard;
