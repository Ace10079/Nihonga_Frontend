import React, { useState } from 'react';
import { Menu, X, User, Search, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100 shadow-md">
      {/* Top navbar */}
      <div className="relative flex items-center justify-between px-4 py-3">
        {/* Left: Hamburger on mobile, spacer on desktop */}
        <div className="w-10">
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Center: Logo - always centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg">
        <img
    src="/IMG_6381.JPG" // <-- Update this path to your actual image path
    alt="Logo"
    className="h-8 w-auto"
  />
        </div>

        {/* Right: Action buttons */}
        <div className="flex space-x-4 items-center">
          {/* Mobile: Icons */}
          <button className="block md:hidden"><User size={20} /></button>
          <button className="hidden md:block">Account</button>

          <button className="block md:hidden"><Search size={20} /></button>
          <button className="hidden md:block">Search</button>

          <button className="block md:hidden"><ShoppingCart size={20} /></button>
          <button className="hidden md:block">Cart</button>
        </div>
      </div>

      {/* Navigation links row - desktop only */}
      <div className="hidden md:flex justify-center space-x-6 py-2 bg-white border-t">
  {[
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/collections", label: "Collections" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" }
  ].map(link => (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) =>
        `relative transition duration-300 ease-in-out hover:text-blue-600 ${
          isActive ? "font-semibold text-blue-600" : ""
        }`
      }
    >
      <span className="group">
        {link.label}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-600"></span>
      </span>
    </NavLink>
  ))}
</div>

      {/* Mobile slide-in menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Collections</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
