"use client";

import { useState } from "react";
import { Plus, Tag, Calendar, Percent, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
    const formData  = new FormData(event.currentTarget);
    const code      = formData.get("code") as string;
    const discount  = parseFloat(formData.get("discount") as string);
    const expiry    = formData.get("expiry") as string;
    const isOneTime = formData.get("is_one_time") === "on";

    if (!code || isNaN(discount) || !expiry) {
      toast.error("Rellena todos los campos");
      setIsLoading(false);
      return;
    }

    const result = await createPromoCode({ code, discount_amount: discount, expiry_date: expiry, is_one_time: isOneTime });

    if (result.success) {
      setCreatedCode(code.toUpperCase());
      setShowSuccess(true);
      toast.success("Cupon creado");
    } else {
      toast.error("Error al crear el cupon", { description: result.error });
    }
    setIsLoading(false);
  }

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) setTimeout(() => setShowSuccess(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <Plus className="mr-2 h-3.5 w-3.5" />
          Nuevo cupon
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[580px] p-0 rounded-none border-2 border-foreground shadow-none">
        {showSuccess ? (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-foreground/40" />
            <DialogTitle className="display-md">Cupon activado</DialogTitle>
            <div className="border-ink px-8 py-4 w-full">
              <p className="label-mono mb-2">Codigo activo</p>
              <p className="font-mono font-black text-3xl tracking-widest">{createdCode}</p>
            </div>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <div className="px-10 pt-10 pb-6 border-b border-foreground/15">
              <DialogTitle className="display-md mb-1">Codigo promocional</DialogTitle>
              <p className="label-mono">Nuevo cupon de descuento</p>
            </div>

            <form onSubmit={handleSubmit} className="px-10 py-8 space-y-6">
              <div className="space-y-1.5">
                <Label className="label-mono" htmlFor="code">Codigo del cupon</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                  <Input id="code" name="code" placeholder="EJ: VERANO25" className="pl-9 uppercase font-mono" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="discount">% Descuento</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                    <Input id="discount" name="discount" type="number" min="1" max="100" placeholder="10" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="expiry">Expira el</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                    <Input id="expiry" name="expiry" type="date" className="pl-9" required />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-soft p-4">
                <input
                  type="checkbox"
                  id="is_one_time"
                  name="is_one_time"
                  className="h-4 w-4 accent-foreground cursor-pointer"
                />
                <div>
                  <Label htmlFor="is_one_time" className="label-sans cursor-pointer">Cupon de un solo uso</Label>
                  <p className="label-mono mt-0.5">Se desactiva tras la primera compra.</p>
                </div>
              </div>

              <DialogFooter className="mt-8 flex gap-3">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Activar cupon"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
