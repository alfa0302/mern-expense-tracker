import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/dashboard/Home";
import UserProvider, { UserContext } from "./context/UserContext";
import Income from "./pages/dashboard/Income";
import Expense from "./pages/dashboard/Expense";
import axiosInstance from "./utils/axiosInstance";
import { API_PATHS } from "./utils/apiPaths";
import PageLoader from "./components/PageLoader";

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
function MainApp() {
  const { user, updateUser, setIsAuthLoading } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const rehydrate = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        await updateUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        updateUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };
    if (token) {
      rehydrate();
    } else {
      setIsAuthLoading(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </BrowserRouter>
  );
}
const Root = () => {
  const { user, isAuthLoading } = useContext(UserContext);
  if (isAuthLoading) {
    return <PageLoader title="Loading" />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Navigate to="/dashboard" />;
};
