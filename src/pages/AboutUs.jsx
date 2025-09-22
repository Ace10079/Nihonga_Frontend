import React from "react";
import { motion } from "framer-motion";

function AboutUs() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#fdfaff] text-gray-800 font-['Tenor Sans']">
      {/* Hero Section */}
      <section className="relative h-72 flex items-center justify-center bg-gradient-to-br from-[#d2b3db] to-[#e9f3ff] rounded-b-3xl overflow-hidden">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-black drop-shadow-md text-center"
        >
          About <span className="text-[#e9f3ff]">Nihonga</span>
        </motion.h1>
        <img
          src="/about/fabric-overlay.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
      </section>

      {/* Content Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center my-16 px-6"
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
          At <span className="font-semibold text-[#d2b3db]">Nihonga</span>, we
          believe a saree is more than a garment—it’s a canvas of culture,
          emotion, and artistry. Rooted in India’s timeless weaving traditions,
          we reinterpret heritage with contemporary design, creating pieces that
          feel both classic and current. Every drape tells a story of
          craftsmanship and care, made for women who celebrate tradition while
          embracing modernity.
        </p>
      </motion.div>
    </div>
  );
}

export default AboutUs;
