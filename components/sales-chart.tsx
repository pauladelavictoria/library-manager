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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, CalendarDays } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

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

  return (
    <Card className="rounded-[2rem] border-slate-200 shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Tendencia de Ventas
            </CardTitle>
            <CardDescription className="font-medium">Ventas de {currentPeriod === "week" ? "la última semana" : "los últimos 30 días"}.</CardDescription>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex p-xs bg-slate-100 rounded-xl">
              <button
                onClick={() => handlePeriodChange("week")}
                className={cn( "px-sm py-xs.5 rounded-lg text-xs font-bold transition-all", currentPeriod === "week" ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-700 " )}
              >
                Semana
              </button>
              <button
                onClick={() => handlePeriodChange("month")}
                className={cn( "px-sm py-xs.5 rounded-lg text-xs font-bold transition-all", currentPeriod === "month" ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-700 " )}
              >
                Mes
              </button>
            </div>
            
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-xs">Total Periodo</p>
              <p className="text-xl font-black text-primary leading-none">€{totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-sm pb-lg">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                dy={10}
                interval={currentPeriod === "month" ? 5 : 0}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                tickFormatter={(value) => `€${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '1rem', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(8px)'
                }}
                itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 800 }}
                labelStyle={{ fontWeight: 800, marginBottom: '4px' }}
                formatter={(value: number | string) => [`€${Number(value).toFixed(2)}`, 'Ventas']}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
