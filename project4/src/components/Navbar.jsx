import React from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'coupe', label: 'COUPE' },
    { id: 'sedan', label: 'SEDAN' },
    { id: 'sports', label: 'SPORTS' },
    { id: 'suv', label: 'SUV' }
  ];

  const handleSectionClick = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const navbarHeight = 80;
      const elementPosition = sectionElement.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;

      // Smooth scroll without vibration
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-text">RAVI'S CAR HUB</span>
          <div className="logo-glow"></div>
        </div>
        <div className="nav-links">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
