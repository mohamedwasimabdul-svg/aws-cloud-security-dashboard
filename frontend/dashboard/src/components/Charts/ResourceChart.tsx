import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList
} from "recharts";

interface Props {
  data: any[];
}

function ResourceChart({ data }: Props) {

  return (

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <BarChart
        data={data}
        margin={{
          top: 25,
          right: 20,
          left: 0,
          bottom: 10
        }}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          opacity={0.3}
        />

        <XAxis
          dataKey="resource"
          tick={{
            fontSize: 12
          }}
        />

        <YAxis
          allowDecimals={false}
        />

        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            border: "none"
          }}
        />

        <Bar
          dataKey="count"
          fill="#2196f3"
          radius={[8, 8, 0, 0]}
        >

          <LabelList
            dataKey="count"
            position="top"
          />

        </Bar>

      </BarChart>

    </ResponsiveContainer>

  );
}

export default ResourceChart;