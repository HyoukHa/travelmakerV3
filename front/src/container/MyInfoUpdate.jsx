import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormGroup,
  Grid,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../config/session/session";
import Uploader from "./UpLoader";

const style = {
  register: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    paddingBottom: "50px",
  },
  modal: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    paddingBottom: "50px",
    justifyContent: "center",
  },
  // 규격표기 폰트
  inputOutfont: {
    color: "green",
    paddingLeft: "10px",
    fontSize: "15px",
  },
  inputOutdiv: {
    display: "flex",
    height: "35px",
  },
  // 경고 규격 폰트
  inputOutfontDanger: {
    paddingLeft: "10px",
    color: " red",
  },
  inputOutDivDanger: {
    display: "flex",
  },
  cancellation: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 400,
    height: 150,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    paddingBottom: "50px",
    justifyContent: "center",
  },
  lastModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    paddingBottom: "50px",
    justifyContent: "center",
  },
};

const MyInfoUpdate = () => {
  useEffect(() => {
    axios
      .get("/user/whoami", {
        headers: { Authorization: getSession("Authorization") },
      })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch();
  }, []);
  const navigate = useNavigate();

  // 입력 및 뿌릴 데이터
  const [userInfo, setUserInfo] = useState({
    f_name: "",
    l_name: "",
    nickname: "",
    password: "",
    passwordChecker: "",
    rank: "",
    showPassword: false,
    passwordChange: false,
    email: "",
    gender: "",
    company_num: "",
    company_numCheck: false,
    src_photo: "",
    imgUpLoader: true,
  });

  // 중복 확인
  const [userCheck, setUserCheck] = useState({
    nickname: false,
  });

  // 유효성 확인
  const [validate, setValidate] = useState({
    password: true,
    passwordChecked: true,
    company_numCheck: true,
  });

  // 유효성 검사 식
  const validateSample = {
    passwordRegex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,255}$/,
    privateCompany_NumRegex: /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/,
    corporationCompany_NumRegex2: /^([0-9]{6})\-([0-9]{7})$/,
  };

  const [successInfo, setSuccessInfo] = useState({
    nickname: false,
    company_numCheck: false,
  });

  // 비밀번호 수정을 위한 onClick
  const onClickPasswordChange = () => {
    setUserInfo({ ...userInfo, passwordChange: !userInfo.passwordChange });
  };

  // 사업자 번호 입력을 위한 onClick
  const onClickCompanyNumCheck = () => {
    setUserInfo({ ...userInfo, company_numCheck: !userInfo.company_numCheck });
  };

  // 개인정보 수정 진행
  const [infoCreate, setInfoCreate] = useState(false);
  // 개인정보 수정 취소
  const [infoNotCreate, setInfoNotCreate] = useState(false);

  // 닉네임 중복검사
  const nicknameCheck = () => {
    axios
      .post(
        "/user/update/check/nickname",
        { nickname: userInfo.nickname },
        { headers: { Authorization: getSession("Authorization") } }
      )
      .then((res) => {
        setUserCheck({ ...userCheck, nickname: !res.data });
        setSuccessInfo({ ...successInfo, nickname: true });
        console.log(res.data);
      })
      .catch(() => {
        setSuccessInfo({ ...successInfo, nickname: false });
      });
  };

  // 개인정보 수정 전송
  const createUserHandler = () => {
    if (validate.password && validate.passwordChecked && validate.nickname) {
      setInfoCreate(false);
      axios
        .post("/user/update", userInfo, {
          headers: { Authorization: getSession("Authorization") },
        })
        .then((res) => {
          navigate(`/user/${userInfo.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setInfoCreate(true);
    }
  };

  // 정보 수정 미기입
  const lastCheckCloseModal = () => {
    setInfoCreate(false);
  };

  // 패스워드 유효성 검사 실행
  useEffect(() => {
    if (userInfo.password === "") {
      setValidate({ ...validate, password: true });
    } else {
      if (validateSample.passwordRegex.test(userInfo.password)) {
        setValidate({ ...validate, password: true });
      } else {
        setValidate({ ...validate, password: false });
      }
    }
  }, [userInfo.password]);

  // 회사 사업자 번호 유효성 검사
  useEffect(() => {
    if (userInfo.company_num == "" || userInfo.company_num == null) {
      setValidate({ ...validate, company_numCheck: true });
    } else if (
      validateSample.privateCompany_NumRegex.test(userInfo.company_num) ||
      validateSample.corporationCompany_NumRegex2.test(userInfo.company_num)
    ) {
      setValidate({ ...validate, company_numCheck: true });
    } else {
      setValidate({ ...validate, company_numCheck: false });
    }
  }, [userInfo.company_num]);

  // 패스워드 입력값이 같은지 확인 후 다르면 경고 메시지 출력
  useEffect(() => {
    if (userInfo.password === userInfo.passwordChecker) {
      setValidate({ ...validate, passwordChecked: true });
    } else if (userInfo.passwordChecker === "") {
      setValidate({ ...validate, passwordChecked: true });
    } else {
      setValidate({ ...validate, passwordChecked: false });
    }
  }, [userInfo.passwordChecker]);

  // 닉네임 유효성 검사
  useEffect(() => {
    setSuccessInfo({ ...successInfo, nickname: false });
    if (userInfo.nickname != "") {
      setValidate({ ...validate, nickname: true });
    } else {
      setValidate({ ...validate, nickname: false });
    }
  }, [userInfo.nickname]);

  // 입력값 받기
  const handleChange = (info) => (e) => {
    setUserInfo({ ...userInfo, [info]: e.target.value });
  };
  useEffect(() => { }, [userInfo]);
  // 패스워드의 입력 값을 확인하는 핸들러
  const handleClickShowPassword = () => {
    setUserInfo({
      ...userInfo,
      showPassword: !userInfo.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // 회원정보 수정 이전페이지로
  const noCreateUserHandler = () => {
    setInfoNotCreate(true);
  };
  // 취소하고 이전페이지로
  const noCreateInfo = () => {
    navigate("/user/mypage");
    // setInfoCreate(false);
  };
  // 회원정보 수정 다시 진행
  const noCreateCloseModal = () => {
    setInfoNotCreate(false);
  };

  return (
    <div style={{ margin: 50 }}>
      <Box sx={style.register}>
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          회원정보 수정
        </Typography>
        <FormGroup>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
          >
            <Uploader userInfo={userInfo} setUserInfo={setUserInfo} />
          </Box>
          {/**비밀번호 입력 */}
          {userInfo.company_numCheck ? (
            <Button
              style={{ marginTop: "5vh" }}
              variant="contained"
              onClick={onClickCompanyNumCheck}
            >
              판매자 등록 취소
            </Button>
          ) : (
            <Button
              style={{ marginTop: "5vh" }}
              variant="contained"
              onClick={onClickCompanyNumCheck}
            >
              판매자 등록
            </Button>
          )}
          {/**사업자 번호*/}
          {userInfo.company_numCheck ? (
            <div>
              <div style={(style.inputOutdiv, { marginTop: "5vh" })}>
                <p style={style.inputOutfont}>사업자 번호를 입력해주세요.</p>
              </div>
              <Grid container>
                <Grid sx={{ display: "flex", height: "auto" }}>
                  <FormControl
                    sx={{ m: 1, width: "30ch" }}
                    variant="outlined"
                    style={{ alignItems: "center" }}
                  >
                    <InputLabel htmlFor="outlined-adornment-company_num">
                      사업자번호*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="company_num"
                      name="company_num"
                      type="text"
                      value={userInfo.company_num}
                      onChange={handleChange("company_num")}
                      label="company_num"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {/**사업자 번호 확인 경고창*/}
              <div
                style={{
                  display: "flex",
                  height: "30px",
                  marginBottom: "20px",
                }}
              >
                {validate.company_numCheck ? (
                  userInfo.company_num === "" ? (
                    <p style={{ paddingLeft: "10px", color: " blue" }}>
                      사용 가능한 사업자번호입니다.
                    </p>
                  ) : (
                    <p>&nbsp;</p>
                  )
                ) : (
                  <p style={style.inputOutfontDanger}>
                    형식에 맞게 입력해주세요.
                  </p>
                )}
              </div>
            </div>
          ) : null}
          {/**비밀번호 입력 */}
          {userInfo.passwordChange ? (
            <Button
              style={{ marginTop: "5vh" }}
              variant="contained"
              onClick={onClickPasswordChange}
            >
              비밀번호 변경 취소
            </Button>
          ) : (
            <Button
              style={{ marginTop: "5vh" }}
              variant="contained"
              onClick={onClickPasswordChange}
            >
              비밀번호 변경
            </Button>
          )}
          {userInfo.passwordChange ? (
            <div>
              <div style={style.inputOutdiv}>
                <p style={style.inputOutfont}>
                  숫자 + 영문자 + 특수문자를 포함하여 8자리이상 입력해주세요.
                </p>
              </div>
              <FormControl
                sx={{ m: 1, width: "30ch" }}
                variant="outlined"
                style={{ alignItems: "center" }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password*
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={userInfo.showPassword ? "text" : "password"}
                  value={userInfo.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {userInfo.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {/**비밀번호 경고창*/}
              <div style={{ display: "flex" }}>
                {validate.password ? (
                  <p>&nbsp;</p>
                ) : (
                  <p style={style.inputOutfontDanger}>
                    형식에 맞게 입력해주세요.
                  </p>
                )}
              </div>

              {/**비밀번호 확인 입력 */}
              <div style={style.inputOutdiv}>
                <p style={style.inputOutfont}>
                  비밀번호를 다시한번 입력해주세요.
                </p>
              </div>
              <FormControl
                sx={{ m: 1, width: "30ch" }}
                variant="outlined"
                style={{ alignItems: "center" }}
              >
                <InputLabel htmlFor="outlined-adornment-passwordChecker">
                  PasswordCheck*
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-passwordChecker"
                  type={userInfo.showPassword ? "text" : "password"}
                  value={userInfo.passwordChecker}
                  onChange={handleChange("passwordChecker")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle passwordChecker visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {userInfo.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="PasswordChecker"
                />
              </FormControl>
              {/**비밀번호 확인 경고창*/}
              <div style={{ display: "flex" }}>
                {validate.passwordChecked ? (
                  <p>&nbsp;</p>
                ) : (
                  <p style={style.inputOutfontDanger}>
                    비밀번호를 확인해 주세요
                  </p>
                )}
              </div>
            </div>
          ) : null}
          {/**이름 */}
          <Grid
            container
            style={
              userInfo.passwordChange
                ? { marginTop: "0vh" }
                : { marginTop: "5vh" }
            }
          >
            <Grid sx={{ display: "flex", height: "auto" }}>
              <FormControl
                sx={{ m: 1, width: "15ch" }}
                variant="outlined"
                style={{ alignItems: "center" }}
              >
                <InputLabel htmlFor="outlined-adornment-name">이름</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="name"
                  name="name"
                  type="text"
                  value={userInfo.l_name + userInfo.f_name}
                  onChange={handleChange("name")}
                  label="name"
                  disabled
                />
                <InputLabel htmlFor="outlined-adornment-name"></InputLabel>
              </FormControl>
            </Grid>
          </Grid>
          <div style={(style.inputOutdiv, { marginTop: "5vh" })}>
            <p style={style.inputOutfont}>성별을 입력해주세요.</p>
          </div>
          <Grid container>
            <Grid sx={{ display: "flex", height: "auto" }}>
              <FormControl
                sx={{ m: 1, width: "15ch" }}
                variant="outlined"
                style={{ alignItems: "center" }}
              >
                <InputLabel id="demo-simple-select-gender">성별</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-gender"
                  id="gender"
                  name="gender"
                  value={userInfo.gender || ""}
                  label="gender"
                  onChange={handleChange("gender")}
                >
                  <MenuItem selected value={""}>
                    <em>미정</em>
                  </MenuItem>
                  <MenuItem value={1}>남성</MenuItem>
                  <MenuItem value={0}>여성</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/**닉네임 입력 */}
          <div style={(style.inputOutdiv, { marginTop: "5vh" })}>
            <p style={style.inputOutfont}>변경하실 닉네임을 입력해주세요.</p>
          </div>
          <Grid container>
            <Grid sx={{ display: "flex", height: "auto" }}>
              <FormControl
                sx={{ m: 1, width: "30ch" }}
                variant="outlined"
                style={{ alignItems: "center" }}
              >
                <InputLabel htmlFor="outlined-adornment-nickname">
                  닉네임*
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={userInfo.nickname}
                  onChange={handleChange("nickname")}
                  label="nickname"
                />
              </FormControl>
              <Button
                sx={{ width: "10ch", height: "7ch", m: 1 }}
                variant="contained"
                onClick={nicknameCheck}
                style={{ padding: 8 }}
              >
                중복확인
              </Button>
            </Grid>
          </Grid>
          {/**닉네임 확인 경고창*/}
          <div
            style={{ display: "flex", height: "30px", marginBottom: "20px" }}
          >
            {validate.nickname ? (
              !userCheck.nickname ? (
                !successInfo.nickname ? (
                  <p>&nbsp;</p>
                ) : (
                  <p style={{ paddingLeft: "10px", color: " blue" }}>
                    사용 가능한 닉네임입니다.
                  </p>
                )
              ) : (
                <p style={style.inputOutfontDanger}>
                  이미 존재하는 닉네임입니다.
                </p>
              )
            ) : (
              <p style={style.inputOutfontDanger}>형식에 맞게 입력해주세요.</p>
            )}
          </div>
          {/**이메일 입력 */}
          <Grid sx={{ display: "flex", height: "auto" }}>
            <FormControl
              sx={{ m: 1, width: "30ch" }}
              variant="outlined"
              style={{ alignItems: "center" }}
            >
              <InputLabel htmlFor="outlined-adornment-email">이메일</InputLabel>
              <OutlinedInput
                fullWidth
                id="email"
                name="email"
                type="text"
                value={userInfo.email}
                onChange={handleChange("email")}
                label="email"
                disabled
              />
            </FormControl>
          </Grid>
          <Box justifyContent="center" alignItems="center" minHeight="10vh">
            <Grid display="flex" gap="15ch">
              <Grid style={{ paddingLeft: "40px" }}>
                <Button
                  variant="contained"
                  style={{ marginTop: "10px" }}
                  onClick={noCreateUserHandler}
                >
                  취소하기
                </Button>
                <Modal
                  style={{ overflowY: "scroll" }}
                  open={infoNotCreate}
                  onClose={noCreateCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style.cancellation}>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ textAlign: "center" }}
                    >
                      정말로 취소하시겠습니까?
                    </Typography>
                    <Box
                      justifyContent="center"
                      alignItems="center"
                      minHeight="10vh"
                    >
                      <Grid display="flex" gap="5ch">
                        <Button
                          variant="contained"
                          style={{ marginTop: "10px" }}
                          onClick={noCreateInfo}
                        >
                          네
                        </Button>
                        <Button
                          variant="contained"
                          style={{ marginTop: "10px", marginLeft: "160px" }}
                          onClick={noCreateCloseModal}
                        >
                          아니오
                        </Button>
                      </Grid>
                    </Box>
                  </Box>
                </Modal>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  onClick={createUserHandler}
                  style={{ marginTop: "10px", marginLeft: "40px" }}
                >
                  정보수정
                </Button>
                <Modal
                  style={{ overflowY: "scroll" }}
                  open={infoCreate}
                  onClose={lastCheckCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style.lastModal}>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ textAlign: "center" }}
                    >
                      작성을 완료해 주시기 바랍니다.
                    </Typography>
                    <Box>
                      <Box style={{ paddingLeft: "43%" }}>
                        <Button
                          variant="contained"
                          style={{ marginTop: "10px" }}
                          onClick={lastCheckCloseModal}
                        >
                          확인
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </Grid>
            </Grid>
          </Box>
        </FormGroup>
      </Box>
    </div>
  );
};

export default MyInfoUpdate;
