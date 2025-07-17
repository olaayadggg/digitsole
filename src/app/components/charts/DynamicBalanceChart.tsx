"use client";

import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  swayData?: { time: string; sway: number }[];
}

const fallbackData = [
  { time: "0s", sway: 0 },
  { time: "1s", sway: 2 },
  { time: "2s", sway: 4 },
  { time: "3s", sway: 1 },
  { time: "4s", sway: -1 },
  { time: "5s", sway: -3 },
  { time: "6s", sway: 0 },
];

export default function DynamicBalanceChart({ swayData }: Props) {
  const data = swayData && swayData.length > 0 ? swayData : fallbackData;

  return (
    <Link href={"/charts/dynamic-balance"}>
      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Dynamic Balance Evaluation
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Shows balance adjustments and body sway over time while walking or
          exercising.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="swayColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{ value: "Sway", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sway"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#swayColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
