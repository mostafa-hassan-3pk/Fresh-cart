import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Card, Button } from "flowbite-react";
import { wishListContext } from "../../context/WishListContext";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";

const WishList = () => {
  const { products, numOfItem, removeProduct } = useContext(wishListContext);
  const { addProduct } = useContext(cartContext);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const addProductToCart = async (productId) => {
    setLoadingProductId(productId);
    try {
      await addProduct(productId);
      setLoadingProductId(null);
    } catch (err) {
      toast.error(err.message);
      setLoadingProductId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
      <div className="w-[90%] m-auto p-4 mt-14">
        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">
            Favourites
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
            {numOfItem} items
          </p>
        </div>
        {products?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] m-auto mt-10">
              {products.map((product) => (
                <div className="flex flex-col"  key={product.id}>
                  <div className="relative">
                    <img
                      className=" w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <button
                      onClick={() => removeProduct(product.id)}
                      aria-label="close"
                      className="top-2 right-6 border-0 outline-none focus:ring-green-800 dark:bg-white dark:text-gray-800 absolute p-1.5 text-red-600"
                    >
                      <i className=" fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex justify-center items-center">
                      <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </p>
                    </div>
                    
                  </div>
                  <div
                    id="menu2"
                    className=" flex flex-col jusitfy-start items-start "
                  >
                    <div className="flex items-center mt-6  ">
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
                    <div className="mt-6">
                      <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                        {" "}
                        {product.price} EGP
                      </p>
                    </div>
                    <div className="flex jusitfy-between flex-col  items-center mt-8 w-full space-y-4 lg:space-y-0">
                      <div className="w-full">
                        <Link to={`/ProductDetails/${product._id}`}>
                          <button
                            type="button"
                            className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          >
                            More information
                          </button>
                        </Link>
                      </div>
                      <div className="w-full">
                        <button
                          onClick={() => addProductToCart(product.id)}
                          className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                        >
                          <span className="relative block w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {loadingProductId === product._id ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              "Add to Cart"
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[calc(-210px+100vh)] space-x-3">
            <i className="fa-solid fa-cart-shopping text-5xl text-green-600"></i>
            <p className="text-xl text-gray-700 mt-4">Wish-List is empty.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
