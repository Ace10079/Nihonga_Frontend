import React, { useState, useEffect } from "react";
import { Menu, X, User, Search, ShoppingCart, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { collectionAPI } from "../API";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [collections, setCollections] = useState([]);
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
          <button onClick={() => navigate("/account")} className="hover:text-black hidden md:block">
            Account
          </button>
          <button onClick={() => navigate("/account")} className="md:hidden">
            <User size={20} />
          </button>

          <button onClick={() => setShowSearch(!showSearch)} className="hover:text-black hidden md:block">
            Search
          </button>
          <button onClick={() => setShowSearch(!showSearch)} className="md:hidden">
            <Search size={20} />
          </button>

          <button onClick={() => navigate("/cart")} className="hover:text-black hidden md:block">
            Cart
          </button>
          <button onClick={() => navigate("/cart")} className="md:hidden">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          showSearch ? "max-h-24 py-3" : "max-h-0"
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
              isActive ? "text-black font-semibold" : ""
            }`
          }
        >
          Home
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-black"></span>
        </NavLink>

        {/* Shop Dropdown */}
        <div className="relative group">
          <span className="cursor-pointer flex items-center gap-1 text-gray-600 hover:text-black transition">
            Shop <ChevronDown size={16} />
          </span>
          <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 p-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Collections</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {collections.map((col) => (
                <li key={col._id}>
                  <NavLink to={`/collections/${col._id}`} className="hover:text-black block">
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
            `relative text-gray-600 hover:text-black transition group ${
              isActive ? "text-black font-semibold" : ""
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
              isActive ? "text-black font-semibold" : ""
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
      className={`fixed top-0 left-0 h-screen w-72 bg-white border border-white/20 z-[1000] shadow-lg transform transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
        <span className="font-bold text-lg text-gray-900">Menu</span>
        <button onClick={() => setIsMenuOpen(false)}>
          <X size={24} className="text-gray-900" />
        </button>
      </div>

      <nav className="flex flex-col p-4 space-y-4 text-gray-900 text-base  font-medium">
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>

        {/* Dynamic Shop List */}
        <details className="group">
          <summary className="cursor-pointer list-none">Shop</summary>
          <div className="pl-4 pt-2 flex flex-col gap-2 bg-white">
            {collections.map((col) => (
              <NavLink
                key={col._id}
                to={`/collections/${col._id}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {col.name}
              </NavLink>
            ))}
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
