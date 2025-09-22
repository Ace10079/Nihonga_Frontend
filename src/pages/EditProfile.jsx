import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { userAPI } from "../API";
import Input from "./Input";
import { useAuth } from "../context/AuthContext";

// All Indian states with major cities
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

const EditProfile = () => {
  const { user } = useAuth(); // ✅ reactive user
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  // Convert states into dropdown options
  const stateOptions = Object.keys(stateCityData).map((st) => ({
    value: st,
    label: st,
  }));

  // Convert cities into dropdown options (based on selected state)
  const cityOptions =
    profile.state && stateCityData[profile.state]
      ? stateCityData[profile.state].map((ct) => ({ value: ct, label: ct }))
      : [];

  // Fetch user profile when `user` is available
  useEffect(() => {
    if (!user) return; // wait for user to exist
    const fetchUserProfile = async () => {
      try {
        const { data } = await userAPI.get(user._id);
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    setMessage("");
    try {
      await userAPI.update(user._id, profile);
      const updatedUser = { ...user, ...profile };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Profile updated successfully!");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Update profile error:", err);
      setMessage("Failed to update profile");
    }
    setLoading(false);
  };

  if (!user) return <div className="text-center py-6 tenor-sans-regular">Loading profile...</div>;

  return (
    <motion.div
      className="flex flex-col gap-4 p-6 bg-white rounded-3xl shadow-xl max-w-3xl mx-auto tenor-sans-regular"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-2xl font-bold text-center text-black mb-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
      >
        Edit Your Profile
      </motion.h3>

      <AnimatePresence>
        {message && (
          <motion.div
            className={`p-3 rounded-xl border-2 text-center ${
              message.includes("success")
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-red-100 text-red-800 border-red-300"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 tenor-sans-regular">
        <Input
          label="First Name"
          value={profile.firstName}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        />
        <Input
          label="Last Name"
          value={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
      </div>

      {/* Phone & Address */}
      <Input
        label="Phone"
        type="tel"
        value={profile.phone}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
      />
      <Input
        label="Address"
        value={profile.address}
        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
      />

      {/* State Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 tenor-sans-regular">State</label>
        <Select
          options={stateOptions}
          components={animatedComponents}
          value={stateOptions.find((st) => st.value === profile.state) || null}
          onChange={(opt) => setProfile({ ...profile, state: opt.value, city: "" })}
          placeholder="Select or search state..."
          isSearchable
        />
      </div>

      {/* City Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 tenor-sans-regular">City</label>
        <Select
          options={cityOptions}
          components={animatedComponents}
          value={cityOptions.find((ct) => ct.value === profile.city) || null}
          onChange={(opt) => setProfile({ ...profile, city: opt.value })}
          placeholder="Select or search city..."
          isDisabled={!profile.state}
          isSearchable
        />
      </div>

      {/* Pincode */}
      <Input
        label="Pincode"
        value={profile.pincode}
        onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
      />

      {/* Save Button */}
      <motion.button
        onClick={handleUpdateProfile}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={saved ? { scale: [1, 1.05, 1] } : {}}
        className="bg-[#d2b3db] text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 disabled:opacity-70 mt-4 tenor-sans-regular"
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            ⏳
          </motion.span>
        ) : (
          "Save Changes"
        )}
      </motion.button>
    </motion.div>
  );
};

export default EditProfile;
