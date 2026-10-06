import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";

export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      {/* Fallback for undefined routes */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
};

export default App;