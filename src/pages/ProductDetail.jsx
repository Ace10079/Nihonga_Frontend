// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productAPI, cartAPI, BASE_URL } from "../API";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || "");
        setMainImage(`${BASE_URL}${data.heroImage}`);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    })();
  }, [id]);

  if (!product) return <h2 className="text-center mt-10">Loading...</h2>;

  const stockStatus =
    product.stock === 0
      ? "Out of Stock"
      : product.stock <= product.lowStockThreshold
      ? "Low Stock"
      : "In Stock";

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please log in to add items to your cart.");
    if (!selectedSize && product.sizes?.length) return alert("Please select a size.");

    setAddingToCart(true);
    try {
      await cartAPI.add({
        userId: user._id,
        productId: product._id,
        size: selectedSize || "",
        quantity: 1,
      });
      navigate("/cart");
    } catch (e) {
      alert("Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        to={`/collections/${product.collection}`}
        className="text-[#d2b3db] font-medium hover:underline mb-6 inline-block"
      >
        ← Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Gallery */}
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full rounded-2xl shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
          />
          {product.showcaseImages?.length > 0 && (
            <div className="flex gap-3 mt-2">
              {[product.heroImage, ...product.showcaseImages].map((img, i) => {
                const url = `${BASE_URL}${img}`;
                const active = mainImage === url;
                return (
                  <img
                    key={i}
                    src={url}
                    alt={`Preview ${i + 1}`}
                    onClick={() => setMainImage(url)}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition ${
                      active ? "border-[#d2b3db]" : "border-transparent"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>
          <p className="text-xl font-semibold text-[#d2b3db] mb-2">₹{product.price}</p>
          <p
            className={`mb-4 font-medium ${
              stockStatus === "Out of Stock"
                ? "text-red-500"
                : stockStatus === "Low Stock"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {stockStatus}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-black">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-[#d2b3db] text-white border-[#d2b3db] shadow-md scale-105"
                        : "border-gray-300 text-gray-700 hover:border-[#d2b3db] hover:text-[#d2b3db]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={
              (product.sizes?.length && !selectedSize) || product.stock === 0 || addingToCart
            }
            className="w-full lg:w-auto bg-gradient-to-r from-[#d2b3db] to-[#b08fd8] hover:from-[#b08fd8] hover:to-[#d2b3db] text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-transform duration-300 hover:scale-105 disabled:opacity-50"
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
