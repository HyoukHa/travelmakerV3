/**
 * 마이페이지 - 회원정보 수정 페이지
 *
 * 회원의 각 정보를 받아와 input 박스에 출력 후,
 * 수정 가능하도록 만들어주고,
 * 기존의 정보와 같은 데이터는 null로,
 * 기존의 정보와 다른 데이터는 해당 값을 담아 post요청.
 *
 */

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
/** @jsxImportSource @emotion/react */
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
  FilledInput,
} from "@mui/material";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getSession } from "../config/session/session";
import MyPackageBoard from "./MyPackageBoard";
import MyReviewBoard from "./MyReviewBoard";

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

const MyPage = () => {
  const navigate = useNavigate();
  // 유저 정보 불러와 담을 객체
  const [mine, setMine] = useState(false);
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    follower: "",
    following: "",
    src_photo: "",
    rank: "",
  });

  // 사용자의 정보를 불러올때 저장된 토큰값을 같이 보내준다.
  useEffect(() => {
    if (JSON.parse(getSession("userInfo")).id == id) {
      axios
        .get("/user/whoami", {
          headers: { Authorization: getSession("Authorization") },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.id == id) {
            setMine(true);
          } else {
            setMine(false);
          }
          setUserInfo(res.data);
        })
        .catch();
    } else {
      if (mine == false) {
        axios
          .get(`/user/who/${id}`)
          .then((res) => {
            setUserInfo(res.data);
          })
          .catch();
      }
    }
  }, []);

  const [passwordChecked, setPasswordChecked] = useState({
    password: "",
    passwordCheck: true,
    showPassword: false,
  });
  const [openModal, setOpenModal] = useState(false);

  // 수정 시 패스워드 확인 할 패스워드 띄워주는 모달창
  const udpateHandler = () => {
    setOpenModal(true);
  };

  //수정해야함
  // 회원정보 수정 시 패스워드 입력 후 검증하기
  const passwordCheckHandler = () => {
    axios({
      url: "/user/check/pw",
      data: { password: passwordChecked.password },
      method: "post",
      headers: { Authorization: getSession("Authorization") },
    })
      .then(() => {
        navigate("/user/update");
        setOpenModal(false);
      })
      .catch(() => {
        setPasswordChecked({ ...passwordChecked, passwordCheck: false });
      });
  };
  const handleChange = (password) => (e) => {
    setPasswordChecked({
      ...passwordChecked,
      [password]: e.target.value,
      passwordCheck: true,
    });
  };

  const handleClickShowPassword = () => {
    setPasswordChecked({
      ...passwordChecked,
      showPassword: !passwordChecked.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Box mt="5vh">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        {userInfo.src_photo === "" || userInfo.src_photo === null ? (
          <Avatar sx={{ width: 300, height: 300 }}>
            <AccountCircleIcon sx={{ width: 300, height: 300 }} />
          </Avatar>
        ) : (
          <Avatar sx={{ width: 300, height: 300 }}>
            <img
              src={`${userInfo.src_photo}`}
              style={{ width: 300, height: 300 }}
            />
          </Avatar>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        {userInfo.nickname}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        <Box display="flex" gap="1vw" sx={{ maxHeight: 80 }}>
          <Card
            onClick={() => {
              navigate(`/user/follower/${id}`);
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  width="100px"
                  textAlign="center"
                >
                  follower
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  {userInfo.follower}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            onClick={() => {
              navigate(`/user/following/${id}`);
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  width="100px"
                  textAlign="center"
                >
                  following
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  {userInfo.following}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
      {/** 내가 작성한 판매 품목 불러오기 */}
      {userInfo.rank === 2 ? <MyPackageBoard /> : null}

      {/** 내가 작성한 리뷰 불러오기 */}

      <MyReviewBoard />
      {mine ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        >
          <Grid display="flex" gap="1vw">
            <Button variant="contained" onClick={udpateHandler}>
              수정
            </Button>
            <Button color="error" variant="contained">
              탈퇴
            </Button>
          </Grid>
          <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FormGroup>
                <Box>
                  <span>개인정보 수정을 위해 비밀번호를 확인해주세요.</span>
                </Box>
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
                    type={passwordChecked.showPassword ? "text" : "password"}
                    value={userInfo.password}
                    onChange={handleChange("password")}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        passwordCheckHandler();
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
                          {passwordChecked.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {/**인증 실패 경고창*/}
                  <div style={{ display: "flex" }}>
                    {passwordChecked.passwordCheck ? (
                      <p>&nbsp;</p>
                    ) : (
                      <p style={style.inputOutfontDanger}>
                        비밀번호를 확인 해주세요.
                      </p>
                    )}
                  </div>
                </FormControl>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  maxHeight="5vh"
                >
                  <Grid display="flex" gap="5ch">
                    <Grid style={{ paddingLeft: "10%" }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenModal(false);
                        }}
                      >
                        취소
                      </Button>
                    </Grid>
                    <Grid style={{ marginLeft: "17%" }}>
                      <Button
                        variant="contained"
                        onClick={passwordCheckHandler}
                      >
                        확인
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </FormGroup>
            </Box>
          </Modal>
        </Box>
      ) : null}
    </Box>
  );
};

export default MyPage;
