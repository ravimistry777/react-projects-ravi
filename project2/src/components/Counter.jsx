import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <div className="counter-card">
      <h1 className="counter-value">{count}</h1>
      <div className="button-container">
        <button className="btn increment" onClick={handleIncrement}>Increment</button>
        <button className="btn decrement" onClick={handleDecrement}>Decrement</button>
        <button className="btn reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
