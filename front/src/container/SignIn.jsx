/**
 * SignIn.jsx - 로그인
 *  Consent.jsx - 회원가입
 *
 * 작성자 : 이창주 (LeeDaRo <pokl001@naver.com> )
 * 작성일 : 22_08_23
 */

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, FormGroup, Grid, Typography } from "@mui/material";
import { setSession } from "../config/session/session";
import apiSignin from "../user/service/signIn/SignIn.service";
import { useNavigate } from "react-router-dom";
import { _possibleConstructorReturn } from "react-naver-maps/dist/hocs-018c38ad";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overlay: {
    backgroundColor: "rgba(49,92,38,0.7)",
  },
  inputOutfontDanger: {
    paddingLeft: "10px",
    color: " red",
  },
};
// 로그인 모달

const SignIn = ({
  isLogined,
  setIsLogined = () => {},
  open,
  setOpen = () => {},
}) => {
  const navigate = useNavigate();

  // 로그인 객체
  const [logIned, setLogIneds] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  // 로그인 실패 경고
  const [logInedFaild, setLogInedFaild] = useState(true);

  // 로그인 아이디 비밀번호 입력받기.
  const handleChange = (info) => (e) => {
    setLogIneds({ ...logIned, [info]: e.target.value });
  };

  //로그인 전송
  const loginedSubmit = () => {
    setLogInedFaild(true);
    apiSignin({ username: logIned.username, password: logIned.password })
      .then((res) => {
        setSession("Authorization", `Bearer ${res.data.token}`);
        setSession("userInfo", JSON.stringify(res.data));
        setIsLogined(true);
        setOpen(false);
        navigate(0);
      })
      .catch(() => {
        setLogInedFaild(false);
      });
  };

  // 회원가입 으로 보내기
  const SignUpPageHandler = () => {
    navigate("/signup");
    setOpen(false);
  };
  // 로그인 창 닫기
  const closeModal = () => {
    setOpen(false);
  };

  // 패스워드 입력란 보기 On/Off
  const handleClickShowPassword = () => {
    setLogIneds({
      ...logIned,
      showPassword: !logIned.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* 여기가 mui modal */}
      <Modal
        open={open}
        // onClose={handleClose}
        //  이것은 모달 창을 만들때 외부를 클릭하면 꺼지도록 해주는 기능입니다.
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            로그인
          </Typography>
          <FormGroup>
            <FormControl
              sx={{ m: 1, width: "30ch" }}
              variant="outlined"
              style={{ alignItems: "center" }}
            >
              <InputLabel htmlFor="outlined-adornment-username">ID</InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-username"
                type="text"
                value={logIned.username}
                onChange={handleChange("username")}
                label="username"
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    loginedSubmit();
                  }
                }}
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "30ch" }}
              variant="outlined"
              style={{ alignItems: "center" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                type={logIned.showPassword ? "text" : "password"}
                value={logIned.password}
                onChange={handleChange("password")}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    loginedSubmit();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {logIned.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {/**로그인 실패 경고창*/}
              <div style={{ display: "flex" }}>
                {logInedFaild ? (
                  <p>&nbsp;</p>
                ) : (
                  <p style={style.inputOutfontDanger}>
                    아이디 및 비밀번호를 확인 해주세요.
                  </p>
                )}
              </div>
            </FormControl>
            <Grid container>
              <Grid item xs style={{ paddingLeft: "10%" }}>
                <Button
                  variant="contained"
                  style={{ marginTop: "10px" }}
                  onClick={closeModal}
                >
                  취소
                </Button>
              </Grid>
              <Grid item xs style={{ marginLeft: "17%" }}>
                <Button
                  variant="contained"
                  onClick={loginedSubmit}
                  style={{ marginTop: "10px" }}
                >
                  로그인
                </Button>
              </Grid>
            </Grid>
          </FormGroup>
          <Grid container>
            <Grid item xs style={{ marginLeft: "10%", marginTop: "10px" }}>
              <Button
                variant="contained"
                style={{ width: "90%" }}
                onClick={SignUpPageHandler}
              >
                회원가입
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default SignIn;
