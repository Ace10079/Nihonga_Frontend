import React from 'react';
import { useParams, Link } from 'react-router-dom';

const collectionData = {
  1: {
    title: "Summer Collection",
    products: [
      { id: 1, name: "Beach Shirt", price: "$25", image: "/casual_tee.jpg" },
      { id: 2, name: "Linen Shorts", price: "$30", image: "/casual_fit.webp" },
    ],
  },
  2: {
    title: "Winter Collection",
    products: [
      { id: 3, name: "Wool Sweater", price: "$50", image: "/products/wool-sweater.jpg" },
      { id: 4, name: "Puffer Jacket", price: "$80", image: "/products/puffer-jacket.jpg" },
    ],
  },
};

function CollectionDetail() {
  const { id } = useParams();
  const collection = collectionData[id];

  if (!collection) {
    return <div className="text-center text-red-500 mt-10">Collection not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link to="/collections" className="text-blue-600 underline mb-6 inline-block">← Back to Collections</Link>
      <h1 className="text-3xl font-bold mb-8 text-center">{collection.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {collection.products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition cursor-pointer">
              <img src={product.image} alt={product.name} className="w-full h-52 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-500">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CollectionDetail;
