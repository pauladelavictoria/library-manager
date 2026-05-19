"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import type { Book } from "@/lib/types";

interface BestSellersBubblesProps {
  data: Book[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card className="p-sm border-slate-200 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl border">
        <p className="font-black text-sm mb-xs">{data.title}</p>
        <p className="text-xs font-bold text-primary uppercase tracking-widest">
          {data.total} unidades vendidas
        </p>
      </Card>
    );
  }
  return null;
};

export function BestSellersBubbles({ data }: BestSellersBubblesProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    x: (index % 5) * 20 + Math.random() * 10,
    y: Math.floor(index / 5) * 50 + Math.random() * 20,
    size: item.sold_count,
  }));

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis type="number" dataKey="x" hide />
          <YAxis type="number" dataKey="y" hide />
          <ZAxis
            type="number"
            dataKey="size"
            range={[400, 4000]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Libros" data={chartData}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(var(--primary) / ${1 - index * 0.08})`}
                className="hover:opacity-80 transition-opacity cursor-pointer drop-shadow-lg"
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
