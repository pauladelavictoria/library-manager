"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Type,
  FileText,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { toast } from "sonner";
import { createEvent } from "@/app/actions/events";

export function CreateEventDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const event_date = formData.get("event_date") as string;
    const type = formData.get("type") as string;

    if (!title || !event_date || !type) {
      toast.error("Por favor, rellena los campos obligatorios");
      setIsLoading(false);
      return;
    }

    const result = await createEvent({
      title,
      description,
      location,
      event_date,
      type,
    });

    if (result.success) {
      setShowSuccess(true);
      toast.success("¡Evento programado!");
    } else {
      toast.error("Error al crear el evento", {
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
        <DialogContent className="sm:max-w-[400px] border-none bg-white/80 backdrop-blur-xl p-0 overflow-hidden rounded-[2.5rem] shadow-2xl">
          <div className="p-lg text-center space-y-6">
            <DialogTitle className="sr-only">Evento programado con éxito</DialogTitle>
            <div className="relative mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-25" />
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">¡Evento Programado!</h3>
              <p className=" font-medium">
                Ya está disponible en la agenda cultural de la librería.
              </p>
            </div>
            <Button
              onClick={() => {
                setOpen(false);
                setTimeout(() => setShowSuccess(false), 300);
              }}
              className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 font-bold text-lg shadow-xl"
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
        <Button variant="outline">
          <Calendar className="mr-sm h-4 w-4" />
          Nuevo Evento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-slate-200 p-0 overflow-hidden">
        <DialogHeader className="p-lg pb-md">
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <Plus className="h-6 w-6 text-primary" />
            Programar Evento
          </DialogTitle>
          <DialogDescription className="font-medium ">
            Añade una nueva actividad a la agenda de la librería.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-lg pt-0 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Título del Evento</Label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input name="title" placeholder="Ej: Firma de libros de..." className="pl-lg h-12 rounded-xl bg-slate-50 border-none font-bold" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Tipo</Label>
                <Select name="type" defaultValue="generic">
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold">
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
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Fecha y Hora</Label>
                <Input name="event_date" type="datetime-local" className="h-12 rounded-xl bg-slate-50 border-none font-bold" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Ubicación</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input name="location" placeholder="Ej: Sala Principal" className="pl-lg h-12 rounded-xl bg-slate-50 border-none font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Descripción</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  name="description"
                  rows={3}
                  className="w-full pl-lg p-sm rounded-xl bg-slate-50 border-none font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe de qué trata el evento..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-sm h-4 w-4 animate-spin" /> : "Crear Evento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
