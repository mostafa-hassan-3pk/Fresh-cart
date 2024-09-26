import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Card, Button } from "flowbite-react";
import { cartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    products,
    totalPrice,
    numOfItem,
    updateProductQuantity,
    removeProduct,
    clearCart,
  } = useContext(cartContext);

  return (
    <div className=" min-h-[100vh] bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      {products?.length > 0 ? (
        <div className=" relative mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {products?.map((product) => (
              <div
                key={product._id}
                className="justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <Link to={`/ProductDetails/${product._id}`}>
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-full rounded-lg sm:w-40"
                  />
                </Link>
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      {" "}
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      {product.product.ratingsAverage}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() =>
                          updateProductQuantity(
                            product.product.id,
                            product.count - 1
                          )
                        }
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green-50"
                      >
                        -
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={product.count}
                        min={1}
                      />
                      <span
                        onClick={() =>
                          updateProductQuantity(
                            product.product.id,
                            product.count + 1
                          )
                        }
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-green-500 hover:text-green-50"
                      >
                        +
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm"> {product.price} EGP</p>
                      <svg
                        onClick={() => removeProduct(product.product.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" flex flex-col gap-3 sticky h-full top-20 mt-6  md:mt-0 md:w-1/3 ">
            <div className="rounded-lg border bg-white p-6 shadow-md">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">$129.99</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Number Of Items</p>
                <p className="text-gray-700">{numOfItem}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">{totalPrice} EGP</p>
                </div>
              </div>{" "}
              <Link to="/Payment">
                <button className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-green-50 hover:bg-green-600">
                  Checkout
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={clearCart}
                className="w-full rounded-md bg-red-500 py-1.5 font-medium text-white hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[calc(-210px+100vh)] space-x-3">
          <i className="fa-solid fa-cart-shopping text-5xl text-green-600"></i>
          <p className="text-xl text-gray-700 mt-4">cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
