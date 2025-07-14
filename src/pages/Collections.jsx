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
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
              />
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-2">{col.title}</h2>
                <p className="text-gray-600">{col.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Collections;
