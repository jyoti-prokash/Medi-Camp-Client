import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useParticipantsCamps from "../../Hooks/useParticipantsCamps";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

// Custom path for the triangle bar shape
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } ${x + width / 2},${y} C${x + width / 2},${y + height / 3} ${
    x + (2 * width) / 3
  },${y + height} ${x + width},${y + height} Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Analytics = () => {
  const [registeredCamps, loading, refetch] = useParticipantsCamps();

  if (loading) {
    return <p className="text-center mt-10">Loading analytics...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-center font-bold text-2xl mb-6">
        Lifetime Analytics
      </h2>
      <div className="w-full overflow-x-auto">
        {/* Responsive container for the chart */}
        <ResponsiveContainer width={450} height={400}>
          <BarChart
            data={registeredCamps}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campName" />
            <YAxis />
            <Bar
              dataKey="campFees"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {registeredCamps.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
