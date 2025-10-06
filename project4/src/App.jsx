import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CarSection from './components/CarSection';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('coupe');

  useEffect(() => {
    const sections = ['coupe', 'sedan', 'sports', 'suv'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const carData = {
    coupe: [
      { id: 1, name: "BMW 8 Series", type: "Luxury Coupe", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800", specs: { engine: "4.4L V8", hp: "523 HP", torque: "553 lb-ft", acceleration: "3.6s" }, price: "$85,000", description: "Ultimate luxury coupe with breathtaking performance" },
      { id: 2, name: "Mercedes-Benz C-Class", type: "Premium Coupe", image: "https://images.unsplash.com/photo-1563720223885-38a8f6c9b6e3?w=800", specs: { engine: "3.0L V6", hp: "385 HP", torque: "384 lb-ft", acceleration: "4.7s" }, price: "$67,400", description: "Elegant design meets cutting-edge technology" },
      { id: 3, name: "Audi A5", type: "Sport Coupe", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800", specs: { engine: "2.0L Turbo", hp: "261 HP", torque: "273 lb-ft", acceleration: "5.2s" }, price: "$54,400", description: "Sophisticated styling with sporty dynamics" },
      { id: 4, name: "Lexus LC 500", type: "Grand Tourer", image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800", specs: { engine: "5.0L V8", hp: "471 HP", torque: "398 lb-ft", acceleration: "4.4s" }, price: "$102,000", description: "Japanese luxury with incredible refinement" },
      { id: 5, name: "Porsche 911", type: "Sports Coupe", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800", specs: { engine: "3.0L Turbo", hp: "379 HP", torque: "331 lb-ft", acceleration: "4.2s" }, price: "$116,000", description: "Iconic sports car heritage and performance" },
      { id: 6, name: "Aston Martin Vantage", type: "Luxury Coupe", image: "https://images.unsplash.com/photo-1626668893666-2a98a5734a95?w=800", specs: { engine: "4.0L V8", hp: "503 HP", torque: "505 lb-ft", acceleration: "3.6s" }, price: "$165,000", description: "British luxury with aggressive performance" }
    ],
    sedan: [
      { id: 7, name: "Audi A8 L", type: "Executive Sedan", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800", specs: { engine: "3.0L V6", hp: "335 HP", torque: "369 lb-ft", acceleration: "5.6s" }, price: "$86,500", description: "The pinnacle of luxury and innovation" },
      { id: 8, name: "Genesis G90", type: "Flagship Sedan", image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800", specs: { engine: "3.5L V6", hp: "409 HP", torque: "405 lb-ft", acceleration: "5.3s" }, price: "$88,400", description: "Korean luxury redefined with exceptional comfort" },
      { id: 9, name: "Mercedes S-Class", type: "Luxury Sedan", image: "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800", specs: { engine: "3.0L I6", hp: "429 HP", torque: "384 lb-ft", acceleration: "4.9s" }, price: "$114,000", description: "The benchmark for luxury sedans worldwide" },
      { id: 10, name: "BMW 7 Series", type: "Executive Sedan", image: "https://images.unsplash.com/photo-1554744512-2dce3d6f2f59?w=800", specs: { engine: "3.0L I6", hp: "375 HP", torque: "398 lb-ft", acceleration: "5.3s" }, price: "$97,400", description: "Ultimate driving machine in luxury form" },
      { id: 11, name: "Lexus LS 500", type: "Premium Sedan", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800", specs: { engine: "3.5L V6", hp: "416 HP", torque: "442 lb-ft", acceleration: "5.0s" }, price: "$78,000", description: "Unmatched reliability with luxury comfort" },
      { id: 12, name: "Porsche Panamera", type: "Sports Sedan", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800", specs: { engine: "2.9L V6", hp: "443 HP", torque: "405 lb-ft", acceleration: "4.4s" }, price: "$92,000", description: "Sports car performance in a luxury sedan" }
    ],
    sports: [
      { id: 13, name: "Porsche 911 Turbo", type: "Super Sports", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800", specs: { engine: "3.8L Flat-6", hp: "640 HP", torque: "590 lb-ft", acceleration: "2.7s" }, price: "$203,500", description: "Iconic sports car with breathtaking performance" },
      { id: 14, name: "McLaren 720S", type: "Hyper Sports", image: "https://images.unsplash.com/photo-1626668893666-2a98a5734a95?w=800", specs: { engine: "4.0L V8", hp: "710 HP", torque: "568 lb-ft", acceleration: "2.8s" }, price: "$299,000", description: "Track-focused monster with luxury comforts" },
      { id: 15, name: "Ferrari 488 GTB", type: "Supercar", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800", specs: { engine: "3.9L V8", hp: "661 HP", torque: "561 lb-ft", acceleration: "3.0s" }, price: "$262,000", description: "Italian passion meets cutting-edge technology" },
      { id: 16, name: "Lamborghini Huracan", type: "Super Sports", image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800", specs: { engine: "5.2L V10", hp: "602 HP", torque: "413 lb-ft", acceleration: "3.2s" }, price: "$261,000", description: "Extreme design with explosive performance" },
      { id: 17, name: "Audi R8", type: "Super Sports", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800", specs: { engine: "5.2L V10", hp: "562 HP", torque: "406 lb-ft", acceleration: "3.4s" }, price: "$148,000", description: "Everyday supercar with Audi sophistication" },
      { id: 18, name: "Nissan GT-R", type: "Super Sports", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800", specs: { engine: "3.8L V6", hp: "565 HP", torque: "467 lb-ft", acceleration: "2.9s" }, price: "$113,000", description: "Godzilla performance with technological brilliance" }
    ],
    suv: [
      { id: 19, name: "Range Rover Autobiography", type: "Luxury SUV", image: "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800", specs: { engine: "4.4L V8", hp: "523 HP", torque: "553 lb-ft", acceleration: "4.6s" }, price: "$159,000", description: "The ultimate luxury SUV for any terrain" },
      { id: 20, name: "Lamborghini Urus", type: "Super SUV", image: "https://images.unsplash.com/photo-1554744512-2dce3d6f2f59?w=800", specs: { engine: "4.0L V8", hp: "641 HP", torque: "627 lb-ft", acceleration: "3.5s" }, price: "$225,000", description: "Supercar performance in an SUV package" },
      { id: 21, name: "Mercedes G-Class", type: "Luxury SUV", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800", specs: { engine: "4.0L V8", hp: "577 HP", torque: "627 lb-ft", acceleration: "4.5s" }, price: "$140,000", description: "Iconic off-roader with luxury amenities" },
      { id: 22, name: "BMW X7", type: "Luxury SUV", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800", specs: { engine: "4.4L V8", hp: "523 HP", torque: "553 lb-ft", acceleration: "4.5s" }, price: "$101,000", description: "Spacious luxury with BMW driving dynamics" },
      { id: 23, name: "Audi Q8", type: "Premium SUV", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800", specs: { engine: "3.0L V6", hp: "335 HP", torque: "369 lb-ft", acceleration: "5.6s" }, price: "$72,000", description: "Coupe-like styling with SUV practicality" },
      { id: 24, name: "Porsche Cayenne", type: "Sports SUV", image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800", specs: { engine: "4.0L V8", hp: "541 HP", torque: "567 lb-ft", acceleration: "3.9s" }, price: "$128,000", description: "Sports car soul in an SUV body" }
    ]
  };

  return (
    <div className="app">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">RAVI'S CAR HUB</h1>
            <p className="hero-subtitle">Experience Luxury Redefined</p>
            <div className="scroll-indicator">
              <span>Scroll to Explore</span>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </section>

        {/* All Car Sections in continuous flow */}
        <CarSection id="coupe" title="COUPE COLLECTION" cars={carData.coupe} />
        <CarSection id="sedan" title="SEDAN ELEGANCE" cars={carData.sedan} />
        <CarSection id="sports" title="SPORTS LEGENDS" cars={carData.sports} />
        <CarSection id="suv" title="SUV MASTERS" cars={carData.suv} />
      </div>
    </div>
  );
};

export default App;
