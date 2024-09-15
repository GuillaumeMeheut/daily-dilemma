"use client";

import { capitalizeFirstLetter } from "@/lib/utils";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

type Stats = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
};

type CustomRadarProps = {
  stats: Stats;
};

export default function CustomRadarChart({ stats }: CustomRadarProps) {
  const data = Object.keys(stats).map((key) => {
    const typedKey = key as keyof Stats;
    return {
      trait: capitalizeFirstLetter(key),
      A: stats[typedKey],
      fullMark: 150,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#4a5568" />
        <PolarAngleAxis
          dataKey="trait"
          tick={{ fill: "black", fontSize: 14 }}
        />
        <Radar
          name="Character"
          dataKey="A"
          stroke="#4c51bf"
          fill="#4c51bf"
          fillOpacity={0.6}
          dot={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
