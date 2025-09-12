import React, { useState } from "react";
import { userAPI } from "../API";
import Input from "./Input";
import { useAuth } from "../context/AuthContext";

const SignupForm = ({ onSignupSuccess, onSwitchToLogin, setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await userAPI.create({ email, password, firstName, lastName });
      login(data.user || data);
      onSignupSuccess();
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Email may already exist.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>
      <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
        Sign Up
      </button>

      <p onClick={onSwitchToLogin} className="text-center text-sm text-blue-500 cursor-pointer hover:underline">
        Already have an account? Login
      </p>
    </form>
  );
};

export default SignupForm;
