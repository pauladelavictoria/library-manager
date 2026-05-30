"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/supabase/client";
import { useNotification } from "@/lib/notification-context";
import { cancelBooking } from "@/app/actions/events";
import { Event } from "@/lib/types";
import { cn, toTitleCase } from "@/lib/utils";

interface Group { key: string; label: string; events: Event[]; }

interface EventosListProps {
  groups: Group[];
  typeLabels: Record<string, string>;
  userId?: string;
  featuredId?: string;
}

export function EventosList({ groups, typeLabels, userId, featuredId }: EventosListProps) {
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const supabase = createClient();
  const { notify } = useNotification();

  useEffect(() => {
    if (!userId) return;
    supabase.from("event_bookings").select("event_id").eq("user_id", userId)
      .then(({ data }) => {
        if (data) setBookedIds(new Set(data.map((b: { event_id: string }) => b.event_id)));
      });
  }, [userId]);

  async function handleBook(event: Event) {
    if (!userId) {
      notify({ type: "info", title: "Accion requerida", message: "Inicia sesion para reservar plaza.", data: { showAuth: true }, size: "large" });
      return;
    }
    setLoadingId(event.id);
    const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", userId).single();
    const { error } = await supabase.from("event_bookings").insert({
      event_id: event.id, user_id: userId,
      full_name: profile?.full_name || "Usuario",
      email: profile?.email || "",
    });
    if (error?.code === "23505") {
      setBookedIds(prev => new Set([...prev, event.id]));
    } else if (!error) {
      setBookedIds(prev => new Set([...prev, event.id]));
      notify({ type: "success", title: "Plaza reservada", message: `Confirmacion enviada para "${event.title}".` });
    } else {
      notify({ type: "error", title: "Error", message: "No se pudo reservar. Intentalo de nuevo." });
    }
    setLoadingId(null);
  }

  async function handleCancel(event: Event) {
    if (!userId) return;
    setLoadingId(event.id);
    const result = await cancelBooking(event.id);
    if (result.success) {
      setBookedIds(prev => { const s = new Set(prev); s.delete(event.id); return s; });
      notify({ type: "info", title: "Reserva cancelada", message: `Tu plaza en "${event.title}" ha sido liberada.` });
    } else {
      notify({ type: "error", title: "Error", message: result.error || "No se pudo cancelar. Intentalo de nuevo." });
    }
    setLoadingId(null);
  }

  const now = new Date();

  // Find featured event data
  const featuredEvent = featuredId
    ? groups.flatMap(g => g.events).find(e => e.id === featuredId)
    : null;

  return (
    <div>
      {/* Featured next event — inverted spotlight */}
      {featuredEvent && (() => {
        const d = new Date(featuredEvent.event_date);
        const day = d.getDate().toString().padStart(2, "0");
        const month = d.toLocaleDateString("es-ES", { month: "long" }).toUpperCase();
        const time = d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
        const isBooked = bookedIds.has(featuredEvent.id);
        const isLoading = loadingId === featuredEvent.id;

        return (
          <div
            className="relative overflow-hidden"
            style={{ backgroundColor: "#0F0F0D", borderBottom: "2px solid #0F0F0D" }}
          >
            <div
              className="page-container py-12 grid md:grid-cols-2 gap-8 items-end"
              style={{ borderBottom: "1px solid rgba(245,240,232,0.1)" }}
            >
              {/* Left: date */}
              <div>
                <p className="label-mono mb-4" style={{ color: "rgba(245,240,232,0.35)" }}>
                  Próximo evento
                </p>
                <div className="flex items-end gap-4">
                  <span
                    className="font-mono font-black"
                    style={{ fontSize: "clamp(80px,14vw,160px)", lineHeight: 0.85, color: "#F5F0E8" }}
                  >
                    {day}
                  </span>
                  <div className="pb-2">
                    <p className="font-mono font-bold text-2xl" style={{ color: "rgba(245,240,232,0.5)" }}>{month}</p>
                    <p className="label-mono mt-1" style={{ color: "rgba(245,240,232,0.3)" }}>{time}h</p>
                  </div>
                </div>
              </div>

              {/* Right: details + CTA */}
              <div className="flex flex-col justify-end gap-4 pb-1">
                <span
                  className="label-mono self-start px-2 py-1"
                  style={{ color: "rgba(245,240,232,0.5)", border: "1px solid rgba(245,240,232,0.2)" }}
                >
                  {typeLabels[featuredEvent.type] || featuredEvent.type}
                </span>
                <h2
                  className="font-serif font-bold"
                  style={{ fontSize: "clamp(22px,3.5vw,48px)", lineHeight: 0.95, color: "#F5F0E8" }}
                >
                  {featuredEvent.title}
                </h2>
                {featuredEvent.location && (
                  <div className="flex items-center gap-2 label-mono" style={{ color: "rgba(245,240,232,0.4)" }}>
                    <MapPin className="h-3 w-3" />{featuredEvent.location}
                  </div>
                )}
                <button
                  onClick={() => isBooked ? handleCancel(featuredEvent) : handleBook(featuredEvent)}
                  disabled={isLoading}
                  className={cn("self-start flex items-center gap-2 mt-2 label-sans px-6 py-3 transition-colors")}
                  style={
                    isBooked
                      ? { color: "rgba(245,240,232,0.5)", border: "1px solid rgba(245,240,232,0.25)", background: "transparent" }
                      : { background: "#F5F0E8", color: "#0F0F0D", border: "2px solid #F5F0E8" }
                  }
                >
                  {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    : isBooked ? <><CheckCircle2 className="h-3.5 w-3.5" /> Cancelar reserva</>
                    : <><ArrowRight className="h-3.5 w-3.5" /> Reservar plaza</>}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Full event list */}
      <div className="page-container">
        {groups.map((group) => (
          <div key={group.key}>
            {/* Month header — big and bold */}
            <div className="flex items-baseline justify-between mt-12 mb-0 pb-3 border-b-2 border-foreground">
              <h2
                className="font-serif font-black italic"
                style={{ fontSize: "clamp(28px,5vw,64px)", lineHeight: 0.9, letterSpacing: "-0.01em" }}
              >
                {toTitleCase(group.label)}
              </h2>
              <span className="label-mono text-foreground/40">{group.events.length} evento{group.events.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Event rows */}
            {group.events.map((event, idx) => {
              const d = new Date(event.event_date);
              const isPast = d < now;
              const isBooked = bookedIds.has(event.id);
              const isLoading = loadingId === event.id;
              const isFeatured = event.id === featuredId;
              const day = d.getDate().toString().padStart(2, "0");
              const weekday = d.toLocaleDateString("es-ES", { weekday: "long" }).toUpperCase();
              const time = d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

              return (
                <div
                  key={event.id}
                  className={cn(
                    "flex items-stretch border-b border-foreground/15 group transition-colors",
                    isPast ? "opacity-35" : "hover:bg-card",
                    isFeatured && !isPast && "bg-card/60"
                  )}
                >
                  {/* Row index */}
                  <div className="shrink-0 w-10 flex items-center justify-center border-r border-foreground/10">
                    <span className="label-mono text-foreground/20 rotate-180" style={{ writingMode: "vertical-rl" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="shrink-0 w-32 px-5 py-6 border-r border-foreground/15 flex flex-col justify-center">
                    <div className="font-mono font-black leading-none" style={{ fontSize: "clamp(36px,5vw,56px)" }}>{day}</div>
                    <div className="label-mono mt-1.5">{weekday}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="label-mono border-soft px-1.5 py-0.5">
                          {typeLabels[event.type] || event.type}
                        </span>
                        {isFeatured && !isPast && (
                          <span className="label-mono bg-foreground text-background px-1.5 py-0.5">Proximo</span>
                        )}
                      </div>
                      <h3 className="display-md line-clamp-1">{event.title}</h3>
                      {event.description && (
                        <p className="body-sans text-foreground/50 mt-1 line-clamp-2">{event.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 label-mono"><Clock className="h-3 w-3" />{time}h</div>
                        {event.location && (
                          <div className="flex items-center gap-1.5 label-mono"><MapPin className="h-3 w-3" />{event.location}</div>
                        )}
                      </div>
                    </div>

                    {!isPast && (
                      <div className="shrink-0">
                        <button
                          onClick={() => isBooked ? handleCancel(event) : handleBook(event)}
                          disabled={isLoading}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 label-sans transition-colors",
                            isBooked
                              ? "border border-foreground/20 text-foreground/50 hover:text-destructive hover:border-destructive"
                              : "btn-primary"
                          )}
                        >
                          {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            : isBooked ? <><CheckCircle2 className="h-3.5 w-3.5" /> Cancelar</>
                            : "Reservar"}
                        </button>
                      </div>
                    )}
                    {isPast && <span className="label-mono text-foreground/30 shrink-0">Finalizado</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="h-16" />
      </div>
    </div>
  );
}
