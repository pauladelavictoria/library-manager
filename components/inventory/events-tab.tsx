import {
  Calendar as CalendarIcon,
  Users as UsersIcon,
  MapPin,
  PenTool,
  BookOpen,
  Presentation,
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
  return (
    <div className="mb-lg">
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">Agenda Cultural</h2>
        </div>
        <CreateEventDialog />
      </div>

      <Card className="rounded-[2rem] border-slate-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100">
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
                    "group border-slate-100 transition-colors",
                    event.isPast ? "bg-slate-50/30 opacity-60" : "hover:bg-slate-50/50 "
                  )}
                >
                  <TableCell className="pl-lg py-md">
                    <div className="flex items-center gap-2">
                      <p className="font-black tracking-tight">{event.title}</p>
                      {event.isPast && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] h-4 rounded-sm bg-slate-200 text-slate-500 font-bold border-none px-xs uppercase tracking-tighter"
                        >
                          Finalizado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="rounded-md font-black border-slate-200 bg-slate-50 flex w-fit items-center gap-1.5 capitalize"
                    >
                      {event.type === "signing" && <PenTool className="h-3 w-3" />}
                      {event.type === "workshop" && <BookOpen className="h-3 w-3" />}
                      {event.type === "club" && <UsersIcon className="h-3 w-3" />}
                      {event.type === "presentation" && <Presentation className="h-3 w-3" />}
                      {event.type === "generic" && <CalendarIcon className="h-3 w-3" />}
                      {event.type}
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
                    <div className="flex items-center gap-1.5 text-slate-500">
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
                  className="h-24 text-center text-slate-500 font-medium italic"
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
