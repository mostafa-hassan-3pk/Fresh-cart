import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { cartContext } from "../../context/cartContext";
import { Helmet } from "react-helmet";
import { Carousel } from "flowbite-react";
import { wishListContext } from "../../context/WishListContext";

const ProductDetails = () => {
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { addProduct } = useContext(cartContext);
  const { id } = useParams();
  const [loadingAddLover, setLoadingAddLover] = useState(false);

  const { setProduct, getWishList, wishlist, removeProduct } =
    useContext(wishListContext);

  const fetchProduct = async (id) => {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => fetchProduct(id));

  const addProductToCart = async () => {
    setLoadingProductId(id);
    try {
      await addProduct(id);
      setLoadingProductId(null);
    } catch (err) {
      setLoadingProductId(null);
    }
  };
  const addToWishlist = async (productId) => {
    setLoadingAddLover(productId);
    try {
      if (wishlist?.includes(productId)) {
        await removeProduct(productId);
      } else {
        await setProduct(productId);
      }

      setLoadingAddLover(null);
    } catch (err) {
      setLoadingAddLover(null);
    }
  };
  useEffect(() => {
    getWishList();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <InfinitySpin
          visible={true}
          width="200"
          color="#0e9f6e"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>{product?.data.data.category.name} </title>
      </Helmet>

      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 pt-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
          <img
                 
                    src={product.data.data.imageCover}
                    alt=""
                    className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                  />

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {" "}
                {product?.data.data.category.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {Array.from({
                    length: Math.floor(product?.data.data.ratingsAverage),
                  }).map((_, idx) => (
                    <svg
                      key={idx}
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-3">
                    {product?.data.data.ratingsAverage}
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                {product?.data.data.description}
              </p>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product?.data.data.price} EGP
                </span>
                <button
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={addProductToCart}
                  disabled={loadingProductId === id}
                >
                  {" "}
                  {loadingProductId === id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                <button
                  onClick={() => {
                    addToWishlist(product.data.data._id);
                    console.log(product.data.data.imageCover);
                  }}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <i
                    className={`fa-solid fa-heart text-2xl cursor-pointer ${
                      wishlist?.includes(product.data.data._id)
                        ? "text-red-500"
                        : "text-gray-700 hover:text-red-500 transition-colors duration-300"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
