"use client";
import React from 'react';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PressureBarChart from "@/app/components/charts/PressureBarChart";
import BodyFatBarChart from "@/app/components/charts/BodyFatBarChart";
import BodyCompositionStacked from "@/app/components/charts/BodyCompositionStacked";
import WaterPercentageDonut from "@/app/components/charts/WaterPercentageDonut";
import { supabase } from "@/app/lib/supabase";
import {
  BalanceGauge,
  DynamicBalanceChart,
  FootKinematicsRadar,
  GaitChart,
  SpeedJumpBar,
  StepCadenceChart,
  WeightPieChart,
} from "@/app/components/charts";

export default function ChartDetailPage() {
  const { chartName } = useParams();
  const [matchedResult, setMatchedResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (!currentUser) return;

    const fetchMatchedResult = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("matched_result")
        .eq("id", currentUser.id)
        .single();

      if (error) {
        console.error("Error fetching matched result:", error);
      } else {
        setMatchedResult(data?.matched_result || null);
      }
      setLoading(false);
    };

    fetchMatchedResult();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!matchedResult)
    return <p className="text-center mt-10">No data found.</p>;

  const chartMap: Record<string, React.ReactNode> = {
    "plantar-pressure": (
      <PressureBarChart pressureData={matchedResult.pressure} />
    ),
    "weight-destribution": (
      <WeightPieChart weightData={matchedResult.weightDistribution} />
    ),
    "foot-kinematics": (
      <FootKinematicsRadar kinematicsData={matchedResult.FootKinematicsRadar} />
    ),
    balance: <BalanceGauge balanceScore={matchedResult.balance_score} />,
    "step-cadence": (
      <StepCadenceChart stepCadenceData={matchedResult.step_cadence_data} />
    ),
    "gait-analysis": <GaitChart gaitData={matchedResult.gait_analysis_data} />,
    "speed-and-jump": (
      <SpeedJumpBar speed={matchedResult.speed} jump={matchedResult.jump} />
    ),
    "body-fat": <BodyFatBarChart fatValue={matchedResult.fat} />,
    water: <WaterPercentageDonut water={matchedResult.water} />,
    "body-composition": (
      <BodyCompositionStacked
        fat={matchedResult.fat}
        water={matchedResult.water}
      />
    ),
    "dynamic-balance": (
      <DynamicBalanceChart swayData={matchedResult.sway_data} />
    ),
  };

  const chart = chartMap[chartName as string];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold capitalize text-blue-800">
        {chartName?.toString().replace("-", " ")} Chart Details
      </h1>
      {chart || <p className="text-red-600">Chart not found.</p>}
    </div>
  );
}
