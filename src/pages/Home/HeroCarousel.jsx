import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroCarousel = ({ images }) => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={1000}
        emulateTouch
        stopOnHover={false}
      >
        {images.map((hero, idx) => (
          <div
            key={hero.id}
            className="relative overflow-hidden group rounded-xl sm:rounded-2xl"
          >
            <img
              src={hero.image}
              alt={`Hero ${idx + 1}`}
              className="w-full h-[220px] sm:h-[320px] md:h-[500px] object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 flex flex-col gap-2 sm:gap-3 md:gap-4">
              {hero.collection && (
                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {hero.collection}
                </h2>
              )}
              <button className="bg-white/90 backdrop-blur-md text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full shadow-lg hover:bg-white transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
