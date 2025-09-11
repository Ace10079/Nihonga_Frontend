import React from "react";
import { motion } from "framer-motion";
import { FiTruck, FiXCircle, FiRefreshCw } from "react-icons/fi";

function AboutUs() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#fdfaff] text-gray-800 font-['Tenor Sans']">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-[#d2b3db] to-[#e9f3ff] rounded-b-3xl overflow-hidden">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-black drop-shadow-md text-center"
        >
          About <span className="text-[#e9f3ff]">Nihonga</span>
        </motion.h1>
        <img
          src="/about/fabric-overlay.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
      </section>

      {/* Intro */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center my-16 px-6"
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
          At <span className="font-semibold text-[#d2b3db]">Nihonga</span>, fashion meets sophistication. 
          From timeless classics to bold statements, we craft clothes that reflect your personality. 
          Premium fabrics, sustainable practices, and pastel vibes — every piece tells a story.
        </p>
      </motion.div>

      {/* Mission + Image */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-10 items-center px-6 max-w-6xl mx-auto mb-16"
      >
        <img
          src="/about/team.jpg"
          alt="Our Team"
          className="rounded-xl shadow-lg w-full h-80 object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4 text-[#d2b3db]">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To redefine fashion with elegance, comfort, and sustainability. Our
            collection blends minimalism with statement pieces, creating outfits
            that move with you — stylish, effortless, and eco-aware.
          </p>
        </div>
      </motion.div>

      {/* Team Section */}
      <section className="bg-[#e9f3ff] py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl text-center font-bold mb-12 text-[#d2b3db]"
        >
          Meet the Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            { name: "John Doe", role: "Founder & CEO", img: "/about/john.jpg" },
            { name: "Jane Smith", role: "Creative Director", img: "/about/jane.jpg" },
            { name: "Michael Johnson", role: "Marketing Lead", img: "/about/michael.jpg" },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-[#d2b3db]"
              />
              <h3 className="font-semibold text-lg text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16 bg-[#fdfaff]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl text-center font-bold mb-12 text-[#d2b3db]"
        >
          Policies & Info
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              title: "Cancellation",
              desc: "Cancel within 2 hours. After dispatch, cancellations are not accepted.",
              icon: <FiXCircle size={28} className="mx-auto mb-3 text-[#d2b3db]" />,
            },
            {
              title: "Shipping",
              desc: "Free standard shipping on orders above $50. Fast delivery in 3-7 days.",
              icon: <FiTruck size={28} className="mx-auto mb-3 text-[#d2b3db]" />,
            },
            {
              title: "Return",
              desc: "7-day return window. Products must be unused with original tags.",
              icon: <FiRefreshCw size={28} className="mx-auto mb-3 text-[#d2b3db]" />,
            },
          ].map((policy, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100 transition"
            >
              {policy.icon}
              <h3 className="text-lg font-semibold text-[#d2b3db] mb-2">
                {policy.title}
              </h3>
              <p className="text-gray-600 text-sm">{policy.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-16 max-w-3xl mx-auto px-6 italic text-lg bg-gradient-to-r from-[#d2b3db] to-[#e9f3ff] rounded-xl shadow-md"
      >
        <p className="text-black">
          "Style is a way to say who you are without speaking." —{" "}
          <span className="font-semibold text-[#d2b3db]">
            The Nihonga Team
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default AboutUs;
