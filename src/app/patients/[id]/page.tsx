"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import PressureBarChart from "@/app/components/charts/PressureBarChart";
import BodyFatBarChart from "@/app/components/charts/BodyFatBarChart";
import BodyCompositionStacked from "@/app/components/charts/BodyCompositionStacked";
import WaterPercentageDonut from "@/app/components/charts/WaterPercentageDonut";
import DynamicBalanceChart from "@/app/components/charts/DynamicBalanceChart";
import Form from "@/app/components/Form";
import Button from "@/app/components/ui/Button";

import {
  BalanceGauge,
  FootKinematicsRadar,
  GaitChart,
  SpeedJumpBar,
  StepCadenceChart,
  WeightPieChart,
} from "@/app/components/charts";
import { useUser } from "@/app/context/UserContext";

export default function PatientViewPage() {
  const { id } = useParams();
  const [matchedResult, setMatchedResult] = useState<any>(null);
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMatchedResult = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("matched_result")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Failed to fetch matched_result:", error.message);
        setLoading(false);
        return;
      }

      setMatchedResult(data?.matched_result || null);
      setLoading(false);
    };

    fetchMatchedResult();
  }, [id]);

  const reset = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("users")
      .update({ matched_result: null })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to reset matched_result:", error.message);
      return;
    }

    setMatchedResult(null);
    localStorage.setItem("currentUser", JSON.stringify(data));
    setUser(data);
  };
  if (loading) return <p className="text-center mt-10">Loading data...</p>;
  if (!matchedResult)
    return (
      <section>
        <Form onMatch={(result) => setMatchedResult(result)} />
      </section>
    );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-700">Health Metrics</h2>
        <Button text="Reset" onClick={() => reset()} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 ">
        <PressureBarChart pressureData={matchedResult.pressure} />
        <WeightPieChart weightData={matchedResult.weightDistribution} />
        <FootKinematicsRadar kinematicsData={matchedResult.foot_kinematics} />
        <BalanceGauge balanceScore={matchedResult.balance_score} />
        <StepCadenceChart stepCadenceData={matchedResult.step_cadence_data} />
        <GaitChart gaitData={matchedResult.gait_analysis_data} />
        <SpeedJumpBar speed={matchedResult.speed} jump={matchedResult.jump} />
        <BodyFatBarChart fatValue={matchedResult.fat} />
        <BodyCompositionStacked
          fat={matchedResult.fat}
          water={matchedResult.water}
        />
        <WaterPercentageDonut water={matchedResult.water} />
      </div>

      <DynamicBalanceChart swayData={matchedResult.sway_data} />
    </section>
  );
}
