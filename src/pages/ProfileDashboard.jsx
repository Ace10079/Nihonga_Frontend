import React, { useState } from "react";
import EditProfile from "./EditProfile";
import OrderHistory from "./OrderHistory";
import { motion } from "framer-motion";

const ProfileDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("profile"); // profile | orders

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg tenor-sans-regular">
      <h2 className="text-2xl font-bold text-center text-black mb-4 tenor-sans-regular">My Account</h2>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 border-b border-gray-200 mb-6">
        {["profile", "orders"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 font-medium rounded-t-lg transition-all ${
              activeTab === tab
                ? "bg-[#d2b3db] text-white shadow-md"
                : "text-gray-500 hover:text-[#d2b3db]"
            }`}
          >
            {tab === "profile" ? "Edit Profile" : "View Orders"}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === "profile" && <EditProfile user={user} />}
        {activeTab === "orders" && (
          <OrderHistory user={user} embedded={true} limit={3} />
        )}
      </motion.div>

      {/* Logout Button */}
      <motion.button
        onClick={onLogout}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-[#d2b3db] text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 tenor-sans-regular"
      >
        Logout
      </motion.button>
    </div>
  );
};

export default ProfileDashboard;
