import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { motion } from "framer-motion"

import "swiper/css"
import "swiper/css/pagination"

const reviews = [
  {
    name: "Priya Sharma",
    role: "Travel Blogger",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Our Rajasthan palace tour was magical — from Jaipur's Hawa Mahal to Udaipur's lakeside haveli, every moment was royalty."
  },
  {
    name: "Arjun Mehta",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Capturing the ghats of Varanasi at sunrise was a once-in-a-lifetime experience. Dreamscape arranged it all perfectly."
  },
  {
    name: "Ananya Reddy",
    role: "Adventure Seeker",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The Kerala backwater houseboat stay was pure bliss. Already booked Andaman with them for next year!"
  },
  {
    name: "Vikram Patel",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    text: "From Manali's snow peaks to Goa's golden sunsets — exceptional service at every stop. Truly world-class."
  }
]

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 relative overflow-hidden bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#84a98c] uppercase tracking-[6px] text-sm font-semibold">Testimonials</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mt-4 tracking-tight text-[#1a1a1a]">What People <span className="gradientText">Say</span></h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={40}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {reviews.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-[40px] p-10 h-[380px] flex flex-col justify-between border border-[#000000]/5 hover:border-[#84a98c]/50 bg-white relative group"
                >
                  <div className="absolute top-10 right-10 text-6xl text-[#84a98c]/20 font-serif">"</div>
                  
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#84a98c]/10 group-hover:border-[#84a98c]/50 transition-colors duration-300 shadow-sm"
                    />
                    <h2 className="mt-6 text-3xl font-bold tracking-wide group-hover:text-[#52796f] transition-colors text-[#1a1a1a]">
                      {item.name}
                    </h2>
                    <p className="text-[#84a98c] font-medium text-lg mt-1">
                      {item.role}
                    </p>
                  </div>
                  
                  <p className="mt-6 text-[#1a1a1a]/70 font-light text-lg leading-relaxed relative z-10 italic transition-colors">
                    "{item.text}"
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials