import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Authenticate } from "./AouthContext";

export const wishListContext = createContext();

const WishListContextProvider = ({ children }) => {
  const { token } = useContext(Authenticate);
  const [numOfWishListItem, setNumOfWishListItem] = useState(0);
  const [products, setProducts] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const setProduct = async (productId) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );await getWishList();
      setWishlist(data?.data);
      
     
      toast.success("Product added to Wish-List successfully!");

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getWishList = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setNumOfWishListItem(data.count);
      setProducts(data.data);
      setWishlist(data?.data.map((item) => item.id));

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const removeProduct = async (productId) => {
    try {
     const {data}= await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getWishList();
      setWishlist(data?.data)
      toast.success("Product removed from Wish-List successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (token != null) {
      getWishList();
    }
  }, [token]);
  return (
    <wishListContext.Provider
      value={{ setProduct, removeProduct, getWishList, products, numOfWishListItem ,wishlist}}
    >
      {children}
    </wishListContext.Provider>
  );
};

export default WishListContextProvider;
