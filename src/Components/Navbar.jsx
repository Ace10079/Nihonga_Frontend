import React, { useState, useEffect } from "react";
import { Menu, X, User, Search, ShoppingCart, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { collectionAPI } from "../API";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [collections, setCollections] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await collectionAPI.getAll();
        setCollections(data);
      } catch (error) {
        console.error("Failed to load collections:", error);
      }
    };
    fetchCollections();
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div className={`bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 z-50 sticky top-0 transition-all duration-300 tenor-sans-regular ${isScrolled ? 'py-1' : 'py-0'}`}>
      {/* Top Navbar */}
      <div className="relative flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left: Hamburger */}
        <div className="w-10">
          <button 
            className="md:hidden transition-transform duration-300 hover:scale-110" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} className="text-purple-700" />
          </button>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-10 w-auto rounded-xl shadow transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex space-x-4 items-center text-gray-700">
          <button
            onClick={() => navigate("/account")}
            className="hover:text-black hidden md:block transition-colors duration-300"
          >
            Account
          </button>
          <button 
            onClick={() => navigate("/account")} 
            className="md:hidden transition-transform duration-300 hover:scale-110"
            aria-label="Account"
          >
            <User size={22} className="text-purple-700" />
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="hover:text-black hidden md:block transition-colors duration-300"
          >
            Search
          </button>
          <button 
            onClick={() => setShowSearch(!showSearch)} 
            className="md:hidden transition-transform duration-300 hover:scale-110"
            aria-label="Search"
          >
            <Search size={22} className="text-purple-700" />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="hover:text-black hidden md:block transition-colors duration-300"
          >
            Cart
          </button>
          <button 
            onClick={() => navigate("/cart")} 
            className="md:hidden transition-transform duration-300 hover:scale-110 relative"
            aria-label="Cart"
          >
            <ShoppingCart size={22} className="text-purple-700" />
            {/* Optional cart badge */}
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showSearch ? "max-h-24 py-3 opacity-100" : "max-h-0 opacity-0"
        } bg-white px-4 border-t border-b border-gray-200 shadow-inner`}
      >
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center gap-8 py-3 bg-white text-sm font-medium tracking-wide relative z-20">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative text-gray-600 hover:text-black transition-all duration-300 group ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          Home
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-600"></span>
        </NavLink>

        {/* Shop Dropdown */}
        <div className="relative group">
          <span className="cursor-pointer flex items-center gap-1 text-gray-600 hover:text-black transition-all duration-300">
            Shop <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
          </span>
          <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-500 transform origin-top">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Collections</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {collections.map((col) => (
                <li key={col._id} className="transition-transform duration-300 hover:translate-x-1">
                  <NavLink 
                    to={`/collections/${col._id}`} 
                    className="hover:text-purple-600 block transition-colors duration-300"
                  >
                    {col.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative text-gray-600 hover:text-black transition-all duration-300 group ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          About Us
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-600"></span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative text-gray-600 hover:text-black transition-all duration-300 group ${
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          Contact Us
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-600"></span>
        </NavLink>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[999] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-72 z-[1000] 
          bg-[#d2b3db] shadow-2xl transform transition-all duration-500 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-4 py-5 border-b border-[#e9f3ff]/30">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-10 w-auto rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
            />
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-1 rounded-full bg-[#e9f3ff]/30 hover:bg-[#e9f3ff]/50 transition-all duration-300"
            >
              <X size={24} className="text-[#e9f3ff]" />
            </button>
          </div>

          <nav className="flex flex-col p-4 space-y-2 text-[#e9f3ff] text-base font-medium overflow-y-auto h-[calc(100vh-80px)]">
            <NavLink 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => `py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#e9f3ff]/20 hover:pl-6 ${isActive ? 'bg-[#e9f3ff]/20 font-bold' : ''}`}
            >
              Home
            </NavLink>
            <div className="border-t border-[#e9f3ff]/30"></div>

            {/* Dynamic Shop List */}
            <details className="group">
              <summary className="cursor-pointer list-none py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#e9f3ff]/20 hover:pl-6 flex items-center justify-between">
                <span>Shop</span>
                <ChevronDown size={18} className="transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="pl-6 pt-2 flex flex-col gap-2">
                {collections.map((col, index) => (
                  <NavLink
                    key={col._id}
                    to={`/collections/${col._id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 px-4 rounded-lg transition-all duration-300 hover:bg-[#e9f3ff]/20 hover:pl-6"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {col.name}
                  </NavLink>
                  
                ))}
              </div>
            </details>
            <div className="border-t border-[#e9f3ff]/30"></div>

            <NavLink 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => `py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#e9f3ff]/20 hover:pl-6 ${isActive ? 'bg-[#e9f3ff]/20 font-bold' : ''}`}
            >
              About Us
            </NavLink>
            <div className="border-t border-[#e9f3ff]/30"></div>
            
            <NavLink 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => `py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#e9f3ff]/20 hover:pl-6 ${isActive ? 'bg-[#e9f3ff]/20 font-bold' : ''}`}
            >
              Contact Us
            </NavLink>
            
            <div className="border-t border-[#e9f3ff]/30"></div>
            
            <NavLink 
              to="/account" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => `py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#e9f3ff]/20 hover:pl-6 ${isActive ? 'bg-[#e9f3ff]/20 font-bold' : ''}`}
            >
              Account
            </NavLink>
            <div className="border-t border-[#e9f3ff]/30"></div>
            
            <NavLink 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => `py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#e9f3ff]/20 hover:pl-6 ${isActive ? 'bg-[#e9f3ff]/20 font-bold' : ''}`}
            >
              Cart
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;