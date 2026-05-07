"use client";

import { Calendar, MapPin, Clock, ArrowRight, BookOpen, PenTool, Users, Star, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/supabase/client";
import { useNotification } from "@/lib/notification-context";
import { sendBookingEmail } from "@/app/actions/events";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  type: string;
}

interface EventsCalendarProps {
  events: Event[];
  userId?: string;
}

const eventTypeIcons: Record<string, any> = {
  presentation: BookOpen,
  workshop: PenTool,
  club: Users,
  signing: Star,
  generic: Calendar,
};

const eventTypeColors: Record<string, string> = {
  presentation: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  workshop: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  club: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  signing: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  generic: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
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
        setBookedEventIds(new Set(data.map(b => b.event_id)));
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

        const formattedDate = new Date(event.event_date).toLocaleString("es-ES", {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        // Enviar email (simulación en el servidor)
        await sendBookingEmail({
          email: profile?.email || "Sin email",
          name: profile?.full_name || "Usuario",
          eventTitle: event.title,
          eventDate: formattedDate,
          location: event.location
        });

        notify({
          type: "success",
          title: "¡Plaza Reservada!",
          message: `Te hemos enviado un correo electrónico de confirmación para "${event.title}". ¡Te esperamos!`,
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
    <section className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Calendar className="h-4 w-4" />
            <span>PRÓXIMAS ACTIVIDADES</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight">Calendario de Eventos</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl font-medium">
            Únete a nuestra comunidad. Presentaciones, firmas de libros y talleres exclusivos para amantes de la lectura.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => {
          const Icon = eventTypeIcons[event.type] || Calendar;
          const date = new Date(event.event_date);
          const day = date.getDate();
          const month = date.toLocaleString("es-ES", { month: "short" }).toUpperCase();
          const time = date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
          const isLoading = loadingEventId === event.id;
          const isBooked = bookedEventIds.has(event.id);

          return (
            <Card key={event.id} className="group rounded-[2rem] border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 bg-white dark:bg-slate-900 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative p-6">
                  <div className="absolute top-6 right-6 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                    <span className="text-xl font-black leading-none">{day}</span>
                    <span className="text-[10px] font-bold text-primary mt-1">{month}</span>
                  </div>

                  <Badge className={cn("mb-4 rounded-lg px-2.5 py-1 font-bold border", eventTypeColors[event.type])} variant="outline">
                    <Icon className="mr-1.5 h-3.5 w-3.5" />
                    {event.type.toUpperCase()}
                  </Badge>

                  <h3 className="text-xl font-bold leading-tight mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                      <Clock className="mr-2 h-4 w-4 text-primary/60" />
                      {time}h
                    </div>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                      <MapPin className="mr-2 h-4 w-4 text-primary/60" />
                      {event.location}
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 h-10">
                    {event.description}
                  </p>

                  <Button
                    onClick={() => handleBooking(event)}
                    disabled={isLoading || isBooked}
                    className={cn(
                      "w-full rounded-xl font-bold transition-all duration-300 shadow-lg",
                      isBooked
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : isLoading
                          ? "bg-slate-100 dark:bg-slate-800"
                          : "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-primary hover:text-white"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isBooked ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Ya Reservado
                      </span>
                    ) : (
                      "Reservar Plaza"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
