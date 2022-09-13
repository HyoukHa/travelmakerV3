import { useEffect, useState, Api } from "react";
import { Avatar, Box, Button } from "@mui/material";
import UpdateIcon from "../common/static/profile.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { getSession, setSession } from "../config/session/session";

const Uploader = ({ userInfo, setUserInfo = () => {} }) => {
  // const [image, setImage] = useState("");
  let inputRef;

  const deleteImage = () => {
    setUserInfo({ ...userInfo, src_photo: "" });
  };

  const handleFileInput = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    console.log(img);
    formData.append("image", img);
    axios
      .post("/profile/upload", formData)
      .then((res) => {
        const sessionData = JSON.parse(getSession("userInfo"));
        setSession(
          "userInfo",
          JSON.stringify({ ...sessionData, src_photo: res.data })
        );
        // setImage(res.data);
        setUserInfo({ ...userInfo, src_photo: res.data });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    // console.log(image);
    console.log(userInfo.src_photo);
  }, [userInfo.src_photo]);

  return (
    <Box>
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
      <Avatar sx={{ width: 300, height: 300 }}>
        {userInfo.src_photo === "" || userInfo.src_photo === null ? (
          <AccountCircleIcon sx={{ width: 300, height: 300 }} />
        ) : (
          <img
            src={`${userInfo.src_photo}`}
            style={{ width: 300, height: 300 }}
          />
        )}
      </Avatar>
      <Box marginLeft="86px">
        <Button type="primary" onClick={() => inputRef.click()}>
          <img src={UpdateIcon} alt="upload" width="24px" />
        </Button>
        <Button color="error" onClick={deleteImage}>
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Uploader;
