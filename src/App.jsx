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

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* 🔒 Navbar stays always at top */}
        <Navbar />

        {/* ✅ Page content below the Navbar */}
        <main className="flex-grow p-4">
          <Routes>
            
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/product/:id" element={<ProductDetail/>} />{" "}
              <Route path="/collections/:id" element={<CollectionDetail />} />
              <Route path="/account" element={<Account/>} />
              <Route path="/checkout" element={<Checkout/>} />
<Route path="/cart" element={<Cart/>} />
              {/* ✅ Add this */}
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
