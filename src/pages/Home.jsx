import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const dummyHeroImages = [
  { id: 1, image: "/hero1.jpg", collection: "Summer Vibes" },
  { id: 2, image: "/hero2.jpg", collection: "Elegant Nights" },
  { id: 3, image: "/dress1.jpg", collection: "Chic Daily Wear" },
];

const collections = [
  { name: "Summer Collection", image: "/dress1.jpg" },
  { name: "Party Wear", image: "/party_wear.jpg" },
  { name: "Casual Fit", image: "/casual_fit.webp" },
  { name: "Ethnic", image: "/ethnic.jpg" }
];

const bestSellers = [
  { name: "Floral Dress", price: "₹1,499", image: "/floral_dress.webp" },
  { name: "Black Gown", price: "₹2,299", image: "/black_gown.jpg" },
  { name: "Casual Tee", price: "₹699", image: "/casual_tee.jpg" },
  { name: "Denim Jacket", price: "₹1,999", image: "/denim_jacket.jpg" }
];

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
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((item, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <button className="mt-2 text-sm text-blue-600 hover:underline">Shop Now</button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">View All</button>
      </section>

      {/* Best Sellers */}
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((item, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Follow Section */}
      <section className="bg-gray-100 py-10 relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-6">Follow Us On Instagram</h2>

        <style>
          {`
            @keyframes marqueeLeft {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            @keyframes marqueeRight {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}
        </style>

        {/* First Row */}
        <div className="overflow-hidden">
          <div className="flex gap-4 w-max" style={{ animation: 'marqueeLeft 30s linear infinite' }}>
            {collections.concat(collections).map((item, i) => (
              <img
                key={i}
                src={item.image}
                alt={item.name}
                className="w-40 h-40 rounded-lg object-cover"
              />
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="overflow-hidden mt-4">
          <div className="flex gap-4 w-max" style={{ animation: 'marqueeRight 30s linear infinite' }}>
            {bestSellers.concat(bestSellers).map((item, i) => (
              <img
                key={i}
                src={item.image}
                alt={item.name}
                className="w-40 h-40 rounded-lg object-cover"
              />
            ))}
          </div>
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
