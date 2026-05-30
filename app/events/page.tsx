import { createClient } from "@/supabase/server";
import { Event } from "@/lib/types";
import { EventosList } from "./EventosList";

export const metadata = {
  title: "Eventos | Librería Éter",
  description: "Agenda cultural — presentaciones, talleres, firmas y club de lectura.",
};

export const TYPE_LABELS: Record<string, string> = {
  presentation: "Presentacion",
  workshop:     "Taller",
  club:         "Club de lectura",
  signing:      "Firma",
  generic:      "Evento",
};

function groupByMonth(events: Event[]): { key: string; label: string; events: Event[] }[] {
  const map = new Map<string, Event[]>();
  for (const e of events) {
    const d = new Date(e.event_date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return Array.from(map.entries()).map(([key, evts]) => {
    const [year, month] = key.split("-");
    const label = new Date(Number(year), Number(month) - 1, 1)
      .toLocaleDateString("es-ES", { month: "long", year: "numeric" });
    return { key, label, events: evts };
  });
}

export default async function EventosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: rawEvents } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  const events = (rawEvents || []) as Event[];
  const now = new Date();
  const upcoming = events.filter(e => new Date(e.event_date) >= now);
  const nextEvent = upcoming[upcoming.length - 1] ?? null; // earliest upcoming
  const groups = groupByMonth(events);

  return (
    <main>
      {/* Dark header block */}
      <section
        style={{
          backgroundColor: "#0F0F0D",
          backgroundImage: "var(--grain)",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          backgroundBlendMode: "overlay",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="page-container py-12 flex items-baseline justify-between"
          style={{ borderBottom: "1px solid rgba(245,240,232,0.1)" }}
        >
          <h1
            className="font-serif font-bold"
            style={{
              fontSize: "clamp(36px,5vw,72px)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              color: "#F5F0E8",
            }}
          >
            Agenda cultural
          </h1>
          <span className="label-mono" style={{ color: "rgba(245,240,232,0.35)" }}>
            {events.length} eventos · {upcoming.length} proximos
          </span>
        </div>
      </section>

      {/* Featured next event */}
      {nextEvent && (
        <EventosList
          groups={groups}
          typeLabels={TYPE_LABELS}
          userId={user?.id}
          featuredId={nextEvent.id}
        />
      )}

      {!nextEvent && events.length > 0 && (
        <EventosList groups={groups} typeLabels={TYPE_LABELS} userId={user?.id} />
      )}

      {events.length === 0 && (
        <div className="page-container py-24 text-center">
          <p className="display-md mb-2">Sin eventos programados</p>
          <p className="label-mono mt-2">Vuelve pronto para ver la agenda.</p>
        </div>
      )}
    </main>
  );
}
