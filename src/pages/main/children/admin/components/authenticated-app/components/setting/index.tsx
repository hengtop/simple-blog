import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import Typography from "@mui/material/Typography";
import Container from "components/container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { set } from "date-fns/esm";

interface PasswordParamsType {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}

interface OtherSettingType {
  email?: string;
  title?: string;
}

export default memo(function Index() {
  //props/state
  const [passwordParams, setPasswordParams] =
    useState<PasswordParamsType | null>(null);
  const [configSetting, setConfigSetting] = useState<OtherSettingType | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  //redux hooks

  //other hooks

  //其他逻辑
  const handleChangePasswordParams = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
      setPasswordParams({
        ...(passwordParams as PasswordParamsType),
        [type]: e.target.value,
      });
      if (
        type === "rePassword" &&
        passwordParams?.newPassword !== e.target.value
      ) {
        setInputError(true);
        return;
      } else {
        setInputError(false);
      }
    },
    [passwordParams],
  );

  const handleChangeOtherSetting = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
      setConfigSetting({
        ...(configSetting as OtherSettingType),
        [type]: e.target.value,
      });
    },
    [configSetting],
  );

  const handleSubmitPasswordParams = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordParams?.newPassword !== passwordParams?.rePassword) {
      setInputError(true);
      return;
    }
    setLoading(true);
    // todo 发送请求
    console.log(passwordParams);
    setLoading(false);
  };

  const handleSubmitOtherSetting = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(configSetting);
  };

  return (
    <Container>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmitPasswordParams}
        sx={{
          width: "500px",
          margin: "0 auto",
        }}
      >
        <Typography marginLeft={"40%"} variant="h6">
          账户设置
        </Typography>
        <TextField
          /* 这里需要在空值的时候设置一个默认值，否则就会导致label重叠到value上 */
          value={passwordParams?.oldPassword ?? ""}
          onChange={(e) => handleChangePasswordParams(e, "oldPassword")}
          required
          name="oldPassword"
          type="password"
          label="旧密码"
          placeholder="请输入旧密码"
          margin="normal"
        />
        <TextField
          value={passwordParams?.newPassword ?? ""}
          onChange={(e) => handleChangePasswordParams(e, "newPassword")}
          required
          name="newPassword"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          margin="normal"
        />
        <TextField
          error={inputError}
          helperText={inputError ? "两次密码不一致" : ""}
          value={passwordParams?.rePassword ?? ""}
          onChange={(e) => handleChangePasswordParams(e, "rePassword")}
          required
          name="rePassword"
          type="password"
          label="确认密码"
          placeholder="确认密码"
          margin="normal"
        />
        <LoadingButton type="submit" loading={loading} variant="contained">
          更新密码
        </LoadingButton>
      </Box>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmitOtherSetting}
        sx={{
          width: "500px",
          margin: "0 auto",
        }}
      >
        <Typography marginLeft={"40%"} variant="h6">
          其他设置
        </Typography>
        <TextField
          value={configSetting?.email ?? ""}
          onChange={(e) => handleChangeOtherSetting(e, "email")}
          name="email"
          type="email"
          label="邮箱"
          placeholder="邮箱"
          margin="normal"
          helperText="用于消息通知之类"
        />
        <TextField
          value={configSetting?.title ?? ""}
          onChange={(e) => handleChangeOtherSetting(e, "title")}
          name="title"
          type="text"
          label="网站标题"
          placeholder="网站标题"
          margin="normal"
        />
        <Button type="submit" variant="contained">
          保存
        </Button>
      </Box>
    </Container>
  );
});
