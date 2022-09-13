import axios from "axios";
import {getSession} from "../../../config/session/session";

const apiGetUserInfo = ({id}) => {
  return axios({
    url: `/user/${id}`,
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: getSession("Authorization"),
    },
  });
};

const apiUpdate = (data) => {
  return axios({
    url: "/user/signin",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: getSession("Authorization"),
    },
  });
};

export default {
  apiGetUserInfo,
  apiUpdate,
};
