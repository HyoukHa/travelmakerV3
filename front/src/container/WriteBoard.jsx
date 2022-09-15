/**
 * WriteBoard.jsx - 글쓰기
 */
import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import KakaoMap from "../common/components/map/KakaoMap";
import MapSelectList from "../common/components/map/MapSelectList";
import { getSession } from "../config/session/session";

/**
 * steps <= 단계별 값들을 저장하는 곳
 */
const steps = ["경로 설정", "내용 작성"];

const WriteBoard = () => {
  //========================================
  const [isDetail, setisDetail] = React.useState(false);

  //================mapapi========================
  const [keyword, setKeyword] = React.useState("");
  // map list에서 클릭해서 받아온 값들을 저장하는 select state관리
  const [select, setSelect] = React.useState([]);
  console.log(select);
  // ==============Duration=======================
  // Duration만큼 안에 select 를 넣을 예정
  const [schedule, setSchedule] = React.useState([]);
  console.log("스케줄", schedule.length);
  const sendschdule = () => {
    setSchedule([...schedule, select]);
    setSelect([]);
  };
  // Duration 스케줄 일수를 정하는 STATE
  const [Duration, setDuration] = React.useState();
  console.log("duration", Duration);
  //Duration
  //==================================================================
  // 날짜 값을 관리하는 value
  const [value, setValue] = React.useState(dayjs("2022-10-26"));
  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  //===================================================================
  // img를 관리하는 state
  const [imgSrc, setImgSrc] = React.useState([]);

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
  //===============이미지 유효성 검사============================
  // const { register } = React.useForm();
  // const fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
  //==================================================
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  /** write data 타입들 map 데이터는 여러개가 들어갈 예정이기 때문에
   *  객체 배열로 선언해둠
   */
  const [writeData, setWriteData] = React.useState({
    title: "",
    content: "",
    MAXTO: "",
    budged: "",
  });

  const deletePh = (item) => (e) => {
    setImgSrc(imgSrc.filter((element) => element !== item));
  };

  const handleDataChange = (column) => (e) => {
    setWriteData({ ...writeData, [column]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const sendData = (e) => {
    e.preventDefault();
    // console.log("flag1");

    const scheduleData = schedule.map((item) => {
      return item.map((item2) => {
        return { x: item2.x, y: item2.y, addressName: item2.address_name };
      });
    });
    // 들어가야하는 데이터들
    console.log(
      "data 들이야 : ",
      Duration,
      schedule,
      imgSrc,
      writeData,
      value.$d
    );
    axios({
      url: "/packageboard/write",
      method: "post",
      data: {
        title: writeData.title,
        content: writeData.content,
        limit_to: parseInt(writeData.MAXTO),
        budget: parseInt(writeData.budged),
        duration: parseInt(Duration),
        imgs: imgSrc,
        // startdate: value.$y + "." + (value.$M + 1) + "." + value.$D,
        year: value.$y,
        month: value.$M,
        day: value.$D,
        schedule: JSON.stringify(scheduleData),
      },
      // value.$d
      headers: { Authorization: getSession("Authorization") },
    })
      .then((res) => {
        console.log(res.data);
        navigate("/board/package/1");
        return false;
      })
      .catch((error) => {
        console.log(error);
      });
    // return false;
  };

  return (
    <form onSubmit={sendData}>
      <Box className="container" sx={{ width: "100%" }}>
        <center>
          <Stepper activeStep={activeStep} sx={{ width: "50%" }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                //얕은 복사 stepProps라고 값을 보내줌
                <Step key={label} {...stepProps}>
                  {/* steps의 값들을 출력 */}
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </center>
        {/**
         * activeStep === steps.length이면 (finish button 클릭시)
         *  Finish 시에 navigate로 게시판으로 이동
         *  */}
        {activeStep === steps.length ? (
          navigate("/board/package")
        ) : (
          // , {state:
          //   { finish: true }}
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            {activeStep === 0 ? (
              <Box
                className="container"
                sx={{
                  backgroundColor: "pink",
                  minWidth: 300,
                  minHeight: 550,
                }}
              >
                <KakaoMap
                  isDetail={!isDetail}
                  select={select}
                  setKeyword={setKeyword}
                  keyword={keyword}
                  setSelect={setSelect}
                  Duration={Duration}
                  setDuration={setDuration}
                  schedule={schedule}
                  setSchedule={setSchedule}
                />
                <MapSelectList select={select} setSelect={setSelect} />

                <Button
                  onClick={sendschdule}
                  disabled={
                    schedule.length == Duration || Duration === undefined
                      ? true
                      : false
                  }
                >
                  {" "}
                  등록{" "}
                </Button>
              </Box>
            ) : activeStep === 1 ? (
              <Box
                className="container"
                sx={{
                  backgroundColor: "skyblue",
                  minWidth: 300,
                  minHeight: 650,
                }}
              >
                {/* 제목 */}
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
                {/* 날짜 */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="시작 일자"
                    inputFormat="YYYY/MM/DD"
                    disablePast
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* 최대 인원 */}
                <TextField
                  style={{ marginLeft: 5, marginRight: 5 }}
                  label="최대 인원"
                  value={writeData.MAXTO}
                  type={"number"}
                  onChange={handleDataChange("MAXTO")}
                />
                {/* 경비 */}
                <TextField
                  style={{ marginLeft: 5, marginRight: 5 }}
                  label="경비"
                  value={writeData.budged}
                  type={"number"}
                  onChange={handleDataChange("budged")}
                />
                {/* 사진 */}
                {/*===== 사용할거니까 지우지 말아주세요===================================================== */}
                <Button variant="contained" component="label">
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
                </Button>
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
                      <img
                        src={item}
                        style={{ objectFit: "contain", marginTop: "10px" }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            ) : (
              <Box />
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? (
                <Button
                // variant="contained"
                // onClick={handleNext}
                // type={"submit"}
                // form={"writedatas"}
                // onSubmit={sendData}
                >
                  <input
                    type={"submit"}
                    value={"Finish"}
                    style={{ background: `none`, border: `none` }}
                    height={`100%`}
                  />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  type={"button"}
                  disabled={
                    parseInt(Duration) !== schedule.length ? true : false
                  }
                >
                  Next
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </form>
  );
};

export default WriteBoard;
