import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import {
  LabelList
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
          fill="#0876e4"
          radius={[8,8,0,0]}
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