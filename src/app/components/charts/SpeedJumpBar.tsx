"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  speed?: number;
  jump?: number;
}

export default function SpeedJumpBar({ speed = 6.0, jump = 30 }: Props) {
  const data = [{ label: "Result", speed, jump }];

  return (
    <Link href={"/charts/speed-and-jump"} className="h-full">
      <div className="bg-white p-6 rounded-xl h-full shadow w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Speed & Jump Height
        </h2>
        <p className="text-gray-500 text-sm mb-2">
          Measures running speed (km/h) and vertical jump height (cm) for
          athletic or rehab purposes.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="speed" fill="#3b82f6" name="Speed (km/h)" />
            <Bar dataKey="jump" fill="#f59e0b" name="Jump Height (cm)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
