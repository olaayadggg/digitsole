"use client";

import Link from "next/link";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
  kinematicsData?: {
    dorsiflexion: number;
    plantarflexion: number;
    pronation: number;
    supination: number;
  };
};

const defaultData = [
  { metric: "Dorsiflexion", value: 75 },
  { metric: "Plantarflexion", value: 50 },
  { metric: "Pronation", value: 65 },
  { metric: "Supination", value: 55 },
];

export default function FootKinematicsRadar({ kinematicsData }: Props) {
  const chartData = kinematicsData
    ? [
        { metric: "Dorsiflexion", value: kinematicsData.dorsiflexion },
        { metric: "Plantarflexion", value: kinematicsData.plantarflexion },
        { metric: "Pronation", value: kinematicsData.pronation },
        { metric: "Supination", value: kinematicsData.supination },
      ]
    : defaultData;

  return (
    <Link
      href="/charts/foot-kinematics"
      className="block hover:opacity-90 h-full transition-all"
    >
      <div className="bg-white p-6 h-full rounded-xl shadow w-full cursor-pointer">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Foot Motion Angles
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This chart shows the angles of foot movement including dorsiflexion,
          plantarflexion, pronation, and supination.
        </p>

        <ResponsiveContainer width="100%" height={500}>
          <RadarChart outerRadius={100} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Foot Angles"
              dataKey="value"
              stroke="#2563eb"
              fill="#60a5fa"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
