"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  fatValue?: number;
}

export default function BodyFatBarChart({ fatValue = 20 }: Props) {
  const data = [
    { name: "Fat %", value: fatValue },
    { name: "Ideal Max", value: 25 },
  ];

  return (
    <Link href="/charts/body-fat" className="h-full">
      <div className="bg-white p-6 rounded-xl h-full shadow w-full">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Body Fat Distribution
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Shows body fat percentage compared to the recommended maximum.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#fb923c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
