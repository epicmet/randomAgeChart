import React, { useEffect } from "react";

import { setBoundries } from "./services/services";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Button from "./components/Button";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const {
    fetchNewData,
    chartData,
    setFilteredData,
    minInput,
    maxInput,
    error,
    setError,
  } = useAppContext();

  useEffect(() => {
    try {
      setError(false);
      fetchNewData();
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (chartData.length !== 0 && minInput !== 0 && maxInput !== 100) {
      const newChartData = setBoundries(minInput, maxInput, chartData);
      setFilteredData(newChartData);
    }
  }, [minInput, maxInput]);

  if (error)
    return (
      <h1 className="error">Somthing went wrong! Please try again later</h1>
    );

  return (
    <section className="section">
      <Form />
      <Chart />
      <Button />
    </section>
  );
};

export default App;
