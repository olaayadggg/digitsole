"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  fat: number;
  water: number;
}

export default function BodyCompositionStacked({ fat, water }: Props) {
  const data = [
    {
      name: "Body Composition",
      Fat: fat,
      Water: water,
      Other: Math.max(0, 100 - fat - water),
    },
  ];

  return (
    <Link href={"/charts/body-composition"} className="h-full">
      <div className="bg-white p-6 rounded-xl h-full shadow w-full">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Body Composition
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Shows the distribution of fat, water, and other mass in the body.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} stackOffset="expand">
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `${v * 100}%`} />
            <Tooltip
              formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
            />
            <Legend />
            <Bar dataKey="Fat" stackId="a" fill="#f87171" />
            <Bar dataKey="Water" stackId="a" fill="#60a5fa" />
            <Bar dataKey="Other" stackId="a" fill="#a3e635" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
