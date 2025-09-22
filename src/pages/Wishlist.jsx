import React, { useEffect, useState } from "react";
import { wishlistAPI, cartAPI, BASE_URL } from "../API";
import { useNavigate, Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    if (!user) return setWishlist([]);
    const { data } = await wishlistAPI.get(user._id);
    setWishlist(data || []);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    await wishlistAPI.remove({ userId: user._id, productId });
    fetchWishlist();
  };

  const addToCart = async (productId) => {
    const product = wishlist.find(p => p._id === productId);
    if (!product) return;
    await cartAPI.add({ userId: user._id, productId, size: product.sizes?.[0] || "", quantity: 1 });
    alert("Added to cart");
  };

  if (!user) return (
    <div className="max-w-4xl mx-auto p-8 text-center tenor-sans-regular">
      <h1 className="text-3xl font-bold mb-4">❤️ Wishlist</h1>
      <p className="text-gray-600">
        Please <Link to="/account" className="text-[#d2b3db] underline">log in</Link> to view your wishlist.
      </p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 tenor-sans-regular">
      <h1 className="text-3xl font-bold mb-6 text-black">❤️ Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <p className="text-gray-600">Your wishlist is empty.</p>
          <Link to="/collections" className="text-[#d2b3db] underline mt-3 inline-block">Browse collections →</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {wishlist.map((p) => {
            const img = p.heroImage ? `${BASE_URL}${p.heroImage}` : "";
            return (
              <div key={p._id} className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 border-b last:border-b-0">
                <img src={img} alt={p.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{p.name}</h3>
                  <p className="text-gray-700">₹{p.price}</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button onClick={() => addToCart(p._id)} className="bg-[#d2b3db] text-white px-4 py-2 rounded-md hover:scale-105 transition">Add to Cart</button>
                  <button onClick={() => removeFromWishlist(p._id)} className="text-[#d2b3db] hover:underline">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
