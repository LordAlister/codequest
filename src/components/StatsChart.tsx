"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface StatsChartProps {
  htmlLessons: number
  cssLessons: number
  jsLessons: number
  pythonLessons: number
}

const COLORS = {
  HTML: "#f97316",
  CSS: "#3b82f6",
  JavaScript: "#eab308",
  Python: "#22c55e",
}

export default function StatsChart({
  htmlLessons,
  cssLessons,
  jsLessons,
  pythonLessons,
}: StatsChartProps) {
  const data = [
    { name: "HTML", leçons: htmlLessons },
    { name: "CSS", leçons: cssLessons },
    { name: "JavaScript", leçons: jsLessons },
    { name: "Python", leçons: pythonLessons },
  ]

  const total = htmlLessons + cssLessons + jsLessons + pythonLessons

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
        Complète des leçons pour voir tes stats 📊
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <XAxis
          dataKey="name"
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            color: "#fff",
          }}
          cursor={{ fill: "rgba(255,255,255,0.05)" }}
          formatter={(value) => [`${value} leçon${Number(value) > 1 ? "s" : ""}`, ""]}
        />
        <Bar dataKey="leçons" radius={[8, 8, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={COLORS[entry.name as keyof typeof COLORS]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
