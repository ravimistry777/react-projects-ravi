import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dynamically measure the nav height so the dropdown always sits right below it
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.getBoundingClientRect().height);
    }
  }, [scroll]); // re-measure when scroll state changes padding

  const links = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#destinations", label: "Destinations" },
      { href: "#testimonials", label: "Reviews" },
      { href: "#newsletter", label: "Newsletter" },
    ],
    []
  );

  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault();
    setOpen(false);
    // Small delay to let the menu close, then scroll
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
          scroll
            ? "bg-[#f8f9fa]/90 backdrop-blur-md border-b border-[#000000]/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex gap-3 items-center cursor-pointer"
            onClick={() => {
              const home = document.querySelector('#home');
              if (home) home.scrollIntoView({ behavior: 'smooth', block: 'start' });
              history.replaceState(null, '', window.location.pathname);
            }}
          >
            <FaPlane className="text-[#84a98c] text-3xl" />
            <h1 className="text-3xl font-extrabold gradientText tracking-tight">Dreamscape</h1>
          </motion.div>

          <div className="hidden md:flex gap-10 items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[#1a1a1a]/70 hover:text-[#52796f] transition-colors font-medium text-lg group"
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#84a98c] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(132,169,140,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex items-center justify-center bg-transparent px-8 py-3 rounded-full border border-[#84a98c] hover:bg-[#84a98c] transition-all font-bold text-[#84a98c] hover:text-white"
            >
              Book Now
            </motion.button>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative z-[10000] rounded-full p-3 bg-black/5 border border-black/5 hover:bg-black/10 transition"
            >
              {open ? <FiX className="text-2xl text-[#1a1a1a]" /> : <FiMenu className="text-2xl text-[#1a1a1a]" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full screen overlay approach for guaranteed clickability */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop - closes menu on tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden fixed left-0 right-0 z-[9999] overflow-hidden"
              style={{ top: `${navHeight}px` }}
            >
              <div className="mx-4 mt-2 rounded-3xl p-6 border border-[#84a98c]/30 bg-[#f8f9fa] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col gap-2">
                  {links.map((l, i) => (
                    <motion.a
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      key={l.href}
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className="block px-6 py-4 rounded-2xl hover:bg-[#84a98c]/10 active:bg-[#84a98c]/20 transition text-[#1a1a1a] font-bold text-xl border border-transparent hover:border-[#84a98c]/30 cursor-pointer select-none"
                      style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                    >
                      {l.label}
                    </motion.a>
                  ))}

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(false);
                    }}
                    className="mt-4 bg-[#84a98c] active:bg-[#52796f] w-full px-6 py-4 rounded-full font-bold text-xl text-white cursor-pointer select-none"
                    style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;


