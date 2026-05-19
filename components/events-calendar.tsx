"use client";

import { Calendar, MapPin, Clock, BookOpen, PenTool, Users, Star, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

          <h2 className="text-2xl">CALENDARIO DE EVENTOS</h2>
          <p className="">
            Únete a nuestra comunidad. Presentaciones, firmas de libros y talleres exclusivos para amantes de la lectura.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const Icon = eventTypeIcons[event.type] || Calendar;
          const date = new Date(event.event_date);
          const day = date.getDate();
          const month = date.toLocaleString("es-ES", { month: "short" }).toUpperCase();
          const time = date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
          const isLoading = loadingEventId === event.id;
          const isBooked = bookedEventIds.has(event.id);

          return (
            <Card key={event.id} className="rounded-[2rem] overflow-hidden min-w-[320px]">
              <CardContent className="p-0">
                <div className="relative p-6">
                  <div className="absolute top-6 right-6 flex flex-col items-center justify-center w-14 h-14 rounded-1xl bg-slate-50">
                    <span className="text-xs font-black leading-none">{day}</span>
                    <span className="text-xs font-bold text-primary mt-1">{month}</span>
                  </div>

                  <Badge className={cn("mb-4 rounded-lg px-2.5 py-1 font-bold border", eventTypeColors[event.type])} variant="outline">
                    <Icon className="mr-1.5 h-3.5 w-3.5" />
                    {event.type.toUpperCase()}
                  </Badge>

                  <div>
                    <h3 className="text-xl font-bold my-5">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {time}h
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                    </div>

                    <p className="text-sm  line-clamp-2 mb-6 h-10">
                      {event.description}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleBooking(event)}
                    disabled={isLoading || isBooked}
                    className={cn(
                      "w-full rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center",
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
