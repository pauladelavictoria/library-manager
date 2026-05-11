"use client";

import { useState } from "react";
import { Plus, Tag, Calendar, Percent, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPromoCode } from "@/app/actions/promo";
import { toast } from "sonner";

export function CreatePromoDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const code = formData.get("code") as string;
    const discount = parseFloat(formData.get("discount") as string);
    const expiry = formData.get("expiry") as string;

    if (!code || isNaN(discount) || !expiry) {
      toast.error("Por favor, rellena todos los campos");
      setIsLoading(false);
      return;
    }

    const result = await createPromoCode({
      code,
      discount_amount: discount,
      expiry_date: expiry,
    });

    if (result.success) {
      toast.success("¡Cupón creado con éxito!", {
        description: `El código ${code.toUpperCase()} ya está activo.`,
      });
      setOpen(false);
    } else {
      toast.error("Error al crear el cupón", {
        description: result.error,
      });
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cupón
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <Tag className="h-6 w-6 text-primary" />
            Crear Código Promocional
          </DialogTitle>
          <DialogDescription className="font-medium text-slate-500">
            Define un nuevo cupón de descuento para tus clientes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-xs font-black uppercase tracking-widest text-slate-400">
              Código del Cupón
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="code"
                name="code"
                placeholder="EJ: VERANO25"
                className="pl-10 rounded-xl border-slate-200 uppercase font-bold"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount" className="text-xs font-black uppercase tracking-widest text-slate-400">
                % Descuento
              </Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="10"
                  className="pl-10 rounded-xl border-slate-200 font-bold"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-xs font-black uppercase tracking-widest text-slate-400">
                Expira el
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="expiry"
                  name="expiry"
                  type="date"
                  className="pl-10 rounded-xl border-slate-200 font-bold"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full rounded-xl py-6 font-black text-lg bg-primary hover:scale-[1.02] transition-all"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Activar Cupón"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
