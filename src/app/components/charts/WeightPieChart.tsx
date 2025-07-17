"use client";

import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  weightData?: number[];
}

const defaultData = [
  { name: "Left Foot", value: 52 },
  { name: "Right Foot", value: 48 },
];

const COLORS = ["#1d4ed8", "#60a5fa"];

export default function WeightPieChart({ weightData }: Props) {
  const data = weightData
    ? [
        { name: "Left Foot", value: weightData[0] },
        { name: "Right Foot", value: weightData[1] },
      ]
    : defaultData;

  const chartContent = (
    <div className="bg-white p-6 rounded-xl h-full shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Weight Distribution
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Displays how the body weight is distributed between the left and right
        foot.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <Link href="/charts/weight-destribution" className="block hover:opacity-90">
      {chartContent}
    </Link>
  );
}
