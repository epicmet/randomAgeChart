import React from "react";
import {
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
import { BAR_WIDTH, BAR_HEIGHT, CONTAINER_HEIGHT } from "../context/constants";

const Chart = () => {
  const { filteredData, people } = useAppContext();

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={CONTAINER_HEIGHT}>
        <BarChart
          width={BAR_WIDTH}
          height={BAR_HEIGHT}
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
