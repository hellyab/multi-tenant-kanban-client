import {_axios} from "./constants";

export const getTasks = (tenantId, taskColumn) => {
  const request = {
    url: `${process.env.REACT_APP_API_URL}/tasks`,
    method: "get",
    params: {
      filter: {
        where: {
          group: taskColumn,
          tenantId,
        },
      },
    },
  };
  return _axios(request);
};

export const createTask = (task) => {
  const request = {
    url: `${process.env.REACT_APP_API_URL}/tasks`,
    method: "post",
    data: task,
  };
  return _axios(request);
};

export const updateTask = (task) => {
  const request = {
    url: `${process.env.REACT_APP_API_URL}/tasks/${task.id}`,
    method: "patch",
    data: task,
  };
  return _axios(request);
};
