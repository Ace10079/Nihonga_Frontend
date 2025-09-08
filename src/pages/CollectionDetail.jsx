import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../API'; // <-- Import BASE_URL
import API from '../API';

function CollectionDetail() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch collection info
        const { data: collectionData } = await API.get(`/api/collections/get/${id}`);
        setCollection(collectionData);

        // Fetch products for this collection
        const { data: productsData } = await API.get(`/api/products/collection/${id}`);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching collection details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!collection) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link to="/collections" className="text-blue-600 underline mb-6 inline-block">
        ← Back to Collections
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center">{collection.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition cursor-pointer">
                <img
                  src={`${BASE_URL}${product.heroImage}`} // <-- Using BASE_URL
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-500">₹{product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found for this collection.
          </p>
        )}
      </div>
    </div>
  );
}

export default CollectionDetail;
