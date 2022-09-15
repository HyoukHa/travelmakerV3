import axios from "axios";
import { useEffect } from "react";
import { getSession } from "../../../config/session/session";

export const PackageBoard = ({ id }) => {
  return axios({
    url: `/packageboard/${id}`,
    method: "get",
    headers: {
      Authorization: getSession("Authorization"),
    },
  });
};

export const ReviewBoard = ({ id }) => {
  return axios({
    url: `/reviewboard/${id}`,
    method: "get",
    headers: {
      Authorization: getSession("Authorization"),
    },
  });
};
