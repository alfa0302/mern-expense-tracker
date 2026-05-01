import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import FormInput from "../../components/inputs/FormInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { isValidEmail } from "../../utils/helper";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !isValidEmail(email)) {
      return setError("Valid email is required");
    }
    if (!password) {
      return setError("Password is required");
    }
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, userData } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(userData);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className="bg-white md:p-10 p-5 rounded-lg w-[90%]">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Welcome back</h2>
          <p className="desc md:mb-4 mb-2">Enter your credentials to login</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-5">
          <FormInput
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn-primary">
            {loading ? "please wait" : "Log in"}
          </button>
        </form>
        <p className="text-red-500 mt-3 text-sm">{error}</p>
        <p className="desc mt-2">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-deep">
            Sign Up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
