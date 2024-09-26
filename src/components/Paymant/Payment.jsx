import { FloatingLabel, Textarea } from "flowbite-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const Payment = () => {
  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingOnline, setLoadingOnline] = useState(false);
  const { cartId, setNumOfItem, setProducts, setTotalPrice } =
    useContext(cartContext);

  const validationSchema = Yup.object({
    city: Yup.string().required("City is required"),
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egypt phone number"),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const x = {
        shippingAddress: {
          details: values.details,
          phone: values.phone,
          city: values.city,
        },
      };
      setLoadingCash(true);
      try {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          x,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        toast.success(data.status);
        formik.resetForm();
        setProducts([]);
        setTotalPrice(0);
        setNumOfItem(0);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoadingCash(false);
      }
    },
  });

  async function onlinePayment() {
    const isValid = await formik.validateForm();
    if (Object.keys(isValid).length === 0) {
      const x = {
        shippingAddress: {
          details: formik.values.details,
          phone: formik.values.phone,
          city: formik.values.city,
        },
      };
      setLoadingOnline(true);
      try {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
          x,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        window.open(data.session.url);
        toast.success(data.status);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoadingOnline(false);
      }
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  }

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="w-[80%] mx-auto p-4 mt-14">
        <h1 className="font-bold text-center text-green-500 text-[calc(1.3rem+.6vw)]">
          Payment
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <FloatingLabel
              variant="standard"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="city"
              className="w-full"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500">{formik.errors.city}</div>
            ) : null}
          </div>
          <div className="mb-8">
            <FloatingLabel
              variant="standard"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              className="w-full"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>
          <Textarea
            id="comment"
            placeholder="Details"
            required
            rows={4}
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="details"
            className="w-full mb-4"
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="text-red-500">{formik.errors.details}</div>
          ) : null}
          <div className="flex justify-between">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center self-end p-0.5 my-5 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
              disabled={loadingCash}
            >
              <span className="relative px-7 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {loadingCash ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Cash Pay"
                )}
              </span>
            </button>
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-0.5 my-5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              onClick={onlinePayment}
              disabled={loadingOnline}
            >
              <span className="relative px-7 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {loadingOnline ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Online Pay"
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
