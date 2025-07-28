import React from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Light & breezy styles perfect for sunny days, vacations, and relaxed vibes.",
    image: "/casual_fit.webp",
  },
  {
    id: 2,
    title: "Winter Collection",
    description: "Stay cozy and stylish this winter with our warmest & trendiest apparel.",
    image: "/collections/winter.jpg",
  },
];

function Collections() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🧥 Our Collections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {collections.map((col) => (
          <Link to={`/collections/${col.id}`} key={col.id}>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />

              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition duration-300"></div>

              {/* Centered Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-lg">
                  {col.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Collections;
