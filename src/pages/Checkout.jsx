import React, { useEffect, useState, useMemo } from "react";
import { cartAPI, orderAPI, userAPI } from "../API";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch cart & user details
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const { data: cartData } = await cartAPI.get(user._id);
        setCart(cartData);

        const { data: userInfo } = await userAPI.get(user._id);
        setUserData(userInfo);

        setAddress({
          fullName: `${userInfo.firstName || ""} ${userInfo.lastName || ""}`,
          address: userInfo.address || "",
          city: userInfo.city || "",
          state: userInfo.state || "",
          pincode: userInfo.pincode || "",
          phone: userInfo.phone || "",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [user]);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + price * item.quantity;
    }, [cart]);
  }, [cart]);

  // Save updated address to user profile
  const saveAddress = async () => {
    try {
      const payload = {
        firstName: address.fullName.split(" ")[0] || "",
        lastName: address.fullName.split(" ")[1] || "",
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        phone: address.phone,
      };
      await userAPI.update(user._id, payload);
      alert("Address updated successfully!");
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Failed to save address.");
    }
  };

  // Place order
  const placeOrder = async () => {
    if (!cart?.items?.length) return alert("Your cart is empty!");
    if (!address.phone || !address.address || !address.city || !address.state || !address.pincode)
      return alert("Please fill in all address fields.");

    try {
      const payload = {
        userId: user._id,
        customerName: address.fullName,
        address: {
          fullName: address.fullName,
          phone: address.phone,
          street: address.address,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          productName: item.productId.name,
          size: item.size,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalAmount: subtotal,
        paymentMethod: "COD",
        notes: "",
      };

      await orderAPI.place(payload);
      await cartAPI.clear(user._id);

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Place Order Error:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600">Please log in to proceed with checkout.</p>
      </div>
    );
  }

  if (!cart || !userData)
    return <div className="max-w-4xl mx-auto p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Shipping Address */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>

        <input
          type="text"
          className="w-full border p-3 rounded-lg mb-2"
          placeholder="Full Name"
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        />

        <input
          type="text"
          className="w-full border p-3 rounded-lg mb-2"
          placeholder="Phone"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        />

        <input
          type="text"
          className="w-full border p-3 rounded-lg mb-2"
          placeholder="Street / Address"
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </div>

        <input
          type="text"
          className="w-full border p-3 rounded-lg mt-2"
          placeholder="Pincode"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />

        <button
          onClick={saveAddress}
          className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Save Address
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cart.items.map((item) => (
          <div
            key={item.productId._id + item.size}
            className="flex justify-between border-b py-2"
          >
            <span>
              {item.productId.name} (x{item.quantity})
            </span>
            <span>₹{item.productId.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="w-full bg-black text-white py-3 rounded-lg text-lg"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
