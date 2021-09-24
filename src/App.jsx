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
} from "recharts";

import { getRandomNumber, sortByAge } from "./utils";
import mockData from "./mockData";

const url = "https://randomuser.me/api/";

const App = () => {
  const [people, setPeople] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const constructArr = (arr) => {
    const results = [];
    for (let profile of arr) {
      const {
        dob: { age },
      } = profile;
      if (results.some((obj) => obj.age === age)) {
        const index = results.findIndex((obj) => obj.age === age);
        results[index].amount++;
      } else {
        results.push({ age, amount: 1 });
      }
    }
    return results;
  };

  const fetchNewData = async () => {
    // API Request
    const resp = await fetch(`${url}?results=${getRandomNumber()}`);
    const data = await resp.json();
    setPeople(data);

    // Sorting and constructing new arr
    const chartData = constructArr(data.results);
    const sortedData = sortByAge(chartData);
    setChartData(sortedData);
  };

  useEffect(() => {
    fetchNewData();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="min">Min: </label>
        <input
          id="min"
          type="text"
          onChange={(e) => setMin(e.target.value)}
          value={min}
        />
        <label htmlFor="max">Max: </label>
        <input
          id="max"
          type="text"
          onChange={(e) => setMax(e.target.value)}
          value={max}
        />
      </form>
      <div style={{ height: "100vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 2" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <button type="button" onClick={fetchNewData}>
        fetch new data
      </button>
    </div>
  );
};

export default App;
