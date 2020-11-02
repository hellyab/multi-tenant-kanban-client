import {_axios, authorizationHeader} from "./constants";

export const getTasks = (tenantId, taskColumn) => {
  const request = {
    url: `${process.env.REACT_APP_API_URL}/tasks`,
    headers: {
      ...authorizationHeader,
    },
    method: "get",
    params: {
      filter: {
        where: {
          group: taskColumn,
          tenantId: tenantId,
        },
      },
    },
  };
  return _axios(request);
};

export const createTask = (task) => {
  const request = {
    url: `${process.env.REACT_APP_API_URL}/tasks`,
    headers: {
      ...authorizationHeader,
    },
    method: "post",
    data: task,
  };
  return _axios(request);
};

export const updateTask = (task) => {
  const request = {
    url: `${process.env.REACT_APP_API_URL}/tasks/${task.id}`,
    headers: {
      ...authorizationHeader,
    },
    method: "patch",
    data: task,
  };
  return _axios(request);
};
