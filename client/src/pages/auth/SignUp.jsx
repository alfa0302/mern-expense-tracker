import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import FormInput from "../../components/inputs/FormInput";
import FileUpload from "../../components/inputs/FileUpload";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <AuthLayout>
      <div className="bg-white md:p-10 p-5 rounded-lg w-[90%]">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Sign Up</h2>
          <p className="desc md:mb-4 mb-2">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-5">
          <FileUpload name="picture" onChange={handleChange} />
          <FormInput
            type="text"
            name="fullname"
            placeholder="Enter full name"
            value={formData.fullname}
            onChange={handleChange}
          />

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
            Sign Up
          </button>
        </form>

        <p className="desc mt-2 md:mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-deep">
            Log In
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
