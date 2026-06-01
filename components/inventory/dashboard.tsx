"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesChart } from "@/components/sales-chart";
import { BestSellersBubbles } from "@/components/best-sellers-bubbles";
import type { Book as BookType } from "@/lib/types";

interface DashboardProps {
  salesChartData: { date: string; amount: number }[];
  sortedBestSellers: BookType[];
  category?: string;
  author?: string;
}

export function Dashboard({ salesChartData, sortedBestSellers, category, author }: DashboardProps) {
  const [groupBy, setGroupBy] = useState<"category" | "author" | "book">("category");

  const description = category && category !== "Todas"
    ? `Top ventas en ${category}`
    : author && author !== "Todos"
    ? `Top ventas de ${author}`
    : "Top 10 por numero de ventas";

  return (
    <div className="border-soft overflow-hidden mb-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Sales chart */}
        <div className="lg:border-r border-foreground/15 flex flex-col">
          <SalesChart data={salesChartData} />
        </div>

        {/* Best sellers */}
        <div className="flex flex-col border-t border-foreground/15 lg:border-t-0">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-foreground/15">
            <Trophy className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
            <span className="label-sans">Mas vendidos</span>
          </div>

          {/* Bubble chart */}
          <div className="flex-1 min-h-0 flex flex-col justify-center p-6 min-h-[300px]">
            {sortedBestSellers.length > 0 ? (
              <BestSellersBubbles data={sortedBestSellers} groupBy={groupBy} />
            ) : (
              <div className="flex flex-col items-center justify-center py-lg text-center">
                <Trophy className="h-8 w-8 text-foreground/15 mb-4" />
                <p className="label-mono">Sin ventas registradas</p>
              </div>
            )}
          </div>

          {/* Footer — group-by selector + description */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-foreground/15">
            <span className="label-mono">{description}</span>
            <Tabs value={groupBy} onValueChange={(val) => setGroupBy(val as "category" | "author" | "book")}>
              <TabsList className="rounded-none bg-card border-soft h-auto p-0 gap-0">
                <TabsTrigger value="category" className="rounded-none px-3 py-2 label-sans text-[10px] data-[state=active]:bg-foreground data-[state=active]:text-background">Generos</TabsTrigger>
                <TabsTrigger value="author" className="rounded-none px-3 py-2 label-sans text-[10px] data-[state=active]:bg-foreground data-[state=active]:text-background">Autores</TabsTrigger>
                <TabsTrigger value="book" className="rounded-none px-3 py-2 label-sans text-[10px] data-[state=active]:bg-foreground data-[state=active]:text-background">Libros</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

      </div>
    </div>
  );
}
