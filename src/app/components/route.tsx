import { BrowserRouter, Route, Routes } from "react-router";
import Page from "../page";

export const routes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Page />} />
    </Routes>
  </BrowserRouter>
);
