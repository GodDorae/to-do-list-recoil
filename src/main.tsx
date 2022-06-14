import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/to-do-list-recoil/" element={<App />} />
        </Routes>
      </ThemeProvider>
    </RecoilRoot>
  </BrowserRouter>
);
