import { destinations } from "../data/data"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import { FaStar, FaMapMarkerAlt } from "react-icons/fa"
import { useState } from "react"

import "swiper/css"

function Destinations(){
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return(
    <section id="destinations" className="py-32 px-6 relative bg-[#f8f9fa] bg-texture">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-[#84a98c] tracking-[6px] uppercase font-semibold text-sm">
            Top Sanctuaries
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mt-4 tracking-tight text-[#1a1a1a]">
            Explore <span className="gradientText">Beautiful Places</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="destination-swiper-wrapper"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3 }
            }}
            className="destination-swiper !overflow-visible py-8"
          >
            {destinations.map((item,index)=>(
              <SwiperSlide key={index} className="!overflow-visible">
                <motion.div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    y: hoveredIndex === index ? -20 : 0,
                    scale: hoveredIndex === index ? 1.06 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="rounded-[32px] overflow-hidden group relative bg-white shadow-lg hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] transition-shadow duration-500"
                  style={{
                    position: "relative",
                    zIndex: hoveredIndex === index ? 50 : 1,
                  }}
                >
                  <div className="relative h-[420px] md:h-[480px] overflow-hidden">
                    <motion.img
                      animate={{ scale: hoveredIndex === index ? 1.08 : 1 }}
                      transition={{ duration: 0.6 }}
                      src={item.image.includes('?') ? item.image + '&q=100&w=1200' : item.image + '?q=100&w=1200&auto=format&fit=crop'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500"/>

                    {/* Top badge */}
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                      <FaStar className="text-yellow-400" />
                      <span className="font-bold text-white">{item.rating}</span>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8">
                      <h2 className="text-3xl md:text-4xl font-bold tracking-wide group-hover:text-[#cad2c5] transition-colors text-white drop-shadow-lg">
                        {item.name}
                      </h2>
                      <div className="flex gap-2 items-center text-white/80 mt-3 font-light text-lg">
                        <FaMapMarkerAlt className="text-[#84a98c]" />
                        {item.country}
                      </div>
                    </div>
                  </div>

                  <div className="p-7 flex justify-between items-center bg-white border-t border-black/5">
                    <div>
                      <p className="text-[#1a1a1a]/50 text-xs font-light mb-1 uppercase tracking-wider">Starting from</p>
                      <p className="text-[#52796f] text-2xl md:text-3xl font-extrabold">
                        {item.price}
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#84a98c] hover:bg-[#52796f] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors shadow-md"
                    >
                      Explore →
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Destinations