import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import useParticipantsCamps from "../../Hooks/useParticipantsCamps";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Analytics = () => {
  const [registeredCamps, loading, refetch] = useParticipantsCamps();
  return (
    <div>
      <h2 className="text-center font-bold text-2xl m-10"> Lifetime Analytics</h2>
      <BarChart
        width={900}
        height={400}
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
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Analytics;
