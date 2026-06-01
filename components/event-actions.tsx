"use client";

import { useState } from "react";
import { Trash2, Edit2, Loader2, AlertTriangle, CheckCircle2, MapPin, Type } from "lucide-react";
import { deleteEvent, updateEvent } from "@/app/actions/events";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Event } from "@/lib/types";

export function EventActions({ event }: { event: Event }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    const result = await deleteEvent(event.id);
    if (result.success) { setShowDeleteSuccess(true); toast.success("Evento eliminado"); }
    else { toast.error("Error al eliminar", { description: result.error }); setShowDeleteConfirm(false); }
    setIsLoading(false);
  }

  async function handleUpdate(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setIsLoading(true);
    const formData = new FormData(formEvent.currentTarget);
    const result = await updateEvent(event.id, {
      title:       formData.get("title") as string,
      type:        formData.get("type") as string,
      location:    formData.get("location") as string,
      event_date:  formData.get("event_date") as string,
      description: formData.get("description") as string,
    });
    if (result.success) { setShowEditSuccess(true); toast.success("Evento actualizado"); }
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
        <DialogContent className="max-w-[560px] p-0 rounded-none border-2 border-foreground shadow-none">
          {showEditSuccess ? (
            <div className="p-10 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-foreground/40" />
              <DialogTitle className="display-md">Evento actualizado</DialogTitle>
              <p className="label-mono">Los cambios se han guardado.</p>
              <button className="btn-primary mt-2" onClick={() => setIsEditing(false)}>Cerrar</button>
            </div>
          ) : (
            <>
              <div className="px-8 pt-8 pb-5 border-b border-foreground/15">
                <DialogTitle className="display-md mb-1">Editar evento</DialogTitle>
                <p className="label-mono">{event.title}</p>
              </div>
              <form onSubmit={handleUpdate} className="px-8 py-6 space-y-5">
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="title">Titulo</Label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                    <Input id="title" name="title" defaultValue={event.title} required className="pl-9" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="label-mono" htmlFor="type">Tipo</Label>
                    <select
                      id="type" name="type" defaultValue={event.type}
                      className="h-9 w-full border border-foreground/20 bg-background body-sans focus:outline-none focus:border-foreground px-3"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", appearance: "none" }}
                    >
                      <option value="presentation">Presentacion</option>
                      <option value="club">Club de lectura</option>
                      <option value="workshop">Taller</option>
                      <option value="signing">Firma</option>
                      <option value="generic">Generico</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="label-mono" htmlFor="event_date">Fecha y hora</Label>
                    <Input id="event_date" name="event_date" type="datetime-local" defaultValue={new Date(event.event_date).toISOString().slice(0, 16)} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="location">Ubicacion</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                    <Input id="location" name="location" defaultValue={event.location ?? ""} className="pl-9" />
                  </div>
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
              <p className="label-mono">El evento ha sido borrado de la agenda.</p>
              <button className="btn-primary mt-2" onClick={() => setShowDeleteConfirm(false)}>Cerrar</button>
            </div>
          ) : (
            <>
              <div className="px-8 pt-8 pb-5 border-b border-foreground/15">
                <DialogTitle className="display-md mb-1">Eliminar evento</DialogTitle>
                <p className="label-mono">{event.title}</p>
              </div>
              <div className="px-8 py-6 space-y-6">
                <div className="flex items-start gap-3 border-soft p-4">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="body-sans text-foreground/70">Se perderan todas las reservas asociadas. Esta accion no se puede deshacer.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleDelete} disabled={isLoading} className="btn-primary" style={{ borderColor: "hsl(var(--destructive))", backgroundColor: "hsl(var(--destructive))" }}>
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Borrar evento"}
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
