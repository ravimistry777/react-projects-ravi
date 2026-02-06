import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="stats-card border-0 h-100">
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="text-muted mb-1 text-uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>{title}</h6>
            <h3 className="mb-0 fw-bold">{value}</h3>
            {trend && (
                <small className={trend > 0 ? 'text-success' : 'text-danger'}>
                    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
                </small>
            )}
          </div>
          <div className={`icon-box bg-${color}-subtle text-${color} rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}>
            {icon}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
