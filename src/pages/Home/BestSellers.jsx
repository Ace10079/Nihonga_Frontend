const BestSellers = ({ products }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Our Best Sellers
      </h2>
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 no-scrollbar">
        {products.map((item, idx) => (
          <div
            key={idx}
            className="w-64 flex-shrink-0 sm:w-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
          >
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                Bestseller
              </div>
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-base text-gray-700 mt-1 font-medium">
                ₹{item.price}
              </p>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
