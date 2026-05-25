"use client";

import { useState } from "react";
import { Trash2, Edit2, Loader2, AlertTriangle, CheckCircle2, MapPin, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteEvent, updateEvent } from "@/app/actions/events";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    if (result.success) {
      setShowDeleteSuccess(true);
      toast.success("Evento eliminado");
    } else {
      toast.error("Error al eliminar", { description: result.error });
      setShowDeleteConfirm(false);
    }
    setIsLoading(false);
  }

  async function handleUpdate(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setIsLoading(true);

    const formData = new FormData(formEvent.currentTarget);
    const result = await updateEvent(event.id, {
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      location: formData.get("location") as string,
      event_date: formData.get("event_date") as string,
      description: formData.get("description") as string,
    });

    if (result.success) {
      setShowEditSuccess(true);
      toast.success("Evento actualizado");
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
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0">
          {showEditSuccess ? (
            <div className="p-lg text-center space-y-6 bg-white/90 backdrop-blur-xl">
              <div className="relative mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-black">Evento Actualizado</DialogTitle>
                <DialogDescription className="text-sm font-medium">
                  Los cambios en el evento se han guardado correctamente.
                </DialogDescription>
              </div>
              <Button onClick={() => setIsEditing(false)}>Cerrar</Button>
            </div>
          ) : (
            <div className="p-lg space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Editar Evento</DialogTitle>
                <DialogDescription className="font-medium ">Ajusta los detalles de la actividad.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest">Título</Label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                    <Input name="title" defaultValue={event.title} className="pl-lg h-11 rounded-xl bg-slate-50 border-none font-bold" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest">Tipo</Label>
                    <Select name="type" defaultValue={event.type}>
                      <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="presentation">Presentación</SelectItem>
                        <SelectItem value="club">Club de Lectura</SelectItem>
                        <SelectItem value="workshop">Taller</SelectItem>
                        <SelectItem value="signing">Firma</SelectItem>
                        <SelectItem value="generic">Genérico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest">Fecha</Label>
                    <Input name="event_date" type="datetime-local" defaultValue={new Date(event.event_date).toISOString().slice(0, 16)} className="h-11 rounded-xl bg-slate-50 border-none font-bold" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest">Ubicación</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                    <Input name="location" defaultValue={event.location} className="pl-lg h-11 rounded-xl bg-slate-50 border-none font-bold" />
                  </div>
                </div>
                <DialogFooter className="pt-md gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  <Button type="submit" disabled={isLoading}>
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
                <DialogDescription className="text-sm font-medium text-balance">El evento ha sido cancelado y borrado de la agenda.</DialogDescription>
              </div>
              <Button onClick={() => setShowDeleteConfirm(false)}>Cerrar</Button>
            </div>
          ) : (
            <div className="p-lg text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-black">¿Cancelar evento?</DialogTitle>
                <DialogDescription className="text-sm font-medium leading-relaxed">
                  Estás a punto de borrar <span className="font-bold text-slate-900">{event.title}</span>. Se perderán todas las reservas asociadas.
                </DialogDescription>
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleDelete} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sí, borrar evento"}
                </Button>
                <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Volver atrás</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
