import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import KakaoMap from "../common/components/map/KakaoMap";
import { getSession } from "../config/session/session";

const ReviewWriteBoard = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [write, setWrite] = useState({});
  const [imgSrc, setImgSrc] = React.useState([]);
  const [writeData, setWriteData] = useState({
    packageBoardId: 0,
    title: "",
    content: "",
    imgs: "",
  });
  let inputRef;
  const handleDataChange = (column) => (e) => {
    console.log("reviewwriteboard flag1");
    setWriteData({ ...writeData, [column]: e.target.value });
  };

  const selectvalue = (e) => {
    console.log("aaaa");
    setWrite(board.filter((item) => e.target.value === item.id)[0]);
  };

  useEffect(() => {
    console.log(write);
    setWriteData({ ...writeData, packageBoardId: write.id });
  }, [write]);

  const handleFileInput = (e) => {
    console.log("bbbb");
    const img = e.target.files[0];
    const formData = new FormData();
    // 업로드 할 값이 여러개로 for문을 사용하여
    // formData에 append를하여 RequestParam 값과 이미지값 저장
    formData.append("image", img);

    //이미지 전송하여 s3에 올리기
    axios
      .post("/profile/upload", formData)
      .then((res) => {
        setWriteData({ ...writeData, imgs: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePh = (e) => {
    setImgSrc();
  };

  useEffect(() => {
    axios({
      url: `/packageboard/joinpackage`,
      method: "get",
      headers: {
        Authorization: getSession("Authorization"),
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log("321321");
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((error) => {
        console.log("ccc");
        console.log(error);
      });
  }, []);
  useEffect(() => {}, [board, write, writeData, imgSrc]);

  const sendData = () => {
    axios({
      url: "/reviewboard/write",
      method: "post",
      data: writeData,
      headers: {
        Authorization: getSession("Authorization"),
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        console.log("iiii");
        console.log(res.data);
        navigate(`/board/review/detail/${res.data}`);
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
        <FormControl sx={{ width: "150px" }}>
          <TextField
            id="outlined-select-title"
            select
            label="title*"
            value={board.title}
            onChange={selectvalue}
            helperText="Please select package"
          >
            {board.map((item) => (
              <MenuItem key={item.title} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Typography fontWeight="bold" textAlign="center" variant="h5">
          {write.title}
        </Typography>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>비용 : {write.budget}</Typography>
          <Typography>기간 : {write.duration} 일</Typography>
        </div>
        <Divider />
        <Divider />
        <Divider />

        <Container>
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
          <Button variant="contained" component="label">
            파일 첨부
            <input
              type="file"
              accept="image/*"
              name="image"
              pattern="/(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/"
              onChange={handleFileInput}
              // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
              // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
              onClick={(e) => (e.target.value = null)}
              ref={(refParam) => (inputRef = refParam)}
              style={{ display: "none" }}
            />
          </Button>
          {/*===== 사용할거니까 지우지 말아주세요===================================================== */}
          <ImageList cols={8} sx={{ bgcolor: "black" }}>
            <ImageListItem>
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={deletePh}
                  >
                    <ClearIcon />
                  </IconButton>
                }
              />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={imgSrc} style={{ objectFit: "contain" }} />
            </ImageListItem>
          </ImageList>
          <Button variant="contained" onClick={sendData}>
            작성완료
          </Button>
        </Container>
      </Box>
    </Container>
  );
};

export default ReviewWriteBoard;
