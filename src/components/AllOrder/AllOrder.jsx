import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const AllOrder = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = jwtDecode(localStorage.getItem("token"));
  async function getAllOrder() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data);
      setLoading(false);
      console.log(data);
      
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllOrder();
  }, []);
  
  if (loading) {
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
  return <section className="mt-24">
    <div className="w-full md:w-[80%] mx-auto">
        {orders? orders.map((order , idx) => <div key={idx}>
            <div className=" p-5 mb-3 bg-slate-200 ">
                <div className="flex justify-between items-center">
                    <h3>Order # {order.id}</h3>
                    <p>{order.paymentMethodType}</p>
                </div>
                <div className="flex gap-3">
                    <p>Total: {order.totalOrderPrice}EGP</p>
                    <p>Date: {order.updatedAt}</p>
                </div>
                <div className="flex gap-3">
                    {order.cartItems?.map((product, idx) => (
                        <Link to={`/ProductDetails/${product.product.id}`} key={idx}  className=" rounded-lg border bg-white p-6 shadow-md">
                        
                            <p>{product.product.title}</p>
                            <p>Quantity: {product.count}</p>

                         </Link>
                    ))}
                </div>
            </div>
            </div>
            ):<></>}
    </div>

  </section>;
};

export default AllOrder;
