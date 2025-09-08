import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { userAPI, orderAPI } from "../API";

function Account() {
  const [step, setStep] = useState("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
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
  const [showRecoverForm, setShowRecoverForm] = useState(false);

  // Animations
  const fade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  });
  const slideIn = useSpring({
    transform: "translateY(0px)",
    from: { transform: "translateY(20px)" },
    config: config.gentle,
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setProfile({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        phone: parsedUser.phone || "",
        address: parsedUser.address || "",
        city: parsedUser.city || "",
        state: parsedUser.state || "",
        pincode: parsedUser.pincode || "",
      });
      const hasProfile = parsedUser.firstName && parsedUser.lastName;
      setStep(hasProfile ? "loggedin" : "profile");
      setEmail(parsedUser.email);
    }
  }, []);

  // Fetch orders when user logs in
  useEffect(() => {
    if (user?._id) {
      orderAPI.getByUser(user._id)
        .then((res) => setOrders(res.data))
        .catch(() => setOrders([]));
    }
  }, [user]);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await userAPI.login({ email, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setProfile({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        phone: res.data.phone || "",
        address: res.data.address || "",
        city: res.data.city || "",
        state: res.data.state || "",
        pincode: res.data.pincode || "",
      });
      const hasProfile = res.data.firstName && res.data.lastName;
      setStep(hasProfile ? "loggedin" : "profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await userAPI.create({ ...profile, email, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setStep("profile");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Save profile
  const saveProfile = async () => {
    setLoading(true);
    try {
      const res = await userAPI.update(user._id, profile);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setStep("loggedin");
    } catch (err) {
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setEmail("");
    setPassword("");
    setProfile({
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    setStep("choose");
  };

  // Password recovery
  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      alert("Password recovery instructions sent to your email");
      setShowRecoverForm(false);
    } catch (err) {
      alert("Failed to send recovery instructions");
    } finally {
      setLoading(false);
    }
  };

  // Reusable input component
  const Input = ({ label, type = "text", value, onChange, required = false }) => (
    <div className="relative">
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <label className="absolute left-4 -top-2 bg-white px-1 text-gray-500 text-sm transition-all">
        {label}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-white p-4">
      <div className="w-full max-w-md relative">
        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Step: Logged In */}
        {step === "loggedin" && user && (
          <animated.div style={{ ...fade, ...slideIn }} className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-light text-gray-800">Welcome Back</h2>
              <p className="text-lg text-gray-700 mt-2">{user.firstName} {user.lastName}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setStep("profile")}
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setStep("orders")}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all shadow"
              >
                View My Orders
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 text-gray-600 hover:text-gray-800 transition-all"
              >
                Logout
              </button>
            </div>
          </animated.div>
        )}

        {/* Step: Orders */}
        {step === "orders" && (
          <animated.div style={{ ...fade, ...slideIn }} className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-light text-gray-800 mb-4 text-center">My Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center">No orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <p className="text-gray-700">
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p className="text-gray-700">
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p className="text-gray-700">
                      <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <strong>Total:</strong> ₹{order.total}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 text-center">
              <button
                onClick={() => setStep("loggedin")}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                Back to Profile
              </button>
            </div>
          </animated.div>
        )}

        {/* Step: Choose */}
        {step === "choose" && (
          <animated.div style={{ ...fade, ...slideIn }} className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <h1 className="text-3xl font-light text-gray-800 mb-3">Welcome</h1>
            <p className="text-gray-600 mb-6">Sign in or create an account to continue</p>
            <div className="space-y-4">
              <button
                onClick={() => setStep("login")}
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow"
              >
                Login
              </button>
              <button
                onClick={() => setStep("signup")}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all shadow"
              >
                Create Account
              </button>
            </div>
          </animated.div>
        )}

        {/* Step: Login */}
        {step === "login" && !showRecoverForm && (
          <animated.div style={{ ...fade, ...slideIn }} className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-light text-gray-800 mb-4 text-center">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <label className="absolute left-4 -top-2 bg-white px-1 text-gray-500 text-sm transition-all">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowRecoverForm(true)}
                  className="absolute right-0 -bottom-6 text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow"
              >
                Login
              </button>
            </form>
            <div className="mt-6 text-center text-gray-600">
              <span>Don't have an account? </span>
              <button className="text-blue-600 hover:underline" onClick={() => setStep("signup")}>
                Create one
              </button>
            </div>
          </animated.div>
        )}

        {/* Step: Password Recovery */}
        {step === "login" && showRecoverForm && (
          <animated.div style={{ ...fade, ...slideIn }} className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-light text-gray-800 mb-4 text-center">Recover Password</h1>
            <form onSubmit={handleRecoverPassword} className="space-y-4">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow"
              >
                Recover
              </button>
            </form>
            <div className="mt-6 text-center text-gray-600">
              <span>Remember your password? </span>
              <button className="text-blue-600 hover:underline" onClick={() => setShowRecoverForm(false)}>
                Back to login
              </button>
            </div>
          </animated.div>
        )}

        {/* Step: Signup */}
        {step === "signup" && (
          <animated.div style={{ ...fade, ...slideIn }} className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-light text-gray-800 mb-4 text-center">Create Account</h1>
            <form onSubmit={handleSignUp} className="space-y-4">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} required />
                <Input label="Last Name" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} required />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow"
              >
                Create Account
              </button>
            </form>
          </animated.div>
        )}

        {/* Step: Profile */}
        {step === "profile" && (
          <animated.div style={{ ...fade, ...slideIn }} className="bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-light text-gray-800 mb-4 text-center">Complete Profile</h1>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} required />
                <Input label="Last Name" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} required />
              </div>
              <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              <Input label="Address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
                <Input label="State" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} />
              </div>
              <Input label="Pincode" value={profile.pincode} onChange={(e) => setProfile({ ...profile, pincode: e.target.value })} />
              <div className="flex justify-between pt-2">
                <button
                  onClick={saveProfile}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow"
                >
                  Save Profile
                </button>
                <button
                  onClick={() => setStep("loggedin")}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-all"
                >
                  Skip
                </button>
              </div>
            </div>
          </animated.div>
        )}
      </div>
    </div>
  );
}

export default Account;
