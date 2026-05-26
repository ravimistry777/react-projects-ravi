import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-[#000000]/5 bg-[#f8f9fa] relative overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="grid md:grid-cols-4 gap-12 lg:gap-20">
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h1 className="text-4xl font-extrabold gradientText tracking-tight">
              Dreamscape
            </h1>
            <p className="mt-6 text-[#1a1a1a]/70 font-light leading-relaxed">
              Experience unparalleled luxury travel across India. From royal Rajasthan to serene Kerala — we craft extraordinary journeys.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold mb-6 text-xl tracking-wide text-[#1a1a1a]">
              Quick Links
            </h3>
            <div className="flex flex-col gap-4">
              {['About Us', 'Tours & Destinations', 'Travel Journal', 'Contact'].map(link => (
                <a key={link} href="#" className="text-[#1a1a1a]/70 hover:text-[#52796f] transition-colors font-light relative group w-max">
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#84a98c] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold mb-6 text-xl tracking-wide text-[#1a1a1a]">
              Support
            </h3>
            <div className="flex flex-col gap-4">
              {['FAQ', 'Privacy Policy', 'Terms of Service', 'Booking Conditions'].map(link => (
                <a key={link} href="#" className="text-[#1a1a1a]/70 hover:text-[#52796f] transition-colors font-light relative group w-max">
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#84a98c] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold mb-6 text-xl tracking-wide text-[#1a1a1a]">
              Connect
            </h3>
            <div className="flex gap-5 text-2xl">
              {[FaInstagram, FaFacebook, FaTwitter, FaYoutube].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1, color: "#84a98c" }}
                  className="text-[#1a1a1a]/70 hover:drop-shadow-[0_5px_10px_rgba(132,169,140,0.3)] transition-all"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
            <p className="mt-8 text-[#1a1a1a]/50 font-light text-sm">Subscribe to our newsletter for the latest updates.</p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-20 border-t border-[#000000]/10 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[#1a1a1a]/50 font-light text-sm"
        >
          <p>© 2026 Dreamscape Travel. All rights reserved.</p>
          <p>Designed with serenity in mind.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer