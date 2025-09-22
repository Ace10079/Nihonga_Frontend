const BestSellers = ({ products }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 font-['Tenor Sans']">
      <h2
        className="text-5xl font-bold mb-10 text-center italiana-regular"
      >
        Our Best Sellers
      </h2>

      {/* Wrapper: scroll-snap for mobile */}
      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 overflow-x-auto sm:overflow-hidden no-scrollbar scroll-smooth snap-x snap-mandatory tenor-sans-regular">
        {products.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center group cursor-pointer flex-shrink-0 w-64 snap-center"
          >
            {/* Image Card */}
            <div
              className="relative w-64 h-72 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
              style={{ border: "4px solid #d2b3db" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#e9f3ff" }}
              >
                Bestseller
              </div>
            </div>

            {/* Product Name */}
            <h3
              className="mt-4 text-lg font-bold tracking-wide text-center"
              style={{ color: "#000000" }}
            >
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
