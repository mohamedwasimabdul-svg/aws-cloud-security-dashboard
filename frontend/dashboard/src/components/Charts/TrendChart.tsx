import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface Props {
  data: any[];
}

function TrendChart({
  data
}: Props) {

  return (

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <LineChart
        data={data}
      >

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="date"
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#1976d2"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  );
}

export default TrendChart;