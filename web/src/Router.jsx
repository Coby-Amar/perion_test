import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}