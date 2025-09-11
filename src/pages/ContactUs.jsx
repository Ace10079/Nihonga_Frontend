import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaTwitter, FaPinterest, FaTiktok } from "react-icons/fa";

function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📨 Message Sent! We’ll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    // send to backend here if needed
  };

  return (
    <div className="bg-[#fdfaff] font-['Tenor Sans'] text-gray-800">
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          📬 Get in <span className="text-[#d2b3db]">Touch</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b3db]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b3db]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#d2b3db]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#d2b3db] hover:bg-[#c49bd5] text-black px-6 py-3 rounded-lg font-medium transition duration-200 w-full"
            >
              Send Message
            </button>
          </motion.form>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#e9f3ff] to-[#fdfaff] p-8 rounded-2xl shadow-lg space-y-8"
          >
            <div className="text-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-[#d2b3db]">Nihonga HQ</h2>
              <p className="mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#d2b3db]" />
                123 Style Street, Fashion District, NY 10001
              </p>
              <p className="mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-[#d2b3db]" />
                support@nihonga.com
              </p>
              <p className="flex items-center">
                <FaPhoneAlt className="mr-2 text-[#d2b3db]" />
                +1 (234) 567-8901
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Support Hours</h3>
              <p className="text-gray-600">Monday to Friday: 9am – 6pm EST</p>
              <p className="text-gray-600">Weekend: Limited Email Support</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Follow Us</h3>
              <div className="flex space-x-4 text-[#d2b3db] text-2xl">
                <a href="https://www.instagram.com/the_nihonga" target="_blank" rel="noreferrer" className="hover:text-[#c49bd5]">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-[#c49bd5]">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-[#c49bd5]">
                  <FaPinterest />
                </a>
                <a href="#" className="hover:text-[#c49bd5]">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
