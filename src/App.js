import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setInput("0");
    setFormula("");
    setLastInput("");
    setEvaluated(false);
  };

  const handleNumber = (value) => {
    if (evaluated) {
      setInput(value);
      setFormula(value);
      setEvaluated(false);
    } else {
      if (input === "0" || /[+\-*/]$/.test(lastInput)) {
        setInput(value);
      } else {
        setInput(input + value);
      }
      setFormula((prev) => prev + value);
    }
    setLastInput(value);
  };

  const handleOperator = (value) => {
    if (evaluated) {
      setFormula(input + value);
      setEvaluated(false);
    } else if (!/[+\-*/]$/.test(lastInput)) {
      setFormula((prev) => prev + value);
    } else {
      setFormula((prev) => prev.slice(0, -1) + value);
    }
    setLastInput(value);
    setInput(value);
  };

  const handleDecimal = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
      setFormula((prev) => prev + ".");
      setLastInput(".");
    }
  };

  const handleEvaluate = () => {
    try {
      const result = eval(formula.replace(/[^0-9+\-*/.]/g, ""));
      setInput(result.toString());
      setFormula(result.toString());
      setEvaluated(true);
    } catch (error) {
      setInput("Error");
      setFormula("");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <div className="calculator bg-dark text-light p-3 rounded">
        <div className="formula text-end">{formula}</div>
        <div id="display" className="display bg-secondary text-light p-2 rounded">
          {input}
        </div>
        <div className="button-grid mt-3">
          {/* Baris khusus operator */}
          <button id="divide" className="btn btn-secondary" onClick={() => handleOperator("/")}>
            /
          </button>
          <button id="multiply" className="btn btn-secondary" onClick={() => handleOperator("*")}>
            *
          </button>
          <button id="subtract" className="btn btn-secondary" onClick={() => handleOperator("-")}>
            -
          </button>
          <button id="add" className="btn btn-secondary" onClick={() => handleOperator("+")}>
            +
          </button>
          <button id="clear" className="btn btn-danger" onClick={handleClear}>
            AC
          </button>
          {/* Baris angka */}
          <button id="one" className="btn btn-dark" onClick={() => handleNumber("1")}>
            1
          </button>
          <button id="two" className="btn btn-dark" onClick={() => handleNumber("2")}>
            2
          </button>
          <button id="three" className="btn btn-dark" onClick={() => handleNumber("3")}>
            3
          </button>
           <button id="decimal" className="btn btn-dark" onClick={handleDecimal}>
            .
          </button>
          <button id="four" className="btn btn-dark" onClick={() => handleNumber("4")}>
            4
          </button>
          <button id="five" className="btn btn-dark" onClick={() => handleNumber("5")}>
            5
          </button>
          <button id="six" className="btn btn-dark" onClick={() => handleNumber("6")}>
            6
          </button>
            <button id="zero" className="btn btn-dark" onClick={() => handleNumber("0")}>
            0
          </button>
             <button id="seven" className="btn btn-dark" onClick={() => handleNumber("7")}>
            7
          </button>
          <button id="eight" className="btn btn-dark" onClick={() => handleNumber("8")}>
            8
          </button>
          <button id="nine" className="btn btn-dark" onClick={() => handleNumber("9")}>
            9
          </button>
          <button id="equals" className="btn btn-primary" onClick={handleEvaluate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
