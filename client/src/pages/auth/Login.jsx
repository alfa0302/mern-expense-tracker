import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import FormInput from "../../components/inputs/FormInput";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            // title="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormInput
            // title="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
        <p className="desc mt-2 md:mt-4">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-deep">
            Sign Up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
