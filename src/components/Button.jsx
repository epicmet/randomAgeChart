import React from "react";
import { useAppContext } from "../context/AppContext";

const Button = () => {
  const { fetchNewData } = useAppContext();

  return (
    <button type="button" onClick={fetchNewData}>
      Fetch New Data
    </button>
  );
};

export default Button;
