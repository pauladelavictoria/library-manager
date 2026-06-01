import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CreateEventDialog } from "@/components/create-event-dialog";
import { EventActions } from "@/components/event-actions";
import type { Event } from "@/lib/types";

interface EventsTabProps {
  eventPerformance: (Event & { attendees: number; isPast: boolean })[];
}

const eventTypeLabels: Record<string, string> = {
  presentation: "Presentacion",
  workshop: "Taller",
  club: "Club",
  signing: "Firma",
  generic: "Evento",
};

export function EventsTab({ eventPerformance }: EventsTabProps) {
  return (
    <div className="mb-lg">
      <div className="section-header mb-8">
        <h2 className="display-md">Agenda cultural</h2>
        <CreateEventDialog />
      </div>

      <div className="card-flat overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6 label-mono py-4">Evento</TableHead>
              <TableHead className="label-mono">Tipo</TableHead>
              <TableHead className="label-mono">Fecha y hora</TableHead>
              <TableHead className="label-mono">Ubicacion</TableHead>
              <TableHead className="label-mono text-center">Asistentes</TableHead>
              <TableHead className="pr-6 text-right label-mono">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventPerformance.length > 0 ? (
              eventPerformance.map((event) => (
                <TableRow
                  key={event.id}
                  className={cn(
                    "group transition-colors",
                    event.isPast ? "opacity-40" : "hover:bg-card"
                  )}
                >
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-serif font-bold">{event.title}</p>
                      {event.isPast && (
                        <Badge variant="secondary" className="label-mono">Finalizado</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="label-mono">
                      {eventTypeLabels[event.type] || event.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="label-mono">
                      {new Date(event.event_date).toLocaleString("es-ES", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 label-mono">
                      <MapPin className="h-3 w-3" />
                      {event.location || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="price-mono text-sm">{event.attendees}</span>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <EventActions event={event} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center label-mono">
                  Sin eventos programados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
