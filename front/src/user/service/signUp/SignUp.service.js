import axios from "axios";

const apiSignUp = (data) => {
  return axios({
    url: "/user/signup",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export default apiSignUp;
