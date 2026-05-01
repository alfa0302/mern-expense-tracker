import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import FormInput from "../../components/inputs/FormInput";
import FileUpload from "../../components/inputs/FileUpload";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { isValidEmail } from "../../utils/helper";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, image } = formData;
    setError("");
    setLoading(true);
    try {
      if (!fullName) {
        return setError("Name is required");
      }
      if (!email || !isValidEmail(email)) {
        return setError("Email is required");
      }
      if (!password) {
        return setError("Password is required");
      }
      let imgResponse;
      if (image) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", image);
        imgResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: imgResponse.data.imageUrl,
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
          <h2 className="font-semibold">Sign Up</h2>
          <p className="desc md:mb-4 mb-2">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-5">
          <FileUpload name="image" onChange={handleChange} />
          <FormInput
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={formData.fullName}
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
            {loading ? "please wait" : "sign up"}
          </button>
        </form>
        <p className="text-red-500 mt-3 text-sm">{error}</p>
        <p className="desc mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-deep">
            Log In
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
