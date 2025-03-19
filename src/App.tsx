import React, { useEffect, useState } from "react";
import "./App.css";
import { validateToken } from "./services/api";
import Login from "./pages/Login";
import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useCookies } from "react-cookie";
import Spinner from "./components/Spinner";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isValid, setIsValid] = useState(false);
  const [isLoading,setIsLoading]=useState(true)
  const validate = async () => {
    if (cookies.token) {
      const res = await validateToken(cookies.token);
      setIsValid(res.confirmed ?? false)
    }
    setIsLoading(false);
  };
  useEffect(() => {
    validate();
  },[cookies.token]);
  return (
    <Routes>
      <Route index element={isLoading?<Spinner width={20} height={20}/>:isValid && cookies.token ? <Home /> : <Login />} />
      <Route path="register" element={<SignUp />} />
    </Routes>
  );
}

export default App;
