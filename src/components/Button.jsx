import React from "react";
import { useAppContext } from "../context/AppContext";

const Button = ({ text }) => {
  const { fetchNewData } = useAppContext();

  return (
    <button type="button" onClick={fetchNewData}>
      {text}
    </button>
  );
};

export default Button;
