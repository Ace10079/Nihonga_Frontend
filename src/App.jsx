import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* 🔒 Navbar stays always at top */}
        <Navbar />

        {/* ✅ Page content below the Navbar */}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collections/>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
