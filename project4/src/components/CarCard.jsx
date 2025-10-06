import React from 'react';
import './CarCard.css';

const CarCard = ({ car, hovered, onHover, onLeave }) => {
  return (
    <div
      className={`car-card ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => onHover(car.id)}
      onMouseLeave={() => onLeave()}
      onFocus={() => onHover(car.id)}
      onBlur={() => onLeave()}
      tabIndex={0}
      role="button"
      aria-pressed={hovered ? 'true' : 'false'}
    >
      <div className="card-inner">
        {/* FRONT */}
        <div className="card-front">
          <div className="car-image-container">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-overlay">
              <h3 className="car-name">{car.name}</h3>
              <span className="car-type">{car.type}</span>
            </div>
          </div>
        </div>

        {/* BACK (flipped content) */}
        <div className="card-back">
          <div className="car-details">
            <div className="detail-header">
              <h3 className="detail-name">{car.name}</h3>
              <p className="detail-description">{car.description}</p>
            </div>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-value">{car.specs.engine}</span>
                <span className="spec-label">Engine</span>
              </div>
              <div className="spec-item">
                <span className="spec-value">{car.specs.hp}</span>
                <span className="spec-label">Power</span>
              </div>
              <div className="spec-item">
                <span className="spec-value">{car.specs.torque}</span>
                <span className="spec-label">Torque</span>
              </div>
              <div className="spec-item">
                <span className="spec-value">{car.specs.acceleration}</span>
                <span className="spec-label">0-60 mph</span>
              </div>
            </div>

            <div className="price-container">
              <div className="price-tag">
                <span className="price">{car.price}</span>
              </div>
              <button className="inquiry-btn" type="button">MAKE INQUIRY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
