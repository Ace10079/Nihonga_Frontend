// src/pages/Checkout.jsx
import React, { useEffect, useState, useMemo } from "react";
import { cartAPI, orderAPI, userAPI } from "../API";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ✅ All Indian states with major cities
const stateCityData = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belagavi"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Delhi: ["New Delhi", "Dwarka", "Saket", "Karol Bagh"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota"],
  UttarPradesh: ["Lucknow", "Kanpur", "Varanasi", "Noida", "Ghaziabad"],
  WestBengal: ["Kolkata", "Siliguri", "Howrah", "Durgapur", "Asansol"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  AndhraPradesh: ["Vijayawada", "Visakhapatnam", "Guntur", "Nellore"],
  MadhyaPradesh: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  JammuKashmir: ["Srinagar", "Jammu", "Leh"],
  HimachalPradesh: ["Shimla", "Manali", "Dharamshala"],
  Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
};

const animatedComponents = makeAnimated();

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

  const [successMessage, setSuccessMessage] = useState(""); // ✅ animated success msg
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch cart + user data
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

  // Calculate subtotal
  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  // Dropdown Options
  const stateOptions = Object.keys(stateCityData).map((st) => ({
    value: st,
    label: st,
  }));
  const cityOptions =
    address.state && stateCityData[address.state]
      ? stateCityData[address.state].map((ct) => ({ value: ct, label: ct }))
      : [];

  // Save Address
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

      setSuccessMessage("✅ Address updated successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  // Place Order
  const placeOrder = async () => {
    if (!cart?.items?.length) return;

    if (!address.phone || !address.address || !address.city || !address.state || !address.pincode)
      return;

    try {
      setLoading(true);
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

      setSuccessMessage("🎉 Order placed successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/orders");
      }, 2000);
    } catch (err) {
      console.error("Place Order Error:", err);
    } finally {
      setLoading(false);
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
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6 relative">
      <h1 className="text-3xl font-bold text-black">Checkout</h1>

      {/* ✅ Success Animation */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2"
          >
            ✅ {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* State Dropdown */}
        <Select
          options={stateOptions}
          components={animatedComponents}
          value={stateOptions.find((st) => st.value === address.state) || null}
          onChange={(opt) => setAddress({ ...address, state: opt.value, city: "" })}
          placeholder="Select State"
          isSearchable
        />

        {/* City Dropdown */}
        <Select
          options={cityOptions}
          components={animatedComponents}
          value={cityOptions.find((ct) => ct.value === address.city) || null}
          onChange={(opt) => setAddress({ ...address, city: opt.value })}
          placeholder="Select City"
          isDisabled={!address.state}
          isSearchable
        />

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
          <div
            key={item.productId._id + item.size}
            className="flex justify-between py-2 border-b last:border-b-0"
          >
            <span className="text-black">
              {item.productId.name} (x{item.quantity})
            </span>
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
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;
