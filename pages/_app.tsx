import React, { useState, useMemo, useEffect, createContext } from "react";

import Head from "next/head";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

import "../styles/globals.css";

import type { AppProps } from "next/app";
interface ColorModeContextInterface {
  toggleColorMode: () => void;
  themeMode: string;
}

export const ColorModeContext = createContext<ColorModeContextInterface>({
  toggleColorMode: () => {},
  themeMode: "light",
});

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.body.style.background =
      mode === "light" ? "white" : "rgb(32, 58, 67)";
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <>
      <Head>
        <title>Rich Text Editor</title>
      </Head>
      <ColorModeContext.Provider
        value={{ toggleColorMode: colorMode.toggleColorMode, themeMode: mode }}
      >
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
