import { _axios, userId } from "./constants";

export const getUserTenants = (id) => {
  console.log(userId());
  const request = {
    url: `${process.env.REACT_APP_API_URL}/user-tenants`,
    method: "get",
    params: {
      filter: {
        where: {
          userId: id,
        },
        fields: {
          id: true,
          userId: true,
          tenantId: true,
        },
      },
    },
  };
  return _axios(request)
    .then((res) => {
      if (res.length > 0) {
        const tenantsRequest = {
          url: `${process.env.REACT_APP_API_URL}/tenants`,
          method: "get",
          params: {
            filter: {
              where: {
                or: res.map((userTenant) => ({
                  id: userTenant.tenantId,
                })),
              },
              fields: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        };
        console.log(tenantsRequest);
        return _axios(tenantsRequest);
      } else {
        return Promise.resolve([]);
      }
    })
    .catch((e) => Promise.reject(e.data));
};
