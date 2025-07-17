// components/charts/LocalizedFootFatMap.tsx
"use client";

export default function LocalizedFootFatMap() {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Localized Foot Fat Mapping
      </h2>
      <svg viewBox="0 0 200 400" width="100%" height="280">
        <ellipse
          cx="100"
          cy="70"
          rx="30"
          ry="50"
          fill="#fde68a"
          stroke="#fbbf24"
          strokeWidth="2"
        />
        <ellipse
          cx="100"
          cy="170"
          rx="35"
          ry="60"
          fill="#fcd34d"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <ellipse
          cx="100"
          cy="290"
          rx="40"
          ry="65"
          fill="#facc15"
          stroke="#d97706"
          strokeWidth="2"
        />
        <text x="100" y="70" textAnchor="middle" fill="#92400e" fontSize="10">
          Forefoot
        </text>
        <text x="100" y="170" textAnchor="middle" fill="#92400e" fontSize="10">
          Midfoot
        </text>
        <text x="100" y="290" textAnchor="middle" fill="#92400e" fontSize="10">
          Heel
        </text>
      </svg>
      <p className="text-sm text-gray-600 mt-4">
        Approximate fat distribution based on regions.
      </p>
    </div>
  );
}
