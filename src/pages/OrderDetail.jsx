import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orderAPI } from "../API";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await orderAPI.getById(id);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="text-center py-6 text-gray-600">Loading order...</div>;

  if (!order)
    return <div className="text-center py-6 text-gray-600">Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-purple-600 mb-6 font-medium hover:underline"
      >
        ← Back to Orders
      </button>

      {/* Card */}
      <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-6)}</h2>
          <span
            className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-sm font-medium rounded-full ${
              order.orderStatus === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.orderStatus === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Placed on:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Total Amount:</span> ₹{order.totalAmount}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
              {order.paymentMethod}
            </span>
          </p>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
          <div className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center px-4 py-3 text-sm"
              >
                <span>
                  {item.productName}{" "}
                  <span className="text-gray-500">
                    ({item.size || "N/A"}) × {item.quantity}
                  </span>
                </span>
                <span className="font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Shipping Address</h3>
          <div className="text-sm text-gray-700 space-y-1 bg-gray-50 rounded-lg p-4">
            <p className="font-medium">{order.address.fullName}</p>
            <p>
              {order.address.street}, {order.address.city}
            </p>
            <p>
              {order.address.state} - {order.address.pincode}
            </p>
            <p>Phone: {order.address.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
