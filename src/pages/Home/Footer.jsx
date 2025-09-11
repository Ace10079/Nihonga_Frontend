const Footer = () => {
  return (
    <footer
      className="font-['Tenor Sans'] relative overflow-hidden"
      style={{ backgroundColor: "#d2b3db" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h2
            className="text-2xl font-bold mb-3 tracking-wide"
            style={{ color: "#e9f3ff" }}
          >
            Nihonga
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#000000" }}>
            Bridging tradition and modernity through art. Discover timeless
            designs and elegant collections crafted with passion.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3
            className="text-lg font-semibold mb-3"
            style={{ color: "#e9f3ff" }}
          >
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="transition-colors hover:underline"
                style={{ color: "#000000" }}
              >
                Cancellation Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors hover:underline"
                style={{ color: "#000000" }}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors hover:underline"
                style={{ color: "#000000" }}
              >
                Shipping Info
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors hover:underline"
                style={{ color: "#000000" }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3
            className="text-lg font-semibold mb-3"
            style={{ color: "#e9f3ff" }}
          >
            Connect With Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.instagram.com/the_nihonga"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full shadow-md transition transform hover:scale-110"
              style={{ backgroundColor: "#e9f3ff", color: "#d2b3db" }}
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full shadow-md transition transform hover:scale-110"
              style={{ backgroundColor: "#e9f3ff", color: "#d2b3db" }}
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full shadow-md transition transform hover:scale-110"
              style={{ backgroundColor: "#e9f3ff", color: "#d2b3db" }}
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="text-center py-4 text-sm"
        style={{ backgroundColor: "#e9f3ff", color: "#000000" }}
      >
        © 2025 Nihonga. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
