"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SalesData {
  date: string;
  amount: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get("period") || "week";
  const totalSales = data.reduce((sum, item) => sum + item.amount, 0);

  const handlePeriodChange = (period: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", period);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const inkColor = "hsl(var(--foreground))";
  const mutedColor = "hsl(var(--muted-foreground))";
  const bgColor = "hsl(var(--background))";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-foreground/15">
        <TrendingUp className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
        <span className="label-sans">Tendencia de ventas</span>
      </div>

      {/* Chart */}
      <div className="p-6 flex-1 min-h-0">
        <div className="h-full w-full min-h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={inkColor} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={inkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="hsl(var(--foreground) / 0.08)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: mutedColor, fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                dy={10}
                interval={currentPeriod === "month" ? 5 : 0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: mutedColor, fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                tickFormatter={(value) => `€${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: bgColor,
                  border: `2px solid ${inkColor}`,
                  borderRadius: 0,
                  boxShadow: "none",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 11,
                }}
                itemStyle={{ color: inkColor, fontWeight: 700 }}
                labelStyle={{ fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}
                formatter={(value) => [`€${Number(value || 0).toFixed(2)}`, "Ventas"]}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke={inkColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer — selector + total */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-foreground/15">
        <Tabs value={currentPeriod} onValueChange={handlePeriodChange}>
          <TabsList className="rounded-none bg-card border-soft h-auto p-0 gap-0">
            <TabsTrigger value="week" className="rounded-none px-3 py-2 label-sans text-[10px] data-[state=active]:bg-foreground data-[state=active]:text-background">Semana</TabsTrigger>
            <TabsTrigger value="month" className="rounded-none px-3 py-2 label-sans text-[10px] data-[state=active]:bg-foreground data-[state=active]:text-background">Mes</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="text-right">
          <p className="label-mono">Total periodo</p>
          <p className="price-mono">€{totalSales.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
