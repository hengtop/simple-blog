import { memo } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "context/theme-mode";

import AppBar from "@mui/material/AppBar";
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
  const theme = useTheme();
  const colorMode = useThemeMode();
  console.log(theme);
  console.log(colorMode);
  //其他逻辑

  return (
    <MainContainer>
      <AppBar position="fixed">
        <HeaderContainer>
          <HeaderLeft>你好</HeaderLeft>
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
      </AppBar>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </MainContainer>
  );
});
