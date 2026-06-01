import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export function PromoTab({ promoPerformance, totalDiscountGiven, activePromosCount }: PromoTabProps) {
  return (
    <div>
      <div className="section-header mb-8">
        <h2 className="display-md">Rendimiento de promociones</h2>
        <CreatePromoDialog />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-soft overflow-hidden mb-8">
        {[
          { label: "Ahorro total clientes", value: `€${totalDiscountGiven.toFixed(2)}` },
          { label: "Cupones activos", value: String(activePromosCount) },
          { label: "Pedidos con cupon", value: String(promoPerformance.reduce((s, p) => s + (p.usage_count || 0), 0)) },
          { label: "Ingresos via promo", value: `€${promoPerformance.reduce((s, p) => s + (p.total_revenue || 0), 0).toFixed(2)}` },
        ].map((stat, i) => (
          <div key={i} className={cn("p-6", i < 3 && "border-r border-foreground/15")}>
            <p className="label-mono mb-2">{stat.label}</p>
            <p className="price-mono text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card-flat overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6 label-mono py-4">Codigo</TableHead>
              <TableHead className="label-mono">Descuento</TableHead>
              <TableHead className="label-mono">Usos</TableHead>
              <TableHead className="label-mono">Total descontado</TableHead>
              <TableHead className="label-mono">Ingresos neto</TableHead>
              <TableHead className="pr-6 text-right label-mono">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promoPerformance.map((promo) => (
              <TableRow key={promo.code} className="group hover:bg-card transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <Tag className="h-3.5 w-3.5 text-foreground/40" />
                    <div>
                      <p className="font-mono font-bold">{promo.code}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={cn(
                            "inline-block w-1.5 h-1.5 rounded-full",
                            promo.isActive ? "bg-foreground" : "bg-foreground/20"
                          )}
                        />
                        <p className="label-mono">
                          {promo.isActive ? "Activo" : promo.is_one_time && promo.usage_count > 0 ? "Usado" : "Inactivo"}
                        </p>
                        {promo.is_one_time && (
                          <Badge variant="secondary" className="label-mono h-3.5 px-1">Unico</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="label-mono">-{promo.discount_amount}%</Badge>
                </TableCell>
                <TableCell>
                  <span className="price-mono text-sm">{promo.usage_count}</span>
                </TableCell>
                <TableCell>
                  <span className="price-mono text-sm text-destructive">-€{(promo.total_discount || 0).toFixed(2)}</span>
                </TableCell>
                <TableCell>
                  <span className="price-mono">€{(promo.total_revenue || 0).toFixed(2)}</span>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <PromoActions promo={promo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
