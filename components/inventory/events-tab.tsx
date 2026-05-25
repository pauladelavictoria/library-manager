import {
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CreateEventDialog } from "@/components/create-event-dialog";
import { EventActions } from "@/components/event-actions";
import type { Event } from "@/lib/types";

interface EventsTabProps {
  eventPerformance: (Event & { attendees: number; isPast: boolean })[];
}

export function EventsTab({ eventPerformance }: EventsTabProps) {

  const eventTypeColors: Record<string, string> = {
    presentation: "bg-blue-500/10 text-blue-600  border-blue-500/20",
    workshop: "bg-purple-500/10 text-purple-600  border-purple-500/20",
    club: "bg-emerald-500/10 text-emerald-600  border-emerald-500/20",
    signing: "bg-amber-500/10 text-amber-600  border-amber-500/20",
    generic: "bg-slate-500/10 text-slate-600  border-slate-500/20",
  };

  return (
    <div className="mb-lg">
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">Agenda Cultural</h2>
        </div>
        <CreateEventDialog />
      </div>

      <Card className="rounded-[2rem]  shadow-xl overflow-hidden backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent ">
              <TableHead className="pl-lg font-bold uppercase text-[10px] tracking-widest py-lg">
                Evento
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">Tipo</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Fecha y Hora
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Ubicación
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-center">
                Asistentes
              </TableHead>
              <TableHead className="pr-lg text-right font-bold uppercase text-[10px] tracking-widest">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventPerformance.length > 0 ? (
              eventPerformance.map((event) => (
                <TableRow
                  key={event.id}
                  className={cn(
                    "group  transition-colors",
                    event.isPast ? "bg-slate-50/30 opacity-60" : "hover:bg-slate-50/50 "
                  )}
                >
                  <TableCell className="pl-lg py-md">
                    <div className="flex items-center gap-2">
                      <p className="font-black tracking-tight">{event.title}</p>
                      {event.isPast && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] h-4 rounded-sm font-bold border-none px-xs uppercase tracking-tighter"
                        >
                          Finalizado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("mb-md rounded-lg px-sm.5 p-sm font-bold border", eventTypeColors[event.type])} variant="outline">
                      {event.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-bold text-slate-600">
                      {new Date(event.event_date).toLocaleString("es-ES", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs font-medium">{event.location || "N/A"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center justify-center px-sm py-xs rounded-full bg-emerald-50 text-emerald-600 font-black text-sm">
                      {event.attendees}
                    </div>
                  </TableCell>
                  <TableCell className="pr-lg text-right">
                    <EventActions event={event} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-cente font-medium italic"
                >
                  No hay eventos programados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
