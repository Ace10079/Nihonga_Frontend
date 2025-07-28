
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useMemo, useState } from "react";
const dummyHeroImages = [
  { id: 1, image: "/hero1.jpg", collection: "Summer Vibes" },
  { id: 2, image: "/hero2.jpg", collection: "Elegant Nights" },
  { id: 3, image: "/dress1.jpg", collection: "Chic Daily Wear" },
];

const collections = [
  { name: "Summer Collection", image: "/hero1.jpg" },
  { name: "Party Wear", image: "/hero2.jpg" },
  { name: "Casual Fit", image: "/hero3.jpg" },
  { name: "Ethnic", image: "/ethnic.jpg" }
];

const bestSellers = [
  { name: "Floral Dress", price: "₹1,499", image: "/hero1.jpg" },
  { name: "Black Gown", price: "₹2,299", image: "/hero2.jpg" },
  { name: "Casual Tee", price: "₹699", image: "/hero3.jpg" },
  { name: "Denim Jacket", price: "₹1,999", image: "/hero1.jpg" }
];


const ScatterBoard = ({
  imageUrl,
  rows = 5,
  cols = 8,
  width = 960,
  height = 540,
}) => {
  const [hovered, setHovered] = useState(false);

  const pieces = useMemo(() => {
    const arr = [];
    const pieceW = width / cols;
    const pieceH = height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * pieceW;
        const y = r * pieceH;

        arr.push({
          id: r * cols + c,
          clip: `inset(${y}px ${width - (x + pieceW)}px ${
            height - (y + pieceH)
          }px ${x}px)`,
          tx: (Math.random() - 0.5) * width * 0.6,
          ty: (Math.random() - 0.5) * height * 0.6,
          rot: (Math.random() - 0.5) * 40,
          delay: Math.random() * 200,
        });
      }
    }
    return arr;
  }, [rows, cols, width, height]);

  return (
    <section className="w-full py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Hover to Assemble
      </h2>

      <div className="flex justify-center">
        <div
          className="relative bg-white border border-gray-200 overflow-hidden group cursor-pointer"
          style={{ width, height }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {pieces.map((p) => (
            <img
              key={p.id}
              src={imageUrl}
              alt="tile"
              className="absolute top-0 left-0 will-change-transform"
              style={{
                width,
                height,
                clipPath: p.clip,
                WebkitClipPath: p.clip,
                transform: hovered
                  ? `translate3d(0,0,0) rotate(0deg)`
                  : `translate3d(${p.tx}px, ${p.ty}px, 0) rotate(${p.rot}deg)`,
                transition: `transform 700ms cubic-bezier(0.22, 1, 0.36, 1)`,
                transitionDelay: `${p.delay}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Carousel */}
    {/* Hero Carousel */}
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
    {dummyHeroImages.map((hero, idx) => (
      <div
        key={hero.id}
        className="relative overflow-hidden group"
      >
        <img
          src={hero.image}
          alt={`Hero ${idx + 1}`}
          className="w-full h-[500px] object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
        />
        {/* Overlay Text & Button */}
        <div className="absolute top-6 left-4 md:top-1/2 md:left-10 md:transform md:-translate-y-1/2 text-left text-white bg-black bg-opacity-40 p-3 md:p-6 rounded-xl shadow-lg w-fit max-w-[90%]">
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 md:mb-4">
            {hero.collection}
          </h2>
          <button className="bg-white text-black text-xs sm:text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-gray-200 transition">
            Buy Now
          </button>
        </div>
      </div>
    ))}
  </Carousel>
</div>


    {/* Our Collections */}
{/* Our Collections */}
<section className="max-w-6xl mx-auto text-left px-4">
  <h2 className="text-3xl font-bold mb-6 text-center">Our Collections</h2>

  {/* Horizontal Scrollable Row */}
  <div
    id="collectionSlider"
    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar mb-6"
    style={{
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none" // For IE/Edge
    }}
  >
    {collections.map((item, idx) => (
      <div
        key={idx}
        className="relative min-w-[340px] h-[520px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer group"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-500"
        />
        {/* Top-Left Overlay Title Inside Image */}
        <div className="absolute top-3 left-3 text-white text-lg font-semibold z-10">
          {item.name}
        </div>
      </div>
    ))}
  </div>

  {/* Buttons Centered Below Slider */}
  <div className="flex items-center justify-center space-x-4">
    <button
      onClick={() =>
        document.getElementById("collectionSlider").scrollBy({ left: -340, behavior: "smooth" })
      }
      className="bg-white border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-100 transition text-sm font-medium"
    >
      ⬅ Previous
    </button>
    <button
      onClick={() =>
        document.getElementById("collectionSlider").scrollBy({ left: 340, behavior: "smooth" })
      }
      className="bg-white border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-100 transition text-sm font-medium"
    >
      Next ➡
    </button>
  </div>
</section>

<ScatterBoard imageUrl="/hero2.jpg" />




{/* Best Sellers */}
<section className="max-w-6xl mx-auto px-4 py-10 text-center">
  <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Best Sellers</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {bestSellers.map((item, idx) => (
      <div
        key={idx}
        className="bg-white overflow-hidden transition-transform duration-300"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {item.name}
          </h3>
          <p className="text-base text-gray-600">{item.price}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Instagram Follow Section */}
      <section className="bg-gray-100 py-10 relative overflow-hidden">
  <h2 className="text-3xl font-bold text-center mb-6">Follow Us On Instagram</h2>

  <div className="flex justify-center">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full max-w-5xl rounded-xl shadow-lg object-cover"
    >
      <source src="/video 2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-black text-white p-6 text-center space-y-2">
        <p>&copy; 2025 Nihonga. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Cancellation Policy</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Shipping Info</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
