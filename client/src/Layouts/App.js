import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Pages/Login.js";
import Register from "../Pages/Register.js"
import Home from "../Pages/Home.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
