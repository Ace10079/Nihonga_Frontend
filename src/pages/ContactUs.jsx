import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('📨 Message Sent! We’ll get back to you soon.');
    setForm({ name: '', email: '', message: '' });
    // send to backend here if needed
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">📬 Get in Touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md space-y-6"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            Send Message
          </button>
        </form>

        {/* Info Section */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-md space-y-6">
          <div className="text-gray-700">
            <h2 className="text-2xl font-bold mb-4">Nihonga HQ</h2>
            <p className="mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-600" />
              123 Style Street, Fashion District, NY 10001
            </p>
            <p className="mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-blue-600" />
              support@nihonga.com
            </p>
            <p className="flex items-center">
              <FaPhoneAlt className="mr-2 text-blue-600" />
              +1 (234) 567-8901
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
            <p className="text-gray-600">Monday to Friday: 9am – 6pm EST</p>
            <p className="text-gray-600">Weekend: Limited Email Support</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <p className="text-gray-600">Instagram | Twitter | Pinterest | TikTok</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
