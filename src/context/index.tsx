import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth";
import { ToggleColorMode } from "context/theme-mode";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  return <ToggleColorMode>{children}</ToggleColorMode>;
};
