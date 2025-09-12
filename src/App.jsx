import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ProductDetail from "./pages/ProductDetail";
import CollectionDetail from "./pages/CollectionDetail";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";

import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/collections/:id" element={<CollectionDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />

            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrderHistory user={user} /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
