import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
    const [input, setInput] = useState("");

    const handleClick = (value) => {
        setInput(input + value);
    };

    const clearInput = () => {
        setInput("");
    };

    const calculateResult = () => {
        try {
            setInput(eval(input).toString());
        }
        catch {
            setInput("Error");
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                {/* <h1>Simple Calculator</h1> */}
                <input type="text" value={input} readOnly className="display" />
                <div className="buttons">
                    <button onClick={clearInput} className="clear">C</button>
                        <button onClick={() => handleClick("/")}>÷</button>
                        <button onClick={() => handleClick("*")}>×</button>
                        <button onClick={() => handleClick("-")}>−</button>
                        <button onClick={() => handleClick("7")}>7</button>
                        <button onClick={() => handleClick("8")}>8</button>
                        <button onClick={() => handleClick("9")}>9</button>
                        <button onClick={() => handleClick("+")}>+</button>
                        <button onClick={() => handleClick("4")}>4</button>
                        <button onClick={() => handleClick("5")}>5</button>
                        <button onClick={() => handleClick("6")}>6</button>
                        <button onClick={calculateResult} className="equals">=</button>
                        <button onClick={() => handleClick("1")}>1</button>
                        <button onClick={() => handleClick("2")}>2</button>
                        <button onClick={() => handleClick("3")}>3</button>
                        <button onClick={() => handleClick("0")} className="zero">0</button>
                        <button onClick={() => handleClick(".")}>.</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;