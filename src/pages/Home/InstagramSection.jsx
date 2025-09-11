import { motion } from "framer-motion";

const InstagramSection = () => {
  return (
    <section
      className="relative overflow-hidden font-['Tenor Sans'] py-12"
      style={{ backgroundColor: "#d2b3db" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Instagram Embed */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <iframe
            src="https://www.instagram.com/the_nihonga/embed"
            width="100%"
            height="450"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            className="rounded-xl shadow-lg border-4 max-w-sm w-full"
            style={{ borderColor: "#e9f3ff" }}
          ></iframe>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 tracking-wide"
            style={{ color: "#e9f3ff" }}
          >
            Join the Nihonga Journey
          </h2>
          <p
            className="text-base md:text-lg mb-6 leading-relaxed"
            style={{ color: "#000000" }}
          >
            Step into our world of contemporary Nihonga art.  
            From delicate brushwork to modern interpretations,  
            experience the beauty we share daily on Instagram.  
          </p>

          <motion.a
            href="https://www.instagram.com/the_nihonga"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 rounded-full font-semibold shadow-md text-sm md:text-base"
            style={{
              backgroundColor: "#e9f3ff",
              color: "#d2b3db",
            }}
          >
            Follow @the_nihonga
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
