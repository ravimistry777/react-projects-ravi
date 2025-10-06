import React, { useState } from 'react';
import CarCard from './CarCard';
import './CarSection.css';

const CarSection = ({ id, title, cars }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id={id} className="car-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="title-underline" />
        </div>

        {/* add class 'has-hover' only when a card is hovered */}
        <div className={`cars-grid ${hoveredId ? 'has-hover' : ''}`}>
          {cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              hovered={hoveredId === car.id}
              onHover={(id) => setHoveredId(id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        <div className="section-divider" />
      </div>
    </section>
  );
};

export default CarSection;
