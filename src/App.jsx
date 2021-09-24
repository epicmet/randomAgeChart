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

import { getRandomNumber, sortByAge, constructArr } from "./utils";
import mockData from "./mockData";

const url = "https://randomuser.me/api/";

const CustomTooltip = ({ active, payload, label, people }) => {
  if (active) {
    const currPeople = people.results.filter(
      (p) => p.dob.age === payload[0].payload.age
    );

    return (
      <div>
        <p>Age: {label}</p>
        <p>amount: {payload[0].payload.amount}</p>
        {currPeople.map((p, index) => (
          <p key={index}>{p.name.first}</p>
        ))}
      </div>
    );
  }

  return null;
};

const App = () => {
  const [people, setPeople] = useState([]);
  const [chartData, setChartData] = useState([]);
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

  const minHandler = (val) => {
    let newVal = val;
    if (!(newVal >= maxInput)) setMinInput(val);
  };

  const maxHandler = (val) => {
    let newVal = val;
    if (!(newVal <= minInput)) setMaxInput(val);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="min">Min: </label>
        <input
          id="min"
          type="number"
          onChange={(e) => minHandler(e.target.value)}
          min={min}
          value={minInput}
        />
        <label htmlFor="max">Max: </label>
        <input
          id="max"
          type="number"
          onChange={(e) => maxHandler(e.target.value)}
          max={max}
          value={maxInput}
        />
      </form>
      <div style={{ height: "100vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <CartesianGrid strokeDasharray="3 2" vertical={false} />
            <XAxis dataKey="age" tickLine={false} />
            <YAxis tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip people={people} />} />
            <Legend />
            <Bar type="monotone" dataKey="amount" stroke="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button type="button" onClick={fetchNewData}>
        fetch new data
      </button>
    </div>
  );
};

export default App;
