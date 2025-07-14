import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verifiy = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const validate = (values: { otp: string }) => {
    const errors: { otp?: string } = {};
    if (!values.otp) {
      errors.otp = "OTP is required";
    } else if (!/^[0-9]{6}$/.test(values.otp)) {
      errors.otp = "OTP must be 6 digits";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { otp: "", email: email },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        await axiosInstance.post("/api/auth/verify-otp", values);
        toast.success("OTP verified successfully!");
        // Redirect or further logic here
        navigate("/");
      } catch (err) {
        toast.error("OTP verification failed.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {!email && (
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="otp">
                Enter you Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formik.values.email ? formik.values.email : ""}
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                required
                autoComplete="email"
              />
              {formik.touched.otp && formik.errors.otp && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.otp}
                </div>
              )}
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="otp">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.otp}
              onChange={(e) => formik.setFieldValue("otp", e.target.value)}
              required
              autoComplete="one-time-code"
              maxLength={6}
            />
            {formik.touched.otp && formik.errors.otp && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.otp}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 cursor-pointers rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verifiy;
