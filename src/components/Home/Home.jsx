import axios from "axios";
import { useState, useCallback, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { InfinitySpin } from "react-loader-spinner";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import { wishListContext } from "../../context/WishListContext";
import HomeSlider from "../Home-Slider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

const Products = () => {
  const [loadingAddProduct, setLoadingAddProduct] = useState(false);
  const [loadingAddLover, setLoadingAddLover] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { addProduct } = useContext(cartContext);
  const { setProduct, getWishList, wishlist, removeProduct } =
    useContext(wishListContext);

  const getAllProducts = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return data.data;
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery("products", getAllProducts);

  const addProductToCart = async (productId) => {
    setLoadingAddProduct(productId);
    try {
      await addProduct(productId);
      setLoadingAddProduct(null);
    } catch (err) {
      setLoadingAddProduct(null);
    }
  };

  const handleSearch = useCallback(
    debounce((event) => {
      setSearchTerm(event.target.value);
    }, 300),
    []
  );

  const filteredProducts = products?.filter((product) =>
    product.title
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className=" p-4 min-h-[100vh] bg-gray-100">
      

        {isLoading ? (
          <div className="h-[calc(-112px+100vh)] flex justify-center items-center">
            <InfinitySpin
              visible={true}
              width="200"
              color="#0e9f6e"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : error ? (
          <div className="min-h-[calc(-112px+100vh)] flex justify-center items-center">
            <p className="text-red-500">{error.message}</p>{" "}
          </div>
        ) : (
          <>
            <HomeSlider />
            <CategorySlider />
            <div className="flex justify-center mt-10 ">
              <input
                type="text"
                placeholder="Search products..."
                onChange={handleSearch}
                className="px-4 py-2 border rounded-md w-full max-w-md shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className=" items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-[90%] m-auto mt-10">
              {filteredProducts?.length > 0 ? (
                filteredProducts?.map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-md rounded-lg max-w-sm
                    dark:bg-gray-800 dark:border-gray-700"
                  >
                    <Link to={`/ProductDetails/${product._id}`}>
                      <img
                        className="rounded-t-lg px-8 pb-2"
                        src={product.imageCover}
                        alt={product.description}
                      />
                    </Link>
                    <div className="px-5 pb-5">
                      <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className=" flex justify-between items-center mt-2.5 mb-5">
                        <div className="flex items-center  ">
                          {Array.from({
                            length: Math.floor(product.ratingsAverage),
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
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            {product.ratingsAverage}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <i
                            onClick={() => {
                              addToWishlist(product._id);
                            }}
                            className={`fa-solid fa-heart text-2xl cursor-pointer ${
                              wishlist?.includes(product._id)
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500 transition-colors duration-300"
                            }`}
                          ></i>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[calc(0.9rem+.9vw)] font-bold text-gray-900 dark:text-white">
                          {product.price} EGP
                        </span>
                        <button
                          onClick={() => addProductToCart(product._id)}
                          disabled={
                            !loadingAddProduct
                              ? loadingAddProduct
                              : loadingAddProduct !== product._id
                          }
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {" "}
                          {loadingAddProduct === product._id ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            "Add to Cart"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center">
                  <p className="text-gray-700 dark:text-gray-400">
                    No products found.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
