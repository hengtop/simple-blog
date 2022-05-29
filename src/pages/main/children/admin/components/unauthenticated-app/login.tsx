import React, { memo, useState } from "react";
import { localStore } from "utils";
import { useAuth } from "context/auth";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { pink } from "@mui/material/colors";
import VpnKeySharpIcon from "@mui/icons-material/VpnKeySharp";
import { FullWidthButton, Title, CustomCard } from "./style";

interface LoginParamsType {
  username: string;
  password: string;
}

type LoginParamsChangeType = "username" | "password";

export default memo(function Index() {
  //props/state
  const [loading, setLoading] = useState(false);
  const [keepLoginParams, setKeepLoginParams] = useState(
    localStore.getCacheStore("keepLoginParams") ?? false,
  );
  const [loginParams, setLoginParams] = useState<LoginParamsType>({
    username: localStore.getCacheStore("username") ?? "",
    password: localStore.getCacheStore("password") ?? "",
  });

  //redux hooks

  //other hooks
  const { login } = useAuth();

  //其他逻辑
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: LoginParamsChangeType,
  ) => {
    setLoginParams({
      ...loginParams,
      [type]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // 保存密码
    if (keepLoginParams) {
      localStore.setCacheStore("username", loginParams.username);
      // todo 加密保存
      localStore.setCacheStore("password", loginParams.password);
    } else {
      // 清空
      localStore.removeCacheStore("username");
      localStore.removeCacheStore("password");
    }
    await login(loginParams);
    setLoading(false);
  };

  const handleChangeKeepLoginParams = () => {
    setKeepLoginParams(!keepLoginParams);
    localStore.setCacheStore("keepLoginParams", !keepLoginParams);
  };

  return (
    <CustomCard variant="outlined">
      <Title>
        <Avatar sx={{ bgcolor: pink[500], marginBottom: "1rem" }}>
          <VpnKeySharpIcon />
        </Avatar>
        请登录
      </Title>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          value={loginParams.username}
          onChange={(e) => handleChange(e, "username")}
          fullWidth
          required
          autoComplete="username"
          name="username"
          type="text"
          label="用户名"
          placeholder="请输入用户名"
          margin="normal"
        />
        <TextField
          value={loginParams.password}
          onChange={(e) => handleChange(e, "password")}
          fullWidth
          required
          autoComplete="password"
          name="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={keepLoginParams}
              onChange={handleChangeKeepLoginParams}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="记住密码"
        />
        <FullWidthButton type="submit" loading={loading} variant="contained">
          登录
        </FullWidthButton>
      </Box>
    </CustomCard>
  );
});
