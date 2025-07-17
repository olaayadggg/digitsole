"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  pressureData?: number[];
}

const defaultData = [
  { area: "Heel", pressure: 32 },
  { area: "Midfoot", pressure: 18 },
  { area: "Forefoot", pressure: 50 },
];

export default function PressureBarChart({ pressureData }: Props) {
  const data = pressureData
    ? [
        { area: "Heel", pressure: pressureData[0] },
        { area: "Midfoot", pressure: pressureData[1] },
        { area: "Forefoot", pressure: pressureData[2] },
      ]
    : defaultData;

  const chartContent = (
    <div className="bg-white h-full p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Plantar Pressure Mapping
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Based on heel/midfoot/forefoot pressure from matched profile.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="area" />
          <YAxis
            label={{
              value: "Pressure (N/cm²)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="pressure" fill="#2563eb" name="Pressure" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <Link href="/charts/plantar-pressure" className="block hover:opacity-90">
      {chartContent}
    </Link>
  );
}
