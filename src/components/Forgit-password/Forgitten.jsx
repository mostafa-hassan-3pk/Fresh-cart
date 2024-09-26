import { Helmet } from "react-helmet";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle password reset form submission
  const resetPasswordForm = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: resetPasswordForm,
  });

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="w-[80%] mx-auto py-32">
        <h2 className="text-[calc(1.325rem+.9vw)] font-semibold text-gray-900 dark:text-white">
          Forgot Password
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Email
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-700 dark:text-gray-400"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {loading ? (
            <div className="flex justify-center items-center mt-5">
              <InfinitySpin size={30} color="#3490DC" />
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 w-full text-white font-bold bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md"
            >
              Reset Password
            </button>
          )}
          {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}
          <div className="flex justify-between mt-4">
            <Link to="/SignIn" className="text-blue-500 hover:underline">
              Sign In?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
