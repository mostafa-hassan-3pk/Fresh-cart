import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authenticate } from "../../context/AouthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken,setUserName } = useContext(Authenticate);
  const [isLoading, setLoading] = useState(false);

  // Function to handle user sign-in
  const registerUser = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setLoading(false);
      toast.success(`wellcom ${res.data.user.name}`);
      setUserName(res.data.user.name);

      setToken(res?.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/Products");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: registerUser,
  });

  return (
    <div>
      <Helmet>
        <title>Sign-In</title>
      </Helmet>
      <div className="w-[80%] mx-auto py-32">
        <h2 className="text-[calc(1.325rem+.9vw)] font-semibold text-gray-900 dark:text-white pb-5">
          Sign-In
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/ForgotPassword"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              className="relative inline-flex items-center justify-center self-end p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
