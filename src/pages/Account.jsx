import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileDashboard from "./ProfileDashboard";
import WelcomeScreen from "./WelcomeScreen";
import { useAuth } from "../context/AuthContext";

function Account() {
  const { user, loading, logout } = useAuth();
  const [step, setStep] = useState("welcome"); // welcome | login | signup | dashboard
  const [direction, setDirection] = useState(0); // 0: forward, 1: backward

  // Update step when user changes
  useEffect(() => {
    if (user) setStep("dashboard");
    else setStep("welcome");
  }, [user]);

  const navigateTo = (newStep) => {
    setDirection(newStep === "login" || newStep === "signup" ? 0 : 1);
    setStep(newStep);
  };

  const handleLogout = () => {
    logout();
    setStep("welcome");
  };

  const pageVariants = {
    initial: (direction) => ({ opacity: 0, x: direction === 0 ? 80 : -80, scale: 0.95 }),
    in: { opacity: 1, x: 0, scale: 1 },
    out: (direction) => ({ opacity: 0, x: direction === 0 ? -80 : 80, scale: 0.95 }),
  };

  const pageTransition = { type: "spring", stiffness: 220, damping: 25, duration: 0.5 };

  if (loading) return <div className="text-center py-6">Checking authentication...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
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
                setLoading={(val) => {}}
                onLoginSuccess={() => setStep("dashboard")}
                onSwitchToSignup={() => navigateTo("signup")}
              />
            )}

            {step === "signup" && (
              <SignupForm
                setLoading={(val) => {}}
                onSignupSuccess={() => setStep("dashboard")}
                onSwitchToLogin={() => navigateTo("login")}
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
