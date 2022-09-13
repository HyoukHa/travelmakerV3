import axios from "axios";
import { useEffect } from "react";
import { getSession } from "../../../config/session/session";

const PackageBoard = ({ id }) => {
  return axios({
    url: `/packageboard/${id}`,
    method: "get",
    headers: {
      Authorization: getSession("Authorization"),
    },
  });
};

export default PackageBoard;
