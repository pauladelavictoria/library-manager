"use client";

import { useState } from "react";
import { Plus, Tag, Calendar, Percent, Loader2, CheckCircle2 } from "lucide-react";
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

  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCode, setCreatedCode] = useState("");

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
      setCreatedCode(code.toUpperCase());
      setShowSuccess(true);
      toast.success("¡Cupón creado con éxito!");
    } else {
      toast.error("Error al crear el cupón", {
        description: result.error,
      });
    }

    setIsLoading(false);
  }

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={(val) => {
        setOpen(val);
        if (!val) setTimeout(() => setShowSuccess(false), 300);
      }}>
        <DialogContent className="sm:max-w-[400px] border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-0 overflow-hidden rounded-[2.5rem] shadow-2xl">
          <div className="p-10 text-center space-y-6">
            <div className="relative mx-auto w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-25" />
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">¡Todo listo!</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                El cupón ha sido activado correctamente.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">CÓDIGO ACTIVO</p>
              <p className="text-3xl font-black text-primary tracking-widest">{createdCode}</p>
            </div>
            <Button
              onClick={() => {
                setOpen(false);
                setTimeout(() => setShowSuccess(false), 300);
              }}
              className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 font-bold text-lg shadow-xl"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
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
