import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "T-shirt",
    price: "$20",
    image: "/casual_tee.jpg",
    description:
      "This premium cotton T-shirt offers all-day comfort and a clean look. Designed for daily wear, it's breathable and durable. A must-have staple in every wardrobe."
  },
  {
    id: 2,
    name: "Jeans",
    price: "$40",
    image: "/casual_fit.webp",
    description:
      "Our classic blue denim jeans are perfect for any occasion. With a snug fit and stylish cut, they’ll become your go-to pants in no time."
  },
  {
    id: 3,
    name: "Sneakers",
    price: "$60",
    image: "/products/sneakers.jpg",
    description:
      "Walk the streets in comfort with our lightweight sneakers. Featuring a flexible sole and breathable design — where fashion meets function."
  },
];

function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 className="text-center text-red-500 text-xl mt-10">Product not found</h2>;
  }

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link to="/shop" className="text-blue-600 underline mb-6 inline-block">← Back to Shop</Link>

      {/* Product Image */}
      <div className="flex justify-center mb-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Name and Price */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-gray-700 mt-1">{product.price}</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-md leading-relaxed text-center max-w-2xl mx-auto mb-8">
        {product.description}
      </p>

      {/* Size Options */}
      <div className="text-center mb-10">
        <h3 className="text-lg font-medium mb-4">Select Size</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                selectedSize === size
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="text-center">
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
