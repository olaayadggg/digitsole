"use client";

import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  gaitData?: { time: string; cadence: number }[];
}

const defaultData = [
  { time: "0s", cadence: 80 },
  { time: "1s", cadence: 95 },
  { time: "2s", cadence: 102 },
  { time: "3s", cadence: 100 },
  { time: "4s", cadence: 105 },
  { time: "5s", cadence: 98 },
];

export default function GaitChart({ gaitData }: Props) {
  const data = gaitData || defaultData;

  return (
    <Link href={"/charts/gait-analysis"} className="h-full">
      <div className="bg-white p-6 rounded-xl h-full shadow w-full">
        <h2 className="font-semibold text-lg text-gray-800 mb-1">
          Gait Analysis
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This chart displays cadence changes over time, helping assess gait
          cycle and stride symmetry.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{ value: "Steps/min", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cadence"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
