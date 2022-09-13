/**
 * SignUp.jsx - 회원가입
 *
 * 작성자 : 이창주 (LeeDaRo <pokl001@naver.com> )
 * 작성일 : 22_08_22
 */

import React, {useEffect, useState} from "react";
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
  Checkbox,
  FormGroup,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import Consent from "./Consent";
import {useNavigate} from "react-router-dom";
import {setSession} from "../config/session/session";

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

const SignUp = () => {
  const navigate = useNavigate();

  // 입력받을 데이터
  const [userInfo, setUserInfo] = useState({
    username: "",
    nickname: "",
    password: "",
    passwordChecker: "",
    f_name: "",
    l_name: "",
    email: "",
    code: "",
    showPassword: false,
  });

  // 중복 확인
  const [userCheck, setUserCheck] = useState({
    username: false,
    nickname: false,
    email: false,
    code: false,
  });

  // 유효성 확인
  const [validate, setValidate] = useState({
    username: true,
    nameCheck: true,
    password: true,
    nickname: true,
    passwordChecked: true,
    email: true,
  });

  // 유효성 검사 식
  const validateSample = {
    passwordRegex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,255}$/,
    usernameRegex: /^[A-Za-z0-9+]{5,}$/,
    emailRegex:
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  };

  const [successInfo, setSuccessInfo] = useState({
    username: false,
    nickname: false,
  });

  const [mailCode, setMailCode] = useState("");
  // 모달
  const [certified, setCertified] = useState(false);
  // 회원가입 진행
  const [infoCreate, setInfoCreate] = useState(false);
  // 회원가입 취소
  const [infoNotCreate, setInfoNotCreate] = useState(false);
  // 이메일 인증 확인
  const [emailSuccess, setEmailSuccess] = useState(false);

  // 개인정보 활용 약관 동의 확인
  const [checked, setChecked] = useState(false);
  const handleCheckBox = (e) => {
    setChecked(e.target.checked);
  };

  // 개인정보 동의 활용 약관 펼치기
  const [consentOpen, setConsentOpen] = useState(false);
  const consentOnClick = () => {
    setConsentOpen(true);
  };
  // 개인정보 동의 활용 약관 닫기
  const closeModal = () => {
    setConsentOpen(false);
    setChecked(true);
  };
  const handleClose = () => {
    setConsentOpen(false);
  };

  // 아이디 중복검사
  const usernameCheck = () => {
    axios
      .post("/user/check/username", {username: userInfo.username})
      .then((res) => {
        // 존재하면 false, 존재하지 않으면 true로 변환함
        setUserCheck({...userCheck, username: !res.data});
        setSuccessInfo({...successInfo, username: true});
      })
      .catch(() => {
        setSuccessInfo({...successInfo, username: false});
      });
  };

  // 닉네임 중복검사
  const nicknameCheck = () => {
    axios
      .post("/user/check/nickname", {nickname: userInfo.nickname})
      .then((res) => {
        setUserCheck({...userCheck, nickname: !res.data});
        setSuccessInfo({...successInfo, nickname: true});
        console.log(res.data);
      })
      .catch(() => {
        setSuccessInfo({...successInfo, nickname: false});
      });
  };

  // 이메일 인증 핸들러
  const emailCheckHandler = (e) => {
    e.preventDefault();
    setCertified(true);
    // 중복검사 이메일 인증 전송 및 코드창 열기
    axios
      .post("/mail/check/email", {email: userInfo.email})
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        if (res.status === 200) {
          setUserCheck({...userCheck, email: true});
          setMailCode(String(res.data));
        }
      })
      .catch(() => {
        setCertified(false);
      });
  };

  // 회원가입 전송
  const createUserHandler = () => {
    if (
      validate.password &&
      validate.passwordChecked &&
      validate.username &&
      validate.email &&
      certified &&
      validate.nameCheck &&
      validate.nickname &&
      checked &&
      emailSuccess
    ) {
      setInfoCreate(false);
      axios
        .post("/user/signup", {...userInfo, rank: 3})
        .then((res) => {
          setSession("Authorization", res.data.token);
          navigate("/");
        })
        .catch((error) => {
          console.log("flag1");
          console.log(error);
        });
    } else {
      setInfoCreate(true);
    }
  };

  // 회원가입 미기입 or 미인증 안내 모달
  const lastCheckCloseModal = () => {
    setInfoCreate(false);
  };

  // 아이디 유효성 검사 실행
  useEffect(() => {
    setSuccessInfo(false);
    if (userInfo.username == "") {
      setValidate({...validate, username: true});
    } else if (userInfo.username.length < 5) {
      setValidate({...validate, username: false});
    } else if (!validateSample.usernameRegex.test(userInfo.username)) {
      setValidate({...validate, username: false});
    } else {
      setValidate({...validate, username: true});
    }
    setUserCheck({...userCheck, username: false});
  }, [userInfo.username]);

  // 패스워드 유효성 검사 실행
  useEffect(() => {
    if (userInfo.password === "") {
      setValidate({...validate, password: true});
    } else {
      if (validateSample.passwordRegex.test(userInfo.password)) {
        setValidate({...validate, password: true});
      } else {
        setValidate({...validate, password: false});
      }
    }
  }, [userInfo.password]);

  // 패스워드 입력값이 같은지 확인 후 다르면 경고 메시지 출력
  useEffect(() => {
    if (userInfo.password === userInfo.passwordChecker) {
      setValidate({...validate, passwordChecked: true});
    } else if (userInfo.passwordChecker === "") {
      setValidate({...validate, passwordChecked: true});
    } else {
      setValidate({...validate, passwordChecked: false});
    }
  }, [userInfo.passwordChecker]);

  // 이름 유효성 검사
  useEffect(() => {
    if (userInfo.f_name === "") {
      setValidate({...validate, nameCheck: false});
    } else if (userInfo.l_name === "") {
      setValidate({...validate, nameCheck: false});
    } else {
      setValidate({...validate, nameCheck: true});
    }
  }, [userInfo.f_name, userInfo.l_name]);

  // 닉네임 유효성 검사
  useEffect(() => {
    setSuccessInfo({...successInfo, nickname: false});
    if (userInfo.nickname != "") {
      setValidate({...validate, nickname: true});
    } else {
      setValidate({...validate, nickname: false});
    }
  }, [userInfo.nickname]);

  // 이메일 형식 유효성 검사
  useEffect(() => {
    if (validateSample.emailRegex.test(userInfo.email)) {
      setValidate({...validate, email: true});
    } else if (userInfo.email === "") {
      setValidate({...validate, email: true});
    } else {
      setValidate({...validate, email: false});
    }
  }, [userInfo.email]);

  // 입력값 받기
  const handleChange = (info) => (e) => {
    setUserInfo({...userInfo, [info]: e.target.value});
  };

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

  const emailCheckedHandler = () => {
    if (mailCode === userInfo.code) {
      setEmailSuccess(true);
    } else {
      setEmailSuccess(false);
    }
  };

  // 회원가입 이전페이지로
  const noCreateUserHandler = () => {
    setInfoNotCreate(true);
  };
  // 취소하고 이전페이지로
  const noCreateInfo = () => {
    navigate("/");
    // setInfoCreate(false);
  };
  // 회원가입 다시 진행
  const noCreateCloseModal = () => {
    setInfoNotCreate(false);
  };

  return (
    <div style={{margin: 50}}>
      <Box sx={style.register}>
        <Typography component="h1" variant="h5" style={{textAlign: "center"}}>
          회원가입
        </Typography>
        {/**아이디 입력 */}
        <FormGroup>
          <div style={style.inputOutdiv}>
            <p style={style.inputOutfont}>5자이상 입력해주세요</p>
          </div>
          <Grid container>
            <Grid item sx={{display: "flex", height: "auto"}}>
              <FormControl
                sx={{m: 1, width: "30ch"}}
                variant="outlined"
                style={{alignItems: "center"}}
              >
                <InputLabel htmlFor="outlined-adornment-id">ID*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="username"
                  name="username"
                  type="text"
                  value={userInfo.username}
                  onChange={handleChange("username")}
                  label="ID"
                />
              </FormControl>
              <Button
                sx={{width: "10ch", height: "7ch", m: 1}}
                variant="contained"
                onClick={usernameCheck}
                style={{padding: 8}}
              >
                중복확인
              </Button>
            </Grid>
          </Grid>
          {/**아이디 확인 경고창*/}
          <div style={{display: "flex", height: "30px", marginBottom: "20px"}}>
            {validate.username ? (
              !userCheck.username ? (
                !successInfo.username ? (
                  <p>&nbsp;</p>
                ) : (
                  <p style={{paddingLeft: "10px", color: " blue"}}>
                    사용 가능한 아이디입니다.
                  </p>
                )
              ) : (
                <p style={style.inputOutfontDanger}>
                  {" "}
                  이미 존재하는 아이디입니다.
                </p>
              )
            ) : (
              <p style={style.inputOutfontDanger}>형식에 맞게 입력해주세요.</p>
            )}
          </div>

          {/**비밀번호 입력 */}
          <div style={style.inputOutdiv}>
            <p style={style.inputOutfont}>
              숫자 + 영문자 + 특수문자를 포함하여 8자리이상 입력해주세요.
            </p>
          </div>
          <FormControl
            sx={{m: 1, width: "30ch"}}
            variant="outlined"
            style={{alignItems: "center"}}
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
                    {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {/**비밀번호 경고창*/}
          <div style={{display: "flex"}}>
            {validate.password ? (
              <p>&nbsp;</p>
            ) : (
              <p style={style.inputOutfontDanger}>형식에 맞게 입력해주세요.</p>
            )}
          </div>

          {/**비밀번호 확인 입력 */}
          <div style={style.inputOutdiv}>
            <p style={style.inputOutfont}>비밀번호를 다시한번 입력해주세요.</p>
          </div>
          <FormControl
            sx={{m: 1, width: "30ch"}}
            variant="outlined"
            style={{alignItems: "center"}}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              PasswordCheck*
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="outlined-adornment-password"
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
                    {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="PasswordChecker"
            />
          </FormControl>
          {/**비밀번호 확인 경고창*/}
          <div style={{display: "flex"}}>
            {validate.passwordChecked ? (
              <p>&nbsp;</p>
            ) : (
              <p style={style.inputOutfontDanger}>비밀번호를 확인해 주세요</p>
            )}
          </div>

          {/**성 이름 입력 */}
          <div style={style.inputOutdiv}>
            <p style={style.inputOutfont}>이름을 입력해주세요.</p>
          </div>
          <Grid container>
            <Grid item sx={{display: "flex", height: "auto"}}>
              <FormControl
                sx={{m: 1, width: "15ch"}}
                variant="outlined"
                style={{alignItems: "center"}}
              >
                <InputLabel htmlFor="outlined-adornment-id">성*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="l_name"
                  name="l_name"
                  type="text"
                  value={userInfo.l_name}
                  onChange={handleChange("l_name")}
                  label="l_name"
                />
              </FormControl>
              <FormControl
                sx={{m: 1, width: "15ch"}}
                variant="outlined"
                style={{alignItems: "center"}}
              >
                <InputLabel htmlFor="outlined-adornment-id">이름*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="f_name"
                  name="f_name"
                  type="text"
                  value={userInfo.f_name}
                  onChange={handleChange("f_name")}
                  label="f_name"
                />
              </FormControl>
            </Grid>
          </Grid>
          {/**이름 확인 경고창*/}
          <div style={{display: "flex", height: "30px", marginBottom: "20px"}}>
            {validate.nameCheck ? (
              <p>&nbsp;</p>
            ) : (
              <p style={style.inputOutfontDanger}>이름을 입력해주세요.</p>
            )}
          </div>

          {/**닉네임 입력 */}
          <div style={style.inputOutdiv}>
            <p style={style.inputOutfont}>사용하실 닉네임을 입력해주세요.</p>
          </div>
          <Grid container>
            <Grid item sx={{display: "flex", height: "auto"}}>
              <FormControl
                sx={{m: 1, width: "30ch"}}
                variant="outlined"
                style={{alignItems: "center"}}
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
                sx={{width: "10ch", height: "7ch", m: 1}}
                variant="contained"
                onClick={nicknameCheck}
                style={{padding: 8}}
              >
                중복확인
              </Button>
            </Grid>
          </Grid>
          {/**닉네임 확인 경고창*/}
          <div style={{display: "flex", height: "30px", marginBottom: "20px"}}>
            {validate.nickname ? (
              !userCheck.nickname ? (
                !successInfo.nickname ? (
                  <p>&nbsp;</p>
                ) : (
                  <p style={{paddingLeft: "10px", color: " blue"}}>
                    사용 가능한 닉네임입니다.
                  </p>
                )
              ) : (
                <p style={style.inputOutfontDanger}>
                  {" "}
                  이미 존재하는 닉네임입니다.
                </p>
              )
            ) : (
              <p style={style.inputOutfontDanger}>형식에 맞게 입력해주세요.</p>
            )}
          </div>

          {/**이메일 입력 */}
          <div style={style.inputOutdiv}>
            <p style={style.inputOutfont}>
              본인 확인을 위해 이메일을 입력 후 인증해주세요.
            </p>
          </div>
          <Grid sx={{display: "flex", height: "auto"}}>
            <FormControl
              sx={{m: 1, width: "30ch"}}
              variant="outlined"
              style={{alignItems: "center"}}
            >
              <InputLabel htmlFor="outlined-adornment-email">Email*</InputLabel>
              <OutlinedInput
                fullWidth
                id="email"
                name="email"
                type="text"
                value={userInfo.email}
                onChange={handleChange("email")}
                label="email"
              />
            </FormControl>
            <Button
              sx={{width: "10ch", height: "7ch", m: 1}}
              variant="contained"
              onClick={emailCheckHandler}
              style={{padding: 8}}
            >
              코드받기
            </Button>
          </Grid>
          {/*이메일 확인 경고창*/}
          <div style={{display: "flex"}}>
            {validate.email ? (
              <p>&nbsp;</p>
            ) : (
              <p style={style.inputOutfontDanger}>
                이메일의 형식에 맞게 입력해주세요.
              </p>
            )}
          </div>

          {certified ? (
            <div>
              <div style={style.inputOutdiv}>
                <p style={style.inputOutfont}>
                  본인 확인을 위해 전송받은 코드를 인증해주세요.
                </p>
              </div>
              <Grid sx={{display: "flex", height: "auto"}}>
                <FormControl
                  sx={{m: 1, width: "15ch"}}
                  variant="outlined"
                  style={{alignItems: "center"}}
                >
                  <InputLabel htmlFor="outlined-adornment-code">
                    Code*
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="code"
                    name="code"
                    type="text"
                    value={userInfo.code}
                    onChange={handleChange("code")}
                    label="code"
                  />
                </FormControl>
                {/*이메일 인증 코드 확인 경고창*/}

                <Button
                  sx={{width: "10ch", height: "7ch", m: 1}}
                  variant="contained"
                  onClick={emailCheckHandler}
                  style={{padding: 8}}
                >
                  다시받기
                </Button>
                <Button
                  sx={{width: "10ch", height: "7ch", m: 1}}
                  variant="contained"
                  onClick={emailCheckedHandler}
                  style={{padding: 8}}
                >
                  인증확인
                </Button>
              </Grid>

              <div style={{display: "flex"}}>
                {emailSuccess ? (
                  <p style={{paddingLeft: "10px", color: " blue"}}>
                    인증되었습니다.
                  </p>
                ) : (
                  <p style={style.inputOutfontDanger}>
                    코드를 입력 혹은 다시받기를 눌러주세요.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p></p>
          )}
          {/**이메일 코드 인증코드 입력창 */}
          <Grid>
            <Button
              variant="outlined"
              onClick={consentOnClick}
              style={{
                justifyContent: "center",
                width: "100px",
                marginLeft: "37%",
              }}
            >
              약관 보기
            </Button>
          </Grid>
          <Modal
            style={{overflowY: "scroll"}}
            open={consentOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style.modal}>
              <Typography
                component="h1"
                variant="h5"
                style={{textAlign: "center"}}
              >
                회원가입 동의 약관
              </Typography>
              <Grid container>
                <Consent />
                <Button
                  variant="contained"
                  style={{marginTop: "10px"}}
                  onClick={closeModal}
                >
                  확인
                </Button>
              </Grid>
            </Box>
          </Modal>
          <Grid container>
            <Checkbox
              checked={checked}
              onChange={handleCheckBox}
              inputProps={{"aria-label": "controlled"}}
              style={{paddingTop: "0px"}}
            />
            <p
              style={{
                color: "green",
                fontSize: "15px",
              }}
            >
              <span style={{color: "gray", fontSize: "14px"}}>
                (필수*) &nbsp;
              </span>
              회원가입약관의 내용에 동의합니다.
            </p>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs style={{paddingLeft: "40px"}}>
              <Button
                variant="contained"
                style={{marginTop: "10px"}}
                onClick={noCreateUserHandler}
              >
                취소하기
              </Button>
              <Modal
                style={{overflowY: "scroll"}}
                open={infoNotCreate}
                onClose={noCreateCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style.cancellation}>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{textAlign: "center"}}
                  >
                    정말로 취소하시겠습니까?
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs style={{paddingLeft: "40px"}}>
                      <Button
                        variant="contained"
                        style={{marginTop: "10px"}}
                        onClick={noCreateInfo}
                      >
                        네
                      </Button>
                      <Button
                        variant="contained"
                        style={{marginTop: "10px", marginLeft: "160px"}}
                        onClick={noCreateCloseModal}
                      >
                        아니오
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </Grid>
            <Grid item xs="2" />
            <Grid item xs>
              <Button
                variant="contained"
                onClick={createUserHandler}
                style={{marginTop: "10px"}}
              >
                회원가입
              </Button>
              <Modal
                style={{overflowY: "scroll"}}
                open={infoCreate}
                onClose={lastCheckCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style.lastModal}>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{textAlign: "center"}}
                  >
                    작성을 완료해 주시기 바랍니다.
                  </Typography>
                  <Grid container>
                    <Grid item xs style={{paddingLeft: "43%"}}>
                      <Button
                        variant="contained"
                        style={{marginTop: "10px"}}
                        onClick={lastCheckCloseModal}
                      >
                        확인
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
    </div>
  );
};

export default SignUp;
