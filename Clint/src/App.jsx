import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";

export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  const {userData} = useSelector(state=> state.user)
  return (
    <Routes>
      <Route path="/signup" element={!userData?<Signup />:<Navigate to={"/"}/>} />
      <Route path="/signin" element={!userData?<Signin />:<Navigate to={"/"}/>} />
      <Route path="/ForgotPassword" element={!userData?<ForgotPassword />:<Navigate to={"/"}/>} />
      <Route path="/" element={userData?<home />:<Navigate to={"/signin"}/>} />
    </Routes>
  );
};

export default App;