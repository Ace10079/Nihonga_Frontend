import React from 'react';

function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">👕 About Nihonga</h1>

      {/* Intro Paragraph */}
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
        At <span className="font-semibold text-gray-800">Nihonga</span>, we believe fashion should feel as good as it looks.
        From minimal everyday wear to statement seasonal styles, our pieces are designed to express you.
        Premium quality, planet-friendly practices, and timeless vibes — that's how we roll.
      </p>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
        <img
          src="/about/team.jpg"
          alt="Our Team"
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We’re on a mission to make fashion smarter, not harder. Our collections are built with love for fabric, fit, and feel.
            Whether you're heading out or lounging in, we’ve got pieces that move with you — stylish, effortless, and eco-aware.
          </p>
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🌟 Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <img src="/about/john.jpg" alt="John" className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
            <h3 className="font-semibold text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-500">Founder & CEO</p>
          </div>
          <div>
            <img src="/about/jane.jpg" alt="Jane" className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
            <h3 className="font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-sm text-gray-500">Creative Director</p>
          </div>
          <div>
            <img src="/about/michael.jpg" alt="Michael" className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
            <h3 className="font-semibold text-gray-800">Michael Johnson</h3>
            <p className="text-sm text-gray-500">Marketing Lead</p>
          </div>
        </div>
      </div>

      {/* Closing Quote */}
      <div className="text-center mt-16 mb-20">
        <p className="text-xl italic text-gray-500">"Style is a way to say who you are without speaking."</p>
        <p className="mt-2 text-gray-700">— The Nihonga Team</p>
      </div>

      {/* Policies Section */}
      <div className="bg-white py-12 px-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">📌 Policies & Customer Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cancellation Policy */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">🔁 Cancellation Policy</h3>
            <p className="text-gray-600 text-sm">
              Orders can be canceled within 2 hours of placement. After dispatch, cancellations are not accepted.
            </p>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">🚚 Shipping Info</h3>
            <p className="text-gray-600 text-sm">
              We offer free standard shipping on all orders above $50. Fast delivery within 3–7 business days.
            </p>
          </div>

          {/* Return Policy */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">🛡️ Return Policy</h3>
            <p className="text-gray-600 text-sm">
              Easy 7-day return window. Products must be unused, with original tags and packaging intact.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">💳 Payment Methods</h3>
            <p className="text-gray-600 text-sm">
              We accept all major credit/debit cards, UPI, PayPal & COD (Cash on Delivery) in select regions.
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition md:col-span-3 text-center">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">📞 Need Help?</h3>
            <p className="text-gray-600 text-sm">
              Reach us anytime at <a href="mailto:support@nihonga.com" className="text-blue-600 underline">support@nihonga.com</a> or call <span className="font-medium">+1 234 567 890</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
