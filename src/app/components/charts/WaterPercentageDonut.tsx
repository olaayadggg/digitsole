"use client";

import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  water?: number;
}

const COLORS = ["#60a5fa", "#f1f5f9"];

export default function WaterPercentageDonut({ water = 55 }: Props) {
  const data = [
    { name: "Water", value: water },
    { name: "Other", value: Math.max(0, 100 - water) },
  ];

  return (
    <Link href="/charts/water" className="h-full">
      <div className="bg-white p-6 h-full rounded-xl shadow w-full">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Body Water Percentage
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Represents the proportion of body mass made up of water.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
