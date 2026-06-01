import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Envio gratis", body: "En pedidos superiores a 30€" },
  { icon: ShieldCheck, title: "Pago seguro", body: "Encriptacion SSL avanzada" },
  { icon: RotateCcw, title: "Devoluciones", body: "Plazo extendido de 30 dias" },
];

const PaymentConditions = () => (
  <div>
    {items.map(({ icon: Icon, title, body }) => (
      <div key={title} className="flex items-start gap-4 p-6 border-soft-t">
        <Icon className="h-4 w-4 mt-0.5 text-foreground/40 shrink-0" />
        <div>
          <p className="label-sans mb-1">{title}</p>
          <p className="label-mono">{body}</p>
        </div>
      </div>
    ))}
  </div>
);

export default PaymentConditions;
