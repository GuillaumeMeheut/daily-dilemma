"use client";

import { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { subject: "Strength", A: 120, fullMark: 150 },
  { subject: "Intelligence", A: 98, fullMark: 150 },
  { subject: "Agility", A: 86, fullMark: 150 },
  { subject: "Charisma", A: 99, fullMark: 150 },
  { subject: "Luck", A: 85, fullMark: 150 },
  { subject: "Stamina", A: 65, fullMark: 150 },
];

export default function CustomRadarChart() {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">
        Character Stats
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#4a5568" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#e2e8f0", fontSize: 14 }}
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
    </Card>
  );
}
