import { createHashRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthenticateProvider from "./context/AouthContext";
import CartContextProvider from "./context/cartContext";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Layout from "./components/Layout/Layout";
import SignIn from "./components/Sign in/SignIn";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import WishList from "./components/Wish List/WishList";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import ProtectedRout from "./components/ProtectedRout/ProtectedRout";
import Categories from "./components/Categories/Categories";
import ForgotPassword from "./components/Forgit-password/Forgitten";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Payment from "./components/Paymant/Payment";
import WishListContextProvider from "./context/WishListContext";
import AllOrder from "./components/AllOrder/AllOrder";
import GoBackRout from "./components/GoBackRout/GoBackRout";

export default function App() {
  const routes = new QueryClient();

  const myRouter = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <SignIn /> },
        { path: "/Home", element: <Home /> },
        {
          path: "/Cart",
          element: (
            <ProtectedRout>
              <Cart />
            </ProtectedRout>
          ),
        },
        {
          path: "/WishList",
          element: (
            <ProtectedRout>
              <WishList />
            </ProtectedRout>
          ),
        },
        {
          path: "/Payment",
          element: (
            <ProtectedRout>
              <Payment />
            </ProtectedRout>
          ),
        },
        { path: "/Products", element: <Products /> },
        { path: "/ProductDetails/:id", element: <ProductDetails /> },
        { path: "/Categories", element: <Categories /> },
        { path: "/Brands", element: <Brands /> },
        {
          path: "/SignIn",
          element: (
            <GoBackRout>
              <SignIn />
            </GoBackRout>
          ),
        },
        {
          path: "/Register",
          element: (
            <GoBackRout>
              <Register />
            </GoBackRout>
          ),
        },
        {
          path: "/ForgotPassword",
          element: (
            <GoBackRout>
              <ForgotPassword />
            </GoBackRout>
          ),
        },
        { path: "/AllOrder", element: <AllOrder /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={routes}>
      <AuthenticateProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <Toaster />
            <RouterProvider router={myRouter} />
          </WishListContextProvider>
        </CartContextProvider>
      </AuthenticateProvider>
    </QueryClientProvider>
  );
}
