import { memo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "context/theme-mode";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  MainContainer,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  OutletContainer,
} from "./style";

export default memo(function Index() {
  //props/state

  //redux hooks

  //other hooks
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useThemeMode();
  //其他逻辑

  return (
    <MainContainer background={theme.palette.background}>
      <HeaderContainer position="fixed">
        <HeaderLeft onClick={() => navigate("/")}>主页</HeaderLeft>
        <HeaderRight>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </HeaderRight>
      </HeaderContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </MainContainer>
  );
});
