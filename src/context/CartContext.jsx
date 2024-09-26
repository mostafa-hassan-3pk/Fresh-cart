import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Authenticate } from "./AouthContext";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { token } = useContext(Authenticate);
  const [numOfItem, setNumOfItem] = useState(0);
  const [products, setProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(0);

  const addProduct = async (productId) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getNumOfProduct();
      toast.success("Product added to cart successfully!");
      return data;
    } catch (error) {
      toast.error(error.response.data.message );
    }
  };
  const getNumOfProduct = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setNumOfItem(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const removeProduct = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getNumOfProduct();
      toast.success("Product removed from cart successfully!" ,{id:"Delete"});
    } catch (error) {
      toast.error(error.response.data.message ,{id:"Error"});
    }
  };
  const updateProductQuantity = async (productId, quantity) => {
    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: quantity,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getNumOfProduct();
      toast.success("Product quantity updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const clearCart = async () => {
    try {
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setNumOfItem(0);
      setProducts(null);
      setTotalPrice(0);
      setCartId(0);
      toast.success("Cart cleared successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token != null) {
      getNumOfProduct();
    }
  }, [token]);
  return (
    <cartContext.Provider
      value={{
        addProduct,
        products,
        numOfItem,
        totalPrice,
        updateProductQuantity,
        removeProduct,
        clearCart,
        cartId,
        setNumOfItem,
        setProducts,
        setTotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
