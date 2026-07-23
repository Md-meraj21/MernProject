import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default App;