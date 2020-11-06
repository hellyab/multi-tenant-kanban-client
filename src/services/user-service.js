import jwtDecode from "jwt-decode";
import {_axios} from "./constants";

export const getUserInfoFromToken = () => {
  const token = localStorage.getItem("token");
  return jwtDecode(token);
};

export const createUser = (user) => {
  const request = {
    url: `${process.env.REACT_APP_API_URL}/users`,
    method: "post",
    data: user,
  };
  return _axios(request);
};
