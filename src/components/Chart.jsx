import React from "react";
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
import CustomTooltip from "./CustomTooltip";
import { useAppContext } from "../context/AppContext";

const Chart = () => {
  const { filteredData, people } = useAppContext();

  return (
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
  );
};

export default Chart;
