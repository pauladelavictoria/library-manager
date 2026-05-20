"use client";

import { useState } from "react";
import { Trash2, Edit2, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePromoCode, updatePromoCode } from "@/app/actions/promo";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PromoActionsProps {
  promo: {
    id: string;
    code: string;
    discount_amount: number;
    expiry_date: string;
  };
}

export function PromoActions({ promo }: PromoActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    const result = await deletePromoCode(promo.id);
    if (result.success) {
      setShowDeleteSuccess(true);
      toast.success("Cupón eliminado");
    } else {
      toast.error("Error al eliminar", { description: result.error });
      setShowDeleteConfirm(false);
    }
    setIsLoading(false);
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const discount = parseFloat(formData.get("discount") as string);
    const expiry = formData.get("expiry") as string;

    const result = await updatePromoCode(promo.id, {
      discount_amount: discount,
      expiry_date: expiry,
    });

    if (result.success) {
      setShowEditSuccess(true);
      toast.success("Cupón actualizado");
    } else {
      toast.error("Error al actualizar", { description: result.error });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className="h-8 w-8 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"
        onClick={() => setIsEditing(true)}
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        className="h-8 w-8 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors"
        onClick={() => setShowDeleteConfirm(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={isEditing} onOpenChange={(val) => {
        setIsEditing(val);
        if (!val) setTimeout(() => setShowEditSuccess(false), 300);
      }}>
        <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0">
          {showEditSuccess ? (
            <div className="p-lg text-center space-y-6 bg-white/90 backdrop-blur-xl">
              <div className="relative mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle2 className="h-10 w-10 text-blue-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black">Cupón Actualizado</h3>
                <p className="text-sm  font-medium text-balance">
                  Los cambios en <span className="font-bold text-slate-900">{promo.code}</span> se han guardado.
                </p>
              </div>
              <Button
                onClick={() => setIsEditing(false)}
                className="w-full h-12 rounded-xl bg-slate-900 font-bold"
              >
                Cerrar
              </Button>
            </div>
          ) : (
            <div className="p-lg space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Editar Cupón</DialogTitle>
                <DialogDescription className="font-medium ">
                  Modifica los detalles del código <span className="text-primary font-bold">{promo.code}</span>.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest">Descuento (%)</Label>
                  <Input
                    name="discount"
                    type="number"
                    step="0.01"
                    defaultValue={promo.discount_amount}
                    className="h-12 rounded-xl border border-cardDark font-bold text-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest">Expiración</Label>
                  <Input
                    name="expiry"
                    type="datetime-local"
                    defaultValue={new Date(promo.expiry_date).toISOString().slice(0, 16)}
                    className="h-12 rounded-xl border border-cardDark font-bold"
                    required
                  />
                </div>
                <DialogFooter className="pt-sm gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} >Cancelar</Button>
                  <Button type="submit" disabled={isLoading} variant="ghost">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={(val) => {
        setShowDeleteConfirm(val);
        if (!val) setTimeout(() => setShowDeleteSuccess(false), 300);
      }}>
        <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0">
          {showDeleteSuccess ? (
            <div className="p-lg text-center space-y-6 bg-white/90 backdrop-blur-xl">
              <div className="relative mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                <Trash2 className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-black tracking-tight">Eliminado</DialogTitle>
                <DialogDescription className="text-sm font-medium">El cupón ha sido borrado del sistema.</DialogDescription>
              </div>
              <Button onClick={() => setShowDeleteConfirm(false)} >Cerrar</Button>
            </div>
          ) : (
            <div className="p-lg text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-black">¿Estás seguro?</DialogTitle>
                <DialogDescription className="text-sm font-medium leading-relaxed">
                  Estás a punto de borrar el cupón <span className="font-bold text-slate-900">{promo.code}</span>. Esta acción no se puede deshacer.
                </DialogDescription>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-500/20"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sí, borrar cupón"}
                </Button>
                <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
