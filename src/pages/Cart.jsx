import React, { useEffect, useMemo, useState } from "react";
import { cartAPI, BASE_URL } from "../API"; // <-- Import BASE_URL
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = async () => {
    if (!user) return setCart({ items: [] });
    const { data } = await cartAPI.get(user._id);
    setCart(data || { items: [] });
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  const updateQty = async (productId, size, qty) => {
    await cartAPI.updateQty({ userId: user._id, productId, size, quantity: qty });
    fetchCart();
  };

  const removeItem = async (productId, size) => {
    await cartAPI.remove({ userId: user._id, productId, size });
    fetchCart();
  };

  const clear = async () => {
    await cartAPI.clear(user._id);
    fetchCart();
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">🛒 Shopping Cart</h1>
        <p className="text-gray-600">
          Please <Link to="/account" className="text-blue-600 underline">log in</Link> to view your cart.
        </p>
      </div>
    );
  }

  if (!cart) return <div className="max-w-4xl mx-auto p-8">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h1>

      {cart.items?.length === 0 ? (
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link to="/collections" className="text-blue-600 underline mt-3 inline-block">Browse collections →</Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {cart.items.map((item) => {
              const p = item.productId || {};
              const img = p.heroImage ? `${BASE_URL}${p.heroImage}` : ""; // <-- Updated here
              return (
                <div key={`${p._id}-${item.size}`} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                  <img src={img} alt={p.name} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{p.name}</h3>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    <p className="text-gray-700">₹{p.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(p._id, item.size, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 border rounded"
                    >−</button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(p._id, item.size, item.quantity + 1)}
                      className="px-3 py-1 border rounded"
                    >+</button>
                  </div>
                  <div className="w-24 text-right font-medium">₹{p.price * item.quantity}</div>
                  <button
                    onClick={() => removeItem(p._id, item.size)}
                    className="ml-4 text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
            <button onClick={clear} className="text-gray-600 hover:underline">Clear cart</button>
            <div className="text-right">
              <p className="text-xl font-semibold">Subtotal: ₹{subtotal}</p>
              <button
                className="mt-3 bg-black text-white px-6 py-3 rounded-lg"
                onClick={() => window.location.href = "/checkout"}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
