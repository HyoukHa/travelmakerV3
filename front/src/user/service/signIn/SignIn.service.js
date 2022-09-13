import axios from 'axios';

const apiSignIn = (data) => {
  return axios({
    url: "/user/signin",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
};

export default apiSignIn;