import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CreatePromoDialog } from "@/components/create-promo-dialog";
import { PromoActions } from "@/components/promo-actions";
import type { PromoCode } from "@/lib/types";

interface PromoTabProps {
  promoPerformance: (PromoCode & {
    usage_count: number;
    total_discount: number;
    total_revenue: number;
    isActive: boolean;
    is_one_time?: boolean;
  })[];
  totalDiscountGiven: number;
  activePromosCount: number;
}

export function PromoTab({
  promoPerformance,
  totalDiscountGiven,
  activePromosCount,
}: PromoTabProps) {
  return (
    <div className="mb-lg">
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">Rendimiento de Promociones</h2>
        </div>
        <div className="flex gap-3">
          <CreatePromoDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-lg">
        <Card className="rounded-3xl border-slate-200 shadow-lg bg-emerald-500/5 border-emerald-500/10">
          <CardHeader className="pb-sm">
            <CardDescription className="font-bold uppercase tracking-widest text-[10px]">
              Ahorro Total Clientes
            </CardDescription>
            <CardTitle className="text-3xl font-black text-emerald-600">
              €{totalDiscountGiven.toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="rounded-3xl border-slate-200 shadow-lg">
          <CardHeader className="pb-sm">
            <CardDescription className="font-bold uppercase tracking-widest text-[10px]">
              Cupones Activos
            </CardDescription>
            <CardTitle className="text-3xl font-black">{activePromosCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="rounded-3xl border-slate-200 shadow-lg">
          <CardHeader className="pb-sm">
            <CardDescription className="font-bold uppercase tracking-widest text-[10px]">
              Pedidos con Cupón
            </CardDescription>
            <CardTitle className="text-3xl font-black">
              {promoPerformance.reduce((sum, p) => sum + (p.usage_count || 0), 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="rounded-3xl border-slate-200 shadow-lg">
          <CardHeader className="pb-sm">
            <CardDescription className="font-bold uppercase tracking-widest text-[10px]">
              Ingresos vía Promo
            </CardDescription>
            <CardTitle className="text-3xl font-black text-primary">
              €{promoPerformance.reduce((sum, p) => sum + (p.total_revenue || 0), 0).toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="rounded-[2rem] border-slate-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="pl-xl font-bold uppercase text-[10px] tracking-widest py-lg">
                Código
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Descuento
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Usos
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Total Descontado
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Ingresos (Neto)
              </TableHead>
              <TableHead className="pr-xl text-right font-bold uppercase text-[10px] tracking-widest">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promoPerformance.map((promo) => (
              <TableRow
                key={promo.code}
                className="group border-slate-100 hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="pl-lg py-md">
                  <div className="flex items-center gap-3">
                    <div className="p-sm rounded-lg bg-primary/10 text-primary">
                      <Tag className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-black tracking-tight">{promo.code}</p>
                      <div className="flex items-center gap-1.5">
                        <div
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            promo.isActive ? "bg-emerald-500" : "bg-slate-300"
                          )}
                        />
                        <p className="text-[10px] font-bold uppercase tracking-tighter">
                          {promo.isActive
                            ? "Activo"
                            : promo.is_one_time && promo.usage_count > 0
                              ? "Usado"
                              : "Inactivo"}
                        </p>
                        {promo.is_one_time && (
                          <Badge
                            variant="secondary"
                            className="text-[8px] h-3.5 px-xs rounded bg-amber-100 text-amber-700 border-none font-black uppercase"
                          >
                            Único
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="rounded-md font-black border-primary/20 text-primary bg-primary/5"
                  >
                    -{promo.discount_amount}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-slate-600">{promo.usage_count}</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-red-600">
                    -€{(promo.total_discount || 0).toFixed(2)}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  <p className="font-black text-lg tracking-tight">
                    €{(promo.total_revenue || 0).toFixed(2)}
                  </p>
                </TableCell>
                <TableCell className="pl-xl">
                  <PromoActions promo={promo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
