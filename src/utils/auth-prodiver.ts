// 如果使用第三方的登录认证，该文件就不用写了
import { sessionStore } from "utils";
import { toast } from "react-toastify";

export interface UserType {
  id: number;
  name: string;
  email: string;
  title: string;
  token: string;
}

const localStoregeKey = "login_token";
const apiUrl = process.env.REACT_APP_API_URL;

// 获取token
export const getToken = () => sessionStore.getCacheStore(localStoregeKey);

// 保存token返回user
export const handleUserResponse = ({ data }: { data: UserType }) => {
  sessionStore.setCacheStore(localStoregeKey, data.token || "");
  return data;
};

// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      toast.success("登录成功", {
        hideProgressBar: true,
        autoClose: 1500,
        position: "top-center",
      });
      return handleUserResponse(await response.json());
    } else {
      if (response.status === 400) {
        toast.error("密码错误", {
          hideProgressBar: true,
          autoClose: 1500,
          position: "top-center",
        });
      }
      return Promise.reject(response);
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(response);
    }
  });
};

export const logout = async () =>
  sessionStore.removeCacheStore(localStoregeKey);
