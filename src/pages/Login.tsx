import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../services/axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", values);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // if (res.data.user.role === UserRole.ADMIN) {
      //   navigate("/home");
      // } else if (res.data.user.role === UserRole.ADMIN) {
      //   navigate("/home");
      // }
      navigate("/home");

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      let message = "an unknown error";
      // if (err instanceof Error) {
      message = err.response.data.message;
      // }
      toast.error(`Login failed due to ${message}`);
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <span>
          If you don't have account? <Link to="/register">Register</Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
