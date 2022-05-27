import React, { ReactNode, useCallback, useState } from "react";
import { auth } from "utils";
import { service } from "network";
import { useMount } from "hooks";

interface AuthForm {
  username: string;
  password: string;
}

// 初始化user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 根据token获取用户信息，进行初始化
    const { data } = await service.http("/me", { token });
    user = data;
  }
  return user;
};

// 定义一个 context
const AuthContext = React.createContext<
  | {
      user: auth.UserType | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<auth.UserType | null>(null);
  const login = async (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = async () => auth.logout().then(() => setUser(null));

  // 初始化的时候设置user信息，保证登陆后刷新用户数据持久化
  useMount(
    useCallback(() => {
      bootstrapUser().then(setUser);
    }, []),
  );
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvoder中使用");
  }
  return context;
};
