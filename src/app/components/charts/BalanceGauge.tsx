"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";

interface Props {
  balanceScore?: number;
}

export default function BalanceGauge({ balanceScore = 78 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: ["Stable", "Unstable"],
      datasets: [
        {
          data: [balanceScore, 100 - balanceScore],
          backgroundColor: ["#10b981", "#ef4444"],
          borderWidth: 0,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: "doughnut",
      data,
      options: {
        cutout: "70%",
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [balanceScore]);

  return (
    <Link href={"/charts/balance"} className="h-full">
      <div className="bg-white p-6 h-full rounded-xl shadow w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Postural Stability
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Evaluates the user's balance control. Higher values indicate more
          stability.
        </p>
        <canvas ref={canvasRef} width={300} height={300} />
      </div>
    </Link>
  );
}
