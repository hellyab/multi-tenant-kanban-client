import jwt_decode from "jwt-decode";
import axios from "axios";
import qs from "qs";
import { useEffect, useRef } from "react";

export const authorizationHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

//USER ID
export const userId = () => jwt_decode(localStorage.getItem("token")).id;

//HTTP REQUEST
export const axiosInstance = axios.create();

axios.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => {
    return qs.stringify(params, {
      encode: false,
    });
  };

  return config;
});

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response.status === 401) {
//       const token = await refreshToken();
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       return _axios(error.config);
//     }
//   }
// );

export const _axios = (config) =>
  axiosInstance(config).then(async (res) => {
    if (res.status < 200 || res.status >= 300) {
      return Promise.reject(res.data);
    }

    return Promise.resolve(res.data);
  });

//TASK BOARDS
export const boards = [
  { name: "Backlog" },
  { name: "To do" },
  { name: "In progress" },
  { name: "Under review" },
  { name: "Done" },
  { name: "Archive" },
];

//USE PREVIOUS
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
