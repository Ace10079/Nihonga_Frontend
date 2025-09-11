import React from "react";
import { motion } from "framer-motion";

const Input = ({ label, type = "text", value, onChange, required = false }) => {
  const isActive = value && value.length > 0;

  return (
    <div className="relative w-full mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className="w-full px-4 pt-5 pb-2 border-2 border-[#e9f3ff]/30 rounded-xl focus:outline-none focus:border-[#d2b3db] bg-white text-[#000] placeholder-transparent transition-all duration-300"
      />

      <motion.label
        className="absolute left-4 text-[#d2b3db] pointer-events-none bg-white px-1 transition-all duration-300"
        animate={{
          y: isActive ? -10 : 12,
          scale: isActive ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {label}
      </motion.label>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d2b3db] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default Input;
