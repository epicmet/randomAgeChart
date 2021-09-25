import React, { useEffect } from "react";

import { setBoundries } from "./services/services";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Button from "./components/Button";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { fetchNewData, chartData, setFilteredData, minInput, maxInput } =
    useAppContext();

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
