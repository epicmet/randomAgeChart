import React from "react";
import { useAppContext } from "../context/AppContext";

const Form = () => {
  const { min, max, minInput, setMinInput, maxInput, setMaxInput } =
    useAppContext();

  const minHandler = (val) => {
    if (!(val >= maxInput)) setMinInput(val);
  };

  const maxHandler = (val) => {
    if (!(val <= minInput)) setMaxInput(val);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="form">
      <div className="form-control">
        <label htmlFor="min">Min: </label>
        <input
          id="min"
          type="number"
          onChange={(e) => minHandler(e.target.value)}
          min={min}
          value={minInput}
        />
      </div>
      <div className="form-control">
        <label htmlFor="max">Max: </label>
        <input
          id="max"
          type="number"
          onChange={(e) => maxHandler(e.target.value)}
          max={max}
          value={maxInput}
        />
      </div>
    </form>
  );
};

export default Form;
