import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { orderAPI } from "../API";

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getByUser(user._id);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user._id]);

  if (loading) {
    return <div className="text-center py-6 text-gray-600">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-6 text-gray-600">No orders found.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-bold text-black mb-4 text-center">Order History</h3>

      {orders.map((order) => (
        <motion.div
          key={order._id}
          className="bg-white border border-[#d2b3db] rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-800">Order #{order._id.slice(-6)}</span>
            <span className="text-[#d2b3db] font-semibold">₹{order.totalAmount}</span>
          </div>
          <div className="text-sm text-gray-500 mb-3">
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div className="flex flex-col gap-2">
            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between text-gray-700">
                <span>{item.productName} (x{item.quantity})</span>
                <span className="text-[#d2b3db]">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderHistory;
