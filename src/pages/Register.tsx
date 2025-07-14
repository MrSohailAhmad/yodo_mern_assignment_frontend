import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserRole } from "../interface/comon";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await axiosInstance.post("/api/auth/register", values);
      toast.success("Registration successful! OTP sent to you email");
      navigate(`/verify?email=${values.email}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register Yourself
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.role}
              onChange={(e) => formik.setFieldValue("role", e.target.value)}
              required
            >
              <option value="">Select role</option>
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.USER}>User</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
