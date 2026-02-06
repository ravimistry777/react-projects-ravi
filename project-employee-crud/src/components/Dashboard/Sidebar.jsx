import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { FaHome, FaUserFriends, FaChartBar, FaCog, FaSignOutAlt, FaUserTie, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'employees', label: 'Employees', icon: <FaUserFriends /> },
    { id: 'analytics', label: 'Analytics', icon: <FaChartBar /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <>
      <div className={`sidebar d-flex flex-column p-3 text-white ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header mb-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="logo-container">
                <FaUserTie className="logo-icon" />
            </div>
            <h4 className="m-0 fw-bold">Director</h4>
          </div>
          <Button 
            variant="link" 
            className="text-white d-lg-none p-0" 
            onClick={onClose}
            style={{ fontSize: '1.5rem' }}
          >
            <FaTimes />
          </Button>
        </div>
        
        <Nav className="flex-column flex-grow-1">
          {menuItems.map((item) => (
            <Nav.Link
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 992) onClose();
              }}
              className={`sidebar-link mb-2 ${activeTab === item.id ? 'active' : ''}`}
            >
              <span className="icon-wrapper">{item.icon}</span>
              <span className="link-label">{item.label}</span>
              {activeTab === item.id && (
                  <motion.div 
                      layoutId="active-pill" 
                      className="active-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
              )}
            </Nav.Link>
          ))}
        </Nav>

        <div className="mt-auto">
          <Nav.Link className="sidebar-link text-danger">
            <span className="icon-wrapper"><FaSignOutAlt /></span>
            <span className="link-label">Logout</span>
          </Nav.Link>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
            className="sidebar-overlay d-lg-none"
            onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
