"use client";

import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StepCadencePoint {
  time: string;
  steps: number;
  cadence: number;
}

interface Props {
  stepCadenceData?: StepCadencePoint[];
}

const defaultData: StepCadencePoint[] = [
  { time: "0s", steps: 0, cadence: 80 },
  { time: "1s", steps: 20, cadence: 85 },
  { time: "2s", steps: 45, cadence: 95 },
  { time: "3s", steps: 70, cadence: 100 },
  { time: "4s", steps: 95, cadence: 105 },
  { time: "5s", steps: 120, cadence: 98 },
];

export default function StepCadenceChart({ stepCadenceData }: Props) {
  const data = stepCadenceData ?? defaultData;

  return (
    <Link href={"/charts/step-cadence"} className="h-full">
      <div className="bg-white p-6 rounded-xl h-full shadow w-full">
        <h2 className="text-lg font-semibold mb-1 text-gray-800">
          Step Count & Cadence
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tracks how step count and cadence evolve over time during activity.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              yAxisId="left"
              label={{ value: "Steps", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Cadence", angle: -90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="steps"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cadence"
              stroke="#f59e0b"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
