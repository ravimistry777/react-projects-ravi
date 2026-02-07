import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { evaluate } from 'mathjs';
import toast, { Toaster } from 'react-hot-toast';
import { FiClock, FiDelete, FiMoreHorizontal, FiSun, FiMoon } from 'react-icons/fi';
import './AdvancedCalculator.css';

const AdvancedCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const inputRef = useRef(null);

  // Keep focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, [input, showHistory, isScientific, isDarkMode]);

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    if (!input) return;
    try {
      // Replace symbols for mathjs
      const formattedInput = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/√/g, 'sqrt');

      const res = evaluate(formattedInput);
      const resString = res.toString();
      
      setResult(resString);
      setHistory((prev) => [{ expression: input, result: resString }, ...prev].slice(0, 10));
      setInput(resString); // Auto-update input to result for continuous calculation
    } catch (error) {
      toast.error('Invalid Expression');
      setResult('Error');
    }
  };

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      // Numbers and Basic Operators
      if (/^[0-9+\-*/.()^%]$/.test(key)) {
        e.preventDefault();
        handleButtonClick(key);
      } 
      // Enter (=)
      else if (key === 'Enter') {
        e.preventDefault();
        handleCalculate();
      } 
      // Backspace (Delete)
      else if (key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } 
      // Escape (Clear)
      else if (key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  // Button Configuration
  const basicButtons = [
    { label: 'C', type: 'action', onClick: handleClear, color: 'text-red-500' },
    { label: 'DEL', type: 'action', onClick: handleDelete },
    { label: '%', type: 'operator', onClick: () => handleButtonClick('%') },
    { label: '÷', type: 'operator', onClick: () => handleButtonClick('/') },
    { label: '7', type: 'number', onClick: () => handleButtonClick('7') },
    { label: '8', type: 'number', onClick: () => handleButtonClick('8') },
    { label: '9', type: 'number', onClick: () => handleButtonClick('9') },
    { label: '×', type: 'operator', onClick: () => handleButtonClick('*') },
    { label: '4', type: 'number', onClick: () => handleButtonClick('4') },
    { label: '5', type: 'number', onClick: () => handleButtonClick('5') },
    { label: '6', type: 'number', onClick: () => handleButtonClick('6') },
    { label: '-', type: 'operator', onClick: () => handleButtonClick('-') },
    { label: '1', type: 'number', onClick: () => handleButtonClick('1') },
    { label: '2', type: 'number', onClick: () => handleButtonClick('2') },
    { label: '3', type: 'number', onClick: () => handleButtonClick('3') },
    { label: '+', type: 'operator', onClick: () => handleButtonClick('+') },
    { label: '0', type: 'number', span: 2, onClick: () => handleButtonClick('0') },
    { label: '.', type: 'number', onClick: () => handleButtonClick('.') },
    { label: '=', type: 'equals', onClick: handleCalculate },
  ];

  const scientificButtons = [
    { label: '(', func: '(' },
    { label: ')', func: ')' },
    { label: 'sin', func: 'sin(' },
    { label: 'cos', func: 'cos(' },
    { label: 'tan', func: 'tan(' },
    { label: 'deg', func: 'deg' },
    { label: 'ln', func: 'log(' },
    { label: 'log', func: 'log10(' },
    { label: '√', func: 'sqrt(' },
    { label: '^', func: '^' },
    { label: 'π', func: 'pi' },
    { label: 'e', func: 'e' },
    { label: '!', func: '!' },
    { label: 'inv', func: 'inv(' },
  ];

  return (
    <div className={`calc-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Toaster position="top-center" />
      
      <motion.div 
        className="calc-container"
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="calc-header">
          <div className="calc-title">Calculator</div>
          <div className="calc-actions">
            <button 
              className="action-btn"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button 
              className={`action-btn ${isScientific ? 'active' : ''}`}
              onClick={() => setIsScientific(!isScientific)}
              title="Scientific Mode"
            >
              <FiMoreHorizontal />
            </button>
            <button 
              className={`action-btn ${showHistory ? 'active' : ''}`}
              onClick={() => setShowHistory(!showHistory)}
              title="History"
            >
              <FiClock />
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="calc-display">
          <div className="history-preview">
            {history.length > 0 && `${history[0].expression} =`}
          </div>
          <input 
            ref={inputRef}
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="0"
            className="main-input"
          />
          <div className="result-preview">{result && `= ${result}`}</div>
        </div>

        {/* Keypad */}
        <div className="calc-body">
          <AnimatePresence>
            {isScientific && (
              <motion.div 
                className="scientific-pad"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {scientificButtons.map((btn, idx) => (
                  <button 
                    key={idx} 
                    className="sci-btn"
                    onClick={() => handleButtonClick(btn.func)}
                  >
                    {btn.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="basic-pad">
            {basicButtons.map((btn, idx) => (
              <motion.button
                key={idx}
                className={`calc-btn ${btn.type} ${btn.span ? 'span-2' : ''}`}
                onClick={btn.onClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div 
              className="history-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <div className="history-header">
                <h3>History</h3>
                <button onClick={() => setHistory([])} className="clear-history">Clear</button>
                <button onClick={() => setShowHistory(false)} className="close-history"><FiDelete /></button>
              </div>
              <div className="history-list">
                {history.map((item, index) => (
                  <div key={index} className="history-item" onClick={() => setInput(item.result)}>
                    <div className="h-exp">{item.expression}</div>
                    <div className="h-res">= {item.result}</div>
                  </div>
                ))}
                {history.length === 0 && <p className="no-history">No history yet</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdvancedCalculator;
