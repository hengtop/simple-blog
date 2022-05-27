import type { ReactNode } from "react";
import { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
ColorModeContext.displayName = "ColorModeContext";

export const ToggleColorMode = ({ children }: { children: ReactNode }) => {
  console.log(children);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      user: { age: 121212 },
    }),

    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#ccf",
          },
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useMode必须在ThemeModeProvoder中使用");
  }
  return context;
};
