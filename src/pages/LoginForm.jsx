import React, { useState } from "react";
import { userAPI } from "../API";
import Input from "./Input";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ onLoginSuccess, onSwitchToSignup, loading, setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await userAPI.login({ email, password });
      localStorage.setItem("user", JSON.stringify(data));
      onLoginSuccess(data);
    } catch (err) {
      console.error("Login error:", err);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-xl bg-white"
      >
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="text-2xl font-bold text-center text-[#d2b3db]"
          >
            Welcome Back
          </motion.h2>
          
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={shake ? { x: [0, -10, 10, -10, 0] } : {}}
            transition={shake ? { duration: 0.5 } : { type: "spring", stiffness: 400, damping: 17 }}
            className="bg-[#d2b3db] text-[#e9f3ff] py-3 rounded-xl font-semibold shadow-md transition-all duration-300 disabled:opacity-70 mt-2"
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
              "Login"
            )}
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onSwitchToSignup}
            whileHover={{ scale: 1.05 }}
            className="text-center text-sm text-[#d2b3db] cursor-pointer hover:underline mt-2"
          >
            New user? <span className="font-semibold">Sign up here</span>
          </motion.p>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
