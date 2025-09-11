import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { userAPI } from "../API";
import Input from "./Input";

const EditProfile = ({ user }) => {
  const [profile, setProfile] = useState({ 
    firstName: "", 
    lastName: "", 
    phone: "", 
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
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
          pincode: data.pincode || ""
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [user._id]);

  const handleUpdateProfile = async () => {
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

  return (
    <motion.div 
      className="flex flex-col gap-4 p-6 bg-white rounded-3xl shadow-xl max-w-3xl mx-auto"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Contact & Address */}
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

      {/* City / State / Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          value={profile.city}
          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
        />
        <Input
          label="State"
          value={profile.state}
          onChange={(e) => setProfile({ ...profile, state: e.target.value })}
        />
        <Input
          label="Pincode"
          value={profile.pincode}
          onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
        />
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleUpdateProfile}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={saved ? { scale: [1, 1.05, 1] } : {}}
        className="bg-[#d2b3db] text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 disabled:opacity-70 mt-4"
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
