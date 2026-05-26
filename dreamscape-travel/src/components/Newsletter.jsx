import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [isFocused, setIsFocused] = useState(false);

  const isValid = useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  function onSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <section id="newsletter" className="py-32 px-6 relative overflow-hidden bg-white bg-texture">
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[#84a98c] tracking-[6px] uppercase font-semibold text-sm">Stay in the Dream</p>
          <h2 className="text-5xl md:text-7xl font-extrabold mt-4 tracking-tight text-[#1a1a1a]">Get <span className="gradientText">Luxury Deals</span></h2>
          <p className="text-[#1a1a1a]/70 mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Subscribe for exclusive curated itineraries, member-only offers, and breathtaking travel inspiration delivered directly to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <form
            onSubmit={onSubmit}
            className={`glass w-full max-w-3xl p-8 rounded-[40px] relative transition-all duration-500 bg-white ${isFocused ? 'shadow-[0_10px_40px_rgba(132,169,140,0.15)] border-[#84a98c]/50' : 'border-[#000000]/5'}`}
          >
            <div className="flex flex-col md:flex-row gap-5 relative z-10">
              <div className="flex-1 relative">
                <label className="sr-only" htmlFor="newsletter-email">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  value={email}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("idle");
                  }}
                  placeholder="Enter your email..."
                  type="email"
                  className="w-full bg-[#f8f9fa] border border-[#000000]/10 rounded-full px-8 py-5 outline-none focus:border-[#84a98c] text-lg text-[#1a1a1a] placeholder-gray-400 transition-all shadow-inner"
                />
                
                {/* Status Messages */}
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: status !== "idle" ? 1 : 0, height: status !== "idle" ? "auto" : 0 }}
                  className="absolute -bottom-8 left-6"
                >
                  {status === "error" && (
                    <p className="text-sm text-red-500 font-medium">Please enter a valid email address.</p>
                  )}
                  {status === "success" && (
                    <p className="text-sm text-[#52796f] font-medium">Welcome to the dream! You're subscribed.</p>
                  )}
                </motion.div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(132,169,140,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-10 py-5 font-bold text-lg transition-all duration-300 border border-transparent shadow-sm ${
                  isValid ? "bg-[#84a98c] text-white hover:bg-[#52796f]" : "bg-[#f8f9fa] text-gray-400 cursor-not-allowed border-gray-200"
                }`}
              >
                Join Now
              </motion.button>
            </div>
          </form>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-[#1a1a1a]/40 mt-8 font-light"
        >
          No spam—unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}

