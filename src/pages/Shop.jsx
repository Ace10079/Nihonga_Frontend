import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: "T-shirt", price: "$20", image: "/party_wear.jpg" },
  { id: 2, name: "Jeans", price: "$40", image: "/ethnic.jpg" },
  { id: 3, name: "Sneakers", price: "$60", image: "/denim_jacket.jpg" },
];

function Shop() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">🛍️ Shop All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white border rounded-2xl shadow hover:shadow-lg p-4 transition-all duration-300 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500">{product.price}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Shop;
