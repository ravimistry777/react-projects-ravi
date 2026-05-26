import { motion } from "framer-motion"
import { FaPlane, FaMapMarkedAlt, FaCoffee, FaShip } from "react-icons/fa"

const data = [
  {
    icon: <FaPlane size={40}/>,
    title: "Heritage Palace Tours",
    desc: "Explore royal forts and palaces across Rajasthan, from Jaipur to Jodhpur."
  },
  {
    icon: <FaMapMarkedAlt size={40}/>,
    title: "Himalayan Treks",
    desc: "Trek through Manali, Leh, and Rishikesh with experienced local guides."
  },
  {
    icon: <FaCoffee size={40}/>,
    title: "Ayurvedic Wellness",
    desc: "Rejuvenate with traditional Ayurvedic therapies and yoga retreats in Kerala."
  },
  {
    icon: <FaShip size={40}/>,
    title: "Backwater Cruises",
    desc: "Glide through Kerala's serene backwaters on luxurious houseboats."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

function Experiences() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#ffffff]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-[#84a98c] tracking-[6px] uppercase text-sm font-semibold">Mindful Journeys</p>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 tracking-tight text-[#1a1a1a]">Curated for <span className="gradientText">Peace</span></h1>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
              }}
              className="glass rounded-[30px] p-10 relative overflow-hidden group bg-[#f8f9fa]"
            >
              <div className="absolute inset-0 bg-[#84a98c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-[#84a98c] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h2 className="text-3xl font-bold mb-4 tracking-wide group-hover:text-[#52796f] transition-colors text-[#1a1a1a]">
                  {item.title}
                </h2>
                <p className="text-[#1a1a1a]/70 text-lg font-light leading-relaxed transition-colors">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experiences