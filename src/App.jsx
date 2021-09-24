import React, { useState, useEffect } from "react";

import {
  getRandomNumber,
  sortByAge,
  constructArr,
  setBoundries,
} from "./utils";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Button from "./components/Button";
import { useAppContext } from "./context/AppContext";
import mockData from "./mockData";

const App = () => {
  const {
    people,
    fetchNewData,
    chartData,
    filteredData,
    setFilteredData,
    min,
    max,
    minInput,
    setMinInput,
    maxInput,
    setMaxInput,
  } = useAppContext();

  useEffect(() => {
    fetchNewData();
  }, []);

  useEffect(() => {
    if (chartData.length !== 0 && minInput !== 0 && maxInput !== 100) {
      const newChartData = setBoundries(minInput, maxInput, chartData);
      setFilteredData(newChartData);
    }
  }, [minInput, maxInput]);

  return (
    <section className="section">
      <Form />
      <Chart />
      <Button />
    </section>
  );
};

export default App;
