import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

interface Props {
  data: any[];
}

function ResourceChart({ data }: Props) {

  return (

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <BarChart data={data}>

        <XAxis
          dataKey="resource"
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="count"
          radius={[6,6,0,0]}
        />

      </BarChart>

    </ResponsiveContainer>

  );
}

export default ResourceChart;