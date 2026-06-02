"use client";

import { useState } from "react";
import { MapPin, Type, FileText, Plus, Loader2, CheckCircle2 } from "lucide-react";
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
    const event_date = formData.get("event_date") as string;
    const type = formData.get("type") as string;

    if (!title || !event_date || !type) {
      toast.error("Rellena los campos obligatorios");
      setIsLoading(false);
      return;
    }

    const result = await createEvent({
      title,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      event_date,
      type,
    });

    if (result.success) {
      setShowSuccess(true);
      toast.success("Evento programado");
    } else {
      toast.error("Error al crear el evento", { description: result.error });
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
          Nuevo evento
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[620px] p-0 rounded-none border-2 border-foreground shadow-none">
        {showSuccess ? (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-foreground/40" />
            <DialogTitle className="display-md">Evento programado</DialogTitle>
            <p className="label-mono">Ya está disponible en la agenda cultural.</p>
            <Button variant="primary" onClick={() => setOpen(false)} className="mt-2">
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <div className="px-10 pt-10 pb-6 border-b border-foreground/15">
              <DialogTitle className="display-md mb-1">Programar evento</DialogTitle>
              <p className="label-mono">Nueva actividad en la agenda</p>
            </div>

            <form onSubmit={handleSubmit} className="px-10 py-8 space-y-6">
              <div className="space-y-1.5">
                <Label className="label-mono" htmlFor="title">Título del evento</Label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                  <Input id="title" name="title" required className="pl-9" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="type">Tipo</Label>
                  <Select name="type" defaultValue="generic">
                    <SelectTrigger className="rounded-none border-foreground/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-foreground">
                      <SelectItem value="presentation">Presentación</SelectItem>
                      <SelectItem value="club">Club de lectura</SelectItem>
                      <SelectItem value="workshop">Taller</SelectItem>
                      <SelectItem value="signing">Firma</SelectItem>
                      <SelectItem value="generic">Genérico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="label-mono" htmlFor="event_date">Fecha y hora</Label>
                  <Input id="event_date" name="event_date" type="datetime-local" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="label-mono" htmlFor="location">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                  <Input id="location" name="location" required className="pl-9" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="label-mono" htmlFor="description">Descripción</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-foreground/30 body-sans focus:outline-none focus:border-foreground resize-none"
                  />
                </div>
              </div>

              <DialogFooter className="mt-8 flex gap-3">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Crear evento"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
