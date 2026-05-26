import { useEffect } from "react"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Destinations from "./components/Destinations"
import Experiences from "./components/Experiences"
import Testimonials from "./components/Testimonials"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"

function App() {

    useEffect(() => {
        // Removed Lenis JS scrolling as it conflicts with native scroll and causes severe lag on some machines.
        // We will rely on native, hardware-accelerated CSS smooth scrolling instead.
    }, [])

    return (

        <div className="bg-[#f8f9fa] text-[#1a1a1a]">
            <Navbar />
            <Hero />
            <Destinations />
            <Experiences />
            <Testimonials />
            <Newsletter />
            <Footer />

        </div>

    )

}

export default App