"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { trait: "Openness", A: 7, fullMark: 150 },
  { trait: "Conscientiousness", A: -10, fullMark: 150 },
  { trait: "Extraversion", A: 86, fullMark: 150 },
  { trait: "Agreeableness", A: 99, fullMark: 150 },
  { trait: "Neuroticism", A: 85, fullMark: 150 },
];

export default function CustomRadarChart() {
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
