"use client";

import { useState } from "react";
import { Trash2, Edit2, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { deletePromoCode, updatePromoCode } from "@/app/actions/promo";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PromoActionsProps {
  promo: { id: string; code: string; discount_amount: number; expiry_date: string; };
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
    if (result.success) { setShowDeleteSuccess(true); toast.success("Cupon eliminado"); }
    else { toast.error("Error al eliminar", { description: result.error }); setShowDeleteConfirm(false); }
    setIsLoading(false);
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await updatePromoCode(promo.id, {
      discount_amount: parseFloat(formData.get("discount") as string),
      expiry_date: formData.get("expiry") as string,
    });
    if (result.success) { setShowEditSuccess(true); toast.success("Cupon actualizado"); }
    else { toast.error("Error al actualizar", { description: result.error }); }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center gap-1">
      <button className="w-8 h-8 flex items-center justify-center text-foreground/30 hover:text-foreground transition-colors" onClick={() => setIsEditing(true)}>
        <Edit2 className="h-3.5 w-3.5" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center text-foreground/30 hover:text-destructive transition-colors" onClick={() => setShowDeleteConfirm(true)}>
        <Trash2 className="h-3.5 w-3.5" />
      </button>

      {/* Edit dialog */}
      <Dialog open={isEditing} onOpenChange={(v) => { setIsEditing(v); if (!v) setTimeout(() => setShowEditSuccess(false), 300); }}>
        <DialogContent className="max-w-[460px] p-0 rounded-none border-2 border-foreground shadow-none">
          {showEditSuccess ? (
            <div className="p-10 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-foreground/40" />
              <DialogTitle className="display-md">Cupon actualizado</DialogTitle>
              <p className="label-mono">{promo.code} guardado correctamente.</p>
              <button className="btn-primary mt-2" onClick={() => setIsEditing(false)}>Cerrar</button>
            </div>
          ) : (
            <>
              <div className="px-8 pt-8 pb-5 border-b border-foreground/15">
                <DialogTitle className="display-md mb-1">Editar cupon</DialogTitle>
                <p className="font-mono font-bold text-sm">{promo.code}</p>
              </div>
              <form onSubmit={handleUpdate} className="px-8 py-6 space-y-5">
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="discount">Descuento (%)</Label>
                  <Input id="discount" name="discount" type="number" step="0.01" defaultValue={promo.discount_amount} required />
                </div>
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="expiry">Expiracion</Label>
                  <Input id="expiry" name="expiry" type="datetime-local" defaultValue={new Date(promo.expiry_date).toISOString().slice(0, 16)} required />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Guardar cambios"}
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={(v) => { setShowDeleteConfirm(v); if (!v) setTimeout(() => setShowDeleteSuccess(false), 300); }}>
        <DialogContent className="max-w-[420px] p-0 rounded-none border-2 border-foreground shadow-none">
          {showDeleteSuccess ? (
            <div className="p-10 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-foreground/40" />
              <DialogTitle className="display-md">Eliminado</DialogTitle>
              <p className="label-mono">El cupon ha sido borrado.</p>
              <button className="btn-primary mt-2" onClick={() => setShowDeleteConfirm(false)}>Cerrar</button>
            </div>
          ) : (
            <>
              <div className="px-8 pt-8 pb-5 border-b border-foreground/15">
                <DialogTitle className="display-md mb-1">Eliminar cupon</DialogTitle>
                <p className="font-mono font-bold text-sm">{promo.code}</p>
              </div>
              <div className="px-8 py-6 space-y-6">
                <div className="flex items-start gap-3 border-soft p-4">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="body-sans text-foreground/70">Esta accion no se puede deshacer. El cupon sera borrado permanentemente.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleDelete} disabled={isLoading} className="btn-primary" style={{ borderColor: "hsl(var(--destructive))", backgroundColor: "hsl(var(--destructive))" }}>
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Borrar cupon"}
                  </button>
                  <button className="btn-outline" onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
