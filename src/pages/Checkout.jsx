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
  const [isAddressLoaded, setIsAddressLoaded] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const { data: cartData } = await cartAPI.get(user._id);
        setCart(cartData);

        const { data: userInfo } = await userAPI.get(user._id);
        setUserData(userInfo);

        if (!isAddressLoaded) {
          setAddress({
            fullName: `${userInfo.firstName || ""} ${userInfo.lastName || ""}`,
            address: userInfo.address || "",
            city: userInfo.city || "",
            state: userInfo.state || "",
            pincode: userInfo.pincode || "",
            phone: userInfo.phone || "",
          });
          setIsAddressLoaded(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [user, isAddressLoaded]);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

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
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600">Please log in to proceed with checkout.</p>
      </div>
    );
  }

  if (!cart || !userData)
    return <div className="max-w-4xl mx-auto p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-black">Checkout</h1>

      {/* Shipping Address */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-black">Shipping Address</h2>

        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#d2b3db]"
          placeholder="Full Name"
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        />

        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#d2b3db]"
          placeholder="Phone"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        />

        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#d2b3db]"
          placeholder="Street / Address"
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#d2b3db]"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#d2b3db]"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </div>

        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#d2b3db]"
          placeholder="Pincode"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />

        <button
          onClick={saveAddress}
          className="mt-3 bg-[#d2b3db] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Save Address
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-black">Order Summary</h2>
        {cart.items.map((item) => (
          <div key={item.productId._id + item.size} className="flex justify-between py-2 border-b last:border-b-0">
            <span className="text-black">{item.productId.name} (x{item.quantity})</span>
            <span className="text-black">₹{item.productId.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4 text-black">
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
