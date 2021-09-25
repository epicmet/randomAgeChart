import React, { useEffect } from "react";

import { setBoundries } from "./services/services";
import { isEmptyArray, hasChanged } from "./utils/utils";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Button from "./components/Button";
import { useAppContext } from "./context/AppContext";
import { INITIAL_MIN_INPUT, INITIAL_MAX_INPUT } from "./constants/constants";

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
    if (
      !isEmptyArray(chartData) &&
      hasChanged(INITIAL_MIN_INPUT, minInput) &&
      hasChanged(INITIAL_MAX_INPUT, maxInput)
    ) {
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
      <Button text={"Fetch New Data"} />
    </section>
  );
};

export default App;
