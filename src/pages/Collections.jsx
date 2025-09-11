import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collectionAPI, BASE_URL } from '../API';

function Collections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await collectionAPI.getAll();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-black">🧥 Our Collections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {collections.map((col) => (
          <Link to={`/collections/${col._id}`} key={col._id}>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
              {/* Collection Image */}
              <img
                src={`${BASE_URL}${col.image}`}
                alt={col.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 rounded-2xl"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-[#d2b3db] text-3xl md:text-4xl font-bold text-center drop-shadow-md">
                  {col.name}
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
