import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

interface Props {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

const COLORS = [
  "#d32f2f",
  "#f57c00",
  "#fbc02d",
  "#388e3c"
];

function SeverityChart({
  critical,
  high,
  medium,
  low
}: Props) {

  const data = [
    {
      name: "Critical",
      value: critical
    },
    {
      name: "High",
      value: high
    },
    {
      name: "Medium",
      value: medium
    },
    {
      name: "Low",
      value: low
    }
  ];

  return (

    <ResponsiveContainer
      width="100%"
      height={260}
    >

      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
        >

          {data.map(
            (_, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[index]
                }
              />

            )
          )}

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>
  );
}

export default SeverityChart;