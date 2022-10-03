import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeProvider, CSSReset, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <BrowserRouter>
          <ChakraProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </ChakraProvider>
        </BrowserRouter>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
