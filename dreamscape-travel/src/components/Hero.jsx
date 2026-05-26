import { motion, useScroll, useTransform } from "framer-motion";
import { FaMapMarkerAlt, FaPlay } from "react-icons/fa";
import { useRef } from "react";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center justify-center pt-20 perspective-[1000px] bg-[#f8f9fa]"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=100&w=2500&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-90"
          alt="Taj Mahal at sunrise"
        />
      </motion.div>

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa]/80 via-[#f8f9fa]/40 to-[#f8f9fa] pointer-events-none" />

      <motion.div
        style={{ y: textY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.p variants={itemVariants} className="text-[#52796f] mb-6 tracking-[8px] uppercase text-xs md:text-sm font-bold">
          Indian Luxury Retreats
        </motion.p>

        <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-[100px] font-extrabold leading-[1.05] tracking-tight text-[#1a1a1a]">
          Discover <br />
          <span className="gradientText">Incredible India</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-[#1a1a1a]/70 mt-8 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
          From the Himalayas to Kerala's backwaters — experience royal heritage, spiritual journeys, and pristine beaches.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12 flex justify-center gap-6 flex-wrap">
          <motion.a
            href="#destinations"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#84a98c] hover:bg-[#52796f] transition-all font-bold text-white text-lg shadow-[0_10px_20px_rgba(132,169,140,0.3)]"
          >
            Explore Retreats
          </motion.a>

          <motion.a
            href="#newsletter"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
            whileTap={{ scale: 0.95 }}
            className="glass px-10 py-5 rounded-full flex items-center gap-4 transition-all text-[#1a1a1a] font-medium text-lg"
          >
            <FaPlay className="text-[#84a98c]" />
            Watch Film
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-14 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="glass rounded-2xl px-6 py-4">
            <p className="text-sm text-[#1a1a1a]/60 font-light">Heritage stays</p>
            <p className="text-[#52796f] font-bold text-lg">Royal palaces</p>
          </div>
          <div className="glass rounded-2xl px-6 py-4">
            <p className="text-sm text-[#1a1a1a]/60 font-light">Ayurveda & Yoga</p>
            <p className="text-[#52796f] font-bold text-lg">Holistic wellness</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating booking card */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-16 right-12 glass rounded-3xl p-6 hidden lg:block"
      >
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-[#84a98c]/10 flex items-center justify-center border border-[#84a98c]/30">
            <FaMapMarkerAlt className="text-[#84a98c] text-2xl" />
          </div>
          <div>
            <h3 className="font-bold text-xl tracking-wide text-[#1a1a1a]">Udaipur Palace Retreat</h3>
            <p className="text-[#1a1a1a]/70 font-light">Starting from <span className="text-[#52796f] font-bold">₹16,999</span></p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;

