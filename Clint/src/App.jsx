import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/ForgotPassword";

export const serverUrl = "http://localhost:8000";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
};

export default App;