const CollectionsSlider = ({ collections }) => {
  return (
    <section className="max-w-6xl mx-auto text-left px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Our Collections
      </h2>

      <div
        id="collectionSlider"
        className="flex gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-auto scroll-smooth no-scrollbar pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {collections.map((item, idx) => (
          <div
            key={idx}
            className="relative w-40 sm:w-56 md:w-64 h-56 sm:h-72 rounded-xl overflow-hidden shadow-md flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <span className="text-white text-sm sm:text-base font-medium">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:flex items-center justify-center space-x-4 mt-4">
        <button
          onClick={() =>
            document.getElementById("collectionSlider").scrollBy({ left: -220, behavior: "smooth" })
          }
          className="bg-white border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-100 transition text-sm font-medium"
        >
          ⬅ Previous
        </button>
        <button
          onClick={() =>
            document.getElementById("collectionSlider").scrollBy({ left: 220, behavior: "smooth" })
          }
          className="bg-white border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-100 transition text-sm font-medium"
        >
          Next ➡
        </button>
      </div>
    </section>
  );
};

export default CollectionsSlider;
