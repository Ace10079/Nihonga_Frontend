import React from "react";
import { motion } from "framer-motion";

const WelcomeScreen = ({ onLogin, onSignup }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-6 items-center"
    >
      <h2 className="text-3xl font-bold text-center text-[#b39bc8] tenor-sans-regular">
        Welcome to Nihonga
      </h2>
      <p className="text-gray-600 text-center max-w-xs tenor-sans-regular">
        Sign in to explore our collections, manage your account, and enjoy exclusive perks!
      </p>
      
      <div className="flex flex-col gap-4 w-full max-w-xs tenor-sans-regular">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogin}
          className="w-full bg-[#d2b3db] text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition"
        >
          Login
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSignup}
          className="w-full bg-[#e9f3ff] text-[#d2b3db] py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition tenor-sans-regular"
        >
          Signup
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
