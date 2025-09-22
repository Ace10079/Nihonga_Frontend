import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../API";
import { useAuth } from "../context/AuthContext";

const OrderHistory = ({ embedded = false, limit = null }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getByUser(user._id);
        // ✅ if limit is passed, only show last N orders
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(limit ? sorted.slice(0, limit) : sorted);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, limit]);

  if (!user)
    return <div className="text-center py-6 tenor-sans-regular">Please login to see your orders.</div>;
  if (loading)
    return <div className="text-center py-6 text-gray-600 tenor-sans-regular">Loading orders...</div>;
  if (orders.length === 0)
    return <div className="text-center py-6 text-gray-600 tenor-sans-regular">No orders found.</div>;

  return (
    <div className={`${embedded ? "w-full" : "max-w-6xl mx-auto px-4 py-6"}`}>
      {!embedded && (
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center italiana-regular">
          Your Orders
        </h3>
      )}

      {/* ✅ always stack in one column */}
      <div className="space-y-4 tenor-sans-regular">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            {/* Order Info */}
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-800 text-sm">
                Order #{order._id.slice(-6)}
              </h4>
              <span className="text-base font-bold text-purple-600">
                ₹{order.totalAmount}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* Items Preview */}
            <div className="text-sm text-gray-700">
              {order.items.slice(0, 2).map((item) => (
                <p key={item._id} className="truncate">
                  {item.productName} ×{item.quantity}
                </p>
              ))}
              {order.items.length > 2 && (
                <p className="text-xs text-gray-400">
                  + {order.items.length - 2} more items
                </p>
              )}
            </div>

            {/* View Button */}
            <button
              onClick={() => navigate(`/orders/${order._id}`)}
              className="mt-3 self-start border border-purple-600 text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-50 transition"
            >
              View
            </button>
          </motion.div>
        ))}
      </div>

      {/* ✅ Only show "View All Orders" when limited */}
      {limit && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition"
          >
            View All Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
