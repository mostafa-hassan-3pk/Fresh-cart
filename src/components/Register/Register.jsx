import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();

  const [isLoading, setLoading] = useState(false);
  async function registerUser(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      toast.success(res.data.message);
      setLoading(false);
      nav("/SignIn");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Please enter a Egypt phone"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerUser,
  });

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="md:w-[80%] mx-auto py-5 mt-14">
        <h2 className="text-[calc(1.325rem+.9vw)] font-semibold text-gray-900 dark:text-white">
          Register now
        </h2>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
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
          <div className="mb-5">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Re-Password:
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center self-end p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-10 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {isLoading ? (
                <i className=" fa-solid fa-spinner fa-spin "></i>
              ) : (
                "Register now"
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
