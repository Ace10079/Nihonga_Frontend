import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../API";
import { useAuth } from "../context/AuthContext"; // ✅ import context

const OrderHistory = () => {
  const { user } = useAuth(); // ✅ reactive user from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // wait for user to exist
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
  }, [user]); // ✅ re-run when user changes

  if (!user) return <div className="text-center py-6">Please login to see your orders.</div>;
  if (loading) return <div className="text-center py-6 text-gray-600">Loading orders...</div>;
  if (orders.length === 0) return <div className="text-center py-6 text-gray-600">No orders found.</div>;

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Your Orders
      </h3>

      {orders.map((order) => (
        <motion.div
          key={order._id}
          className="bg-gradient-to-r from-purple-50 via-pink-50 to-white border border-purple-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">
                Order #{order._id.slice(-6)}
              </h4>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="text-xl font-bold text-purple-600">
              ₹{order.totalAmount}
            </span>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {order.items.slice(0, 2).map((item) => (
              <div key={item._id} className="flex justify-between text-gray-700">
                <span>
                  {item.productName} (x{item.quantity})
                </span>
                <span className="font-semibold text-purple-600">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
            {order.items.length > 2 && (
              <p className="text-sm text-gray-400">
                + {order.items.length - 2} more items
              </p>
            )}
          </div>

          <button
            onClick={() => navigate(`/orders/${order._id}`)}
            className="w-full bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            View Order
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderHistory;
