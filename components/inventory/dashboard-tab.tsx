import { Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "@/components/sales-chart";
import { BestSellersBubbles } from "@/components/best-sellers-bubbles";
import type { Book as BookType } from "@/lib/types";

interface DashboardTabProps {
  salesChartData: { date: string; amount: number }[];
  sortedBestSellers: BookType[];
  category?: string;
  author?: string;
}

export function DashboardTab({
  salesChartData,
  sortedBestSellers,
  category,
  author,
}: DashboardTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-lg">
      <SalesChart data={salesChartData} />

      <Card className="rounded-[2rem] border-slate-200 shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-md">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Libros Más Vendidos
                </CardTitle>
                <CardDescription className="font-medium text-slate-500">
                  {category && category !== "Todas"
                    ? `Top ventas en ${category}`
                    : author && author !== "Todos"
                    ? `Top ventas de ${author}`
                    : "Top 10 títulos con mayor número de ventas generales."}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-sm pb-lg flex flex-col justify-center min-h-[400px]">
          {sortedBestSellers.length > 0 ? (
            <BestSellersBubbles data={sortedBestSellers} />
          ) : (
            <div className="flex flex-col items-center justify-center py-lg text-center border-2 border-dashed border-slate-200 rounded-3xl">
              <Trophy className="h-12 w-12 text-slate-300 mb-sm" />
              <p className="text-slate-500 font-medium">No hay ventas registradas para este filtro</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
