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
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-purple-600 mb-4 font-semibold hover:underline"
      >
        &larr; Back to Orders
      </button>

      <div className="bg-white p-6 rounded-3xl shadow-lg border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Order ID:</span> {order._id}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Placed on:</span>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Total Amount:</span> ₹{order.totalAmount}
        </p>

        <h3 className="font-semibold text-gray-800 mb-2">Items</h3>
        <div className="mb-4">
          {order.items.map((item) => (
            <div key={item._id} className="flex justify-between py-2 border-b border-gray-200">
              <span>
                {item.productName} ({item.size || "N/A"}) x {item.quantity}
              </span>
              <span className="font-semibold text-purple-600">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
        <div className="text-gray-700 mb-4">
          <p>{order.address.fullName}</p>
          <p>{order.address.street}, {order.address.city}</p>
          <p>{order.address.state} - {order.address.pincode}</p>
          <p>Phone: {order.address.phone}</p>
        </div>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Payment Status:</span> {order.paymentStatus}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Order Status:</span> {order.orderStatus}
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
