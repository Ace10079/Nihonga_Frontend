import React, { useState } from 'react';
import { Menu, X, User, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200 z-50 relative">
      {/* Top Navbar */}
      <div className="relative flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left: Hamburger */}
        <div className="w-10">
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg">
          <img src="/IMG_6381.JPG" alt="Logo" className="h-10 w-auto rounded-xl shadow" />
        </div>

        {/* Right: Actions */}
        <div className="flex space-x-4 items-center text-gray-700">
          <button
            onClick={() => navigate('/account')}
            className="hover:text-black transition hidden md:block font-medium"
          >
            Account
          </button>
          <button onClick={() => navigate('/account')} className="md:hidden">
            <User size={20} />
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="hover:text-black transition hidden md:block font-medium"
          >
            Search
          </button>
          <button onClick={() => setShowSearch(!showSearch)} className="md:hidden">
            <Search size={20} />
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="hover:text-black transition hidden md:block font-medium"
          >
            Cart
          </button>
          <button onClick={() => navigate('/cart')} className="md:hidden">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          showSearch ? 'max-h-24 py-3' : 'max-h-0'
        } bg-white px-4 border-t border-b border-gray-200 shadow-inner`}
      >
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center gap-8 py-3 bg-white text-sm font-medium tracking-wide relative z-20">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative text-gray-600 hover:text-black transition group ${
              isActive ? 'text-black font-semibold' : ''
            }`
          }
        >
          Home
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-black"></span>
        </NavLink>

        {/* Shop Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-gray-600 hover:text-black transition font-medium">
            Shop <ChevronDown size={18} />
          </button>

          <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 p-4
            opacity-0 invisible translate-y-2 scale-95 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100
            transition-all duration-300 ease-out z-50 space-y-3"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Collections</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><NavLink to="/shop/summer" className="hover:text-black block">Summer Collection</NavLink></li>
                <li><NavLink to="/shop/party" className="hover:text-black block">Party Wear</NavLink></li>
                <li><NavLink to="/shop/casual" className="hover:text-black block">Casual Fit</NavLink></li>
                <li><NavLink to="/shop/ethnic" className="hover:text-black block">Ethnic</NavLink></li>
              </ul>
            </div>
          </div>
        </div>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative text-gray-600 hover:text-black transition group ${
              isActive ? 'text-black font-semibold' : ''
            }`
          }
        >
          About Us
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-black"></span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative text-gray-600 hover:text-black transition group ${
              isActive ? 'text-black font-semibold' : ''
            }`
          }
        >
          Contact Us
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-black"></span>
        </NavLink>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Slide-in Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white z-[1000] shadow-lg transform transition-transform duration-300 ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex bg-white justify-between items-center px-4 py-3 border-b">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col p-4 space-y-4 text-gray-800 text-base font-medium bg-white h-screen">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>

              {/* Shop Collapsible */}
              <details className="group">
                <summary className="cursor-pointer list-none">Shop</summary>
                <div className="pl-4 pt-2 flex flex-col gap-2">
                  <NavLink to="/shop/summer" onClick={() => setIsMenuOpen(false)}>Summer Collection</NavLink>
                  <NavLink to="/shop/party" onClick={() => setIsMenuOpen(false)}>Party Wear</NavLink>
                  <NavLink to="/shop/casual" onClick={() => setIsMenuOpen(false)}>Casual Fit</NavLink>
                  <NavLink to="/shop/ethnic" onClick={() => setIsMenuOpen(false)}>Ethnic</NavLink>
                </div>
              </details>

              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
              <NavLink to="/account" onClick={() => setIsMenuOpen(false)}>Account</NavLink>
              <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</NavLink>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
