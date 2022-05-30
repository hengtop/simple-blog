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
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Divider from "@mui/material/Divider";

interface ConfigParamsType {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
  email?: string;
}

export default memo(function Index() {
  //props/state
  const [passwordParams, setPasswordParams] = useState<ConfigParamsType | null>(
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
        ...(passwordParams as ConfigParamsType),
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

  const handleSubmitPasswordParams = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(passwordParams);
    setLoading(false);
  };

  return (
    <Container>
      <Typography marginLeft={30} variant="h6">
        账户设置
        <Divider />
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmitPasswordParams}
        sx={{
          width: "500px",
          margin: "0 auto",
        }}
      >
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
        <TextField
          value={passwordParams?.email ?? ""}
          onChange={(e) => handleChangePasswordParams(e, "email")}
          name="email"
          type="email"
          label="邮箱"
          placeholder="邮箱"
          margin="normal"
          helperText="用于消息通知之类"
        />
        <Stack spacing={2} direction={"row"}>
          <LoadingButton type="submit" loading={loading} variant="contained">
            确认修改
          </LoadingButton>
        </Stack>
      </Box>
    </Container>
  );
});
