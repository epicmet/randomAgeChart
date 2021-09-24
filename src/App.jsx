import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  getRandomNumber,
  sortByAge,
  constructArr,
  setBoundries,
} from "./utils";
import CustomTooltip from "./CustomTooltip";
import mockData from "./mockData";

const url = "https://randomuser.me/api/";

const App = () => {
  const [people, setPeople] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [minInput, setMinInput] = useState(0);
  const [maxInput, setMaxInput] = useState(100);

  const fetchNewData = async () => {
    // API Request
    const resp = await fetch(`${url}?results=${getRandomNumber()}`);
    const data = await resp.json();
    setPeople(data);

    // Sorting and constructing new arr
    const constructedArr = constructArr(data.results);
    const sortedData = sortByAge(constructedArr);
    setChartData(sortedData);
    setFilteredData(sortedData);

    const minVal = sortedData.reduce((curr, final) => {
      return curr.age < final.age ? curr : final;
    });
    setMin(minVal.age);
    setMinInput(minVal.age);

    const maxVal = sortedData.reduce((curr, final) => {
      return curr.age > final.age ? curr : final;
    });
    setMax(maxVal.age);
    setMaxInput(maxVal.age);
  };

  useEffect(() => {
    fetchNewData();
  }, []);

  useEffect(() => {
    if (chartData.length !== 0 && minInput !== 0 && maxInput !== 100) {
      const newChartData = setBoundries(minInput, maxInput, chartData);
      setFilteredData(newChartData);
    }
  }, [minInput, maxInput]);

  const minHandler = (val) => {
    let newVal = val;
    if (!(newVal >= maxInput)) setMinInput(val);
  };

  const maxHandler = (val) => {
    let newVal = val;
    if (!(newVal <= minInput)) setMaxInput(val);
  };

  return (
    <section className="section">
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
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={filteredData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 2" vertical={false} />
            <XAxis dataKey="age" tickLine={false} />
            <YAxis tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip people={people} />} />
            <Legend />
            <Bar
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              fill="#3bacee"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button type="button" onClick={fetchNewData}>
        Fetch New Data
      </button>
    </section>
  );
};

export default App;
