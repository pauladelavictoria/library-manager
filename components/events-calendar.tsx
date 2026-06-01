"use client";

import { Calendar, MapPin, Clock, BookOpen, PenTool, Users, Star, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/supabase/client";
import { useNotification } from "@/lib/notification-context";
import { Event } from "@/lib/types";

interface EventsCalendarProps {
  events: Event[];
  userId?: string;
}

const eventTypeIcons: Record<string, React.ElementType> = {
  presentation: BookOpen,
  workshop: PenTool,
  club: Users,
  signing: Star,
  generic: Calendar,
};

const eventTypeLabels: Record<string, string> = {
  presentation: "Presentación",
  workshop: "Taller",
  club: "Club de lectura",
  signing: "Firma",
  generic: "Evento",
};

export function EventsCalendar({ events, userId }: EventsCalendarProps) {
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
  const [bookedEventIds, setBookedEventIds] = useState<Set<string>>(new Set());
  const supabase = createClient();
  const { notify } = useNotification();

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!userId) return;
      const { data } = await supabase
        .from("event_bookings")
        .select("event_id")
        .eq("user_id", userId);

      if (data) {
        setBookedEventIds(new Set(data.map((b: { event_id: string }) => b.event_id)));
      }
    };
    fetchUserBookings();
  }, [userId, supabase]);

  const handleBooking = async (event: Event) => {
    if (!userId) {
      notify({
        type: "info",
        title: "Acción requerida",
        message: "Debes iniciar sesión para reservar plaza en nuestros eventos",
        data: { showAuth: true },
        size: "large"
      });
      return;
    }

    setLoadingEventId(event.id);
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", userId)
        .single();

      const { error } = await supabase
        .from("event_bookings")
        .insert({
          event_id: event.id,
          user_id: userId,
          full_name: profile?.full_name || "Usuario",
          email: profile?.email || "Sin email"
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("Ya tienes una reserva para este evento");
          setBookedEventIds(prev => new Set([...prev, event.id]));
        } else {
          throw error;
        }
      } else {
        setBookedEventIds(prev => new Set([...prev, event.id]));
        notify({
          type: "success",
          title: "Plaza reservada",
          message: `Confirmación enviada para "${event.title}".`,
          size: "large"
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("No se pudo realizar la reserva. Inténtalo de nuevo.");
    } finally {
      setLoadingEventId(null);
    }
  };

  if (!events || events.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-foreground/15">
      {events.map((event) => {
        const Icon = eventTypeIcons[event.type] || Calendar;
        const date = new Date(event.event_date);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("es-ES", { month: "short" }).toUpperCase();
        const time = date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
        const isLoading = loadingEventId === event.id;
        const isBooked = bookedEventIds.has(event.id);

        return (
          <div key={event.id} className="border-r border-b border-foreground/15 p-6 flex flex-col gap-4 bg-background">
            {/* Header row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 label-mono">
                <Icon className="h-3 w-3" />
                {eventTypeLabels[event.type] || event.type}
              </div>
              <div className="border-soft p-2 text-center min-w-[40px]">
                <div className="font-mono font-bold text-lg leading-none">{day}</div>
                <div className="label-mono mt-0.5">{month}</div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="display-md mb-3">{event.title}</h3>
              <p className="body-sans text-foreground/70 line-clamp-2 mb-4">{event.description}</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 label-mono">
                  <Clock className="h-3 w-3" />
                  {time}h
                </div>
                <div className="flex items-center gap-2 label-mono">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => handleBooking(event)}
              disabled={isLoading || isBooked}
              className={cn(
                "w-full py-3 label-sans transition-all duration-200 flex items-center justify-center gap-2",
                isBooked
                  ? "border border-foreground/20 text-foreground/40 cursor-default"
                  : "btn-primary"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isBooked ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Reservado
                </>
              ) : (
                "Reservar plaza"
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
