import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileDashboard from "./ProfileDashboard";
import WelcomeScreen from "./WelcomeScreen";

function Account() {
  const [step, setStep] = useState("welcome"); // welcome | login | signup | dashboard
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(0); // 0: forward, 1: backward

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setStep("dashboard");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    setStep("welcome");
  };

  const navigateTo = (newStep) => {
    setDirection(newStep === "login" || newStep === "signup" ? 0 : 1);
    setStep(newStep);
  };

  // Page transition animations
  const pageVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction === 0 ? 80 : -80,
      scale: 0.95,
    }),
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: (direction) => ({
      opacity: 0,
      x: direction === 0 ? -80 : 80,
      scale: 0.95,
    }),
  };

  const pageTransition = {
    type: "spring",
    stiffness: 220,
    damping: 25,
    duration: 0.5,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      {/* Card container */}
      <motion.div
        className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 18 }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            {step === "welcome" && (
              <WelcomeScreen
                onLogin={() => navigateTo("login")}
                onSignup={() => navigateTo("signup")}
              />
            )}

            {step === "login" && (
              <LoginForm
                onLoginSuccess={(userData) => {
                  setUser(userData);
                  setStep("dashboard");
                }}
                onSwitchToSignup={() => navigateTo("signup")}
                loading={loading}
                setLoading={setLoading}
              />
            )}

            {step === "signup" && (
              <SignupForm
                onSignupSuccess={(userData) => {
                  setUser(userData);
                  setStep("dashboard");
                }}
                onSwitchToLogin={() => navigateTo("login")}
                loading={loading}
                setLoading={setLoading}
              />
            )}

            {step === "dashboard" && user && (
              <ProfileDashboard user={user} onLogout={handleLogout} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Account;
