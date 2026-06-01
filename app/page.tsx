import Link from "next/link";
import { EventsCalendar } from "@/components/events-calendar";
import { getRecommendedBooks } from "@/app/actions/books";
import { createClient } from "@/supabase/server";
import { Event } from "@/lib/types";
import { toTitleCase } from "@/lib/utils";

export const metadata = {
  title: "Home | Librería Éter",
  description: "Explora nuestra colección de libros y únete a nuestros eventos.",
};

export default async function Home() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(4) as { data: Event[]; };

  const { data: recommendedBooks } = await getRecommendedBooks();

  return (
    <main>
      {/* Hero — dark + grain */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{ background: "hsl(var(--foreground))", height: "calc(100dvh - 67px)" }}
      >
        {/* Content */}
        <div className="flex flex-col flex-1">

          {/* Top bar */}
          <div
            className="page-container flex items-center justify-between py-4 gap-8"
            style={{ borderBottom: "1px solid hsl(var(--background) / 0.2)" }}
          >
            <span className="label-mono" style={{ color: "hsl(var(--background) / 0.45)" }}>
              Librería Éter
            </span>
            <span className="label-mono" style={{ color: "hsl(var(--background) / 0.45)" }}>
              Macondo
            </span>
          </div>

          {/* Headline — centered, fills the space */}
          <div className="flex-1 flex flex-col justify-center py-12">
            <h1
              className="font-serif font-black text-center"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(64px,7vw,140px)",
                lineHeight: 0.8,
                letterSpacing: "-0.03em",
                color: "hsl(var(--background))",
              }}
            >
              Tu próxima gran<br />
              <em style={{ color: "hsl(var(--background) / 0.35)" }}>
                aventura
              </em><br />
              comienza aquí.
            </h1>
          </div>

          {/* Bottom bar */}
          <div
            className="page-container py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ borderTop: "1px solid hsl(var(--background) / 0.2)" }}
          >
            <p
              className="label-mono max-w-[42ch]"
              style={{ color: "hsl(var(--background) / 0.4)" }}
            >
              Descubre nuevos títulos y desafía tus conocimientos literarios.
            </p>
            <div className="flex gap-3">
              <Link
                href="/books"
                className="btn-primary"
                style={{
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  borderColor: "hsl(var(--background))",
                }}
              >
                Explorar libros
              </Link>
              <Link
                href="/trivial"
                className="btn-outline"
                style={{
                  color: "hsl(var(--background) / 0.7)",
                  borderColor: "hsl(var(--background) / 0.25)",
                }}
              >
                Jugar trivial
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Recommended books */}
      {recommendedBooks && recommendedBooks.length > 0 && (
        <section className="page-container mt-16 mb-16">
          <div className="section-header separator mb-0">
            <span className="label-mono">01 / Recomendaciones del librero</span>
            <Link href="/books" className="btn-ghost">
              Ver catálogo completo
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-left border-soft gap-0 border-t border-foreground/15 border-l border-foreground/15">
            {recommendedBooks.map((book, i) => (
              <div
                key={book.id}
                className={`border-r border-b border-foreground/15 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <Link href={`/books/${book.id}`} className="group block">
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={toTitleCase(book.title)}
                      className="w-full aspect-[2/3] object-cover group-hover:opacity-85 transition-opacity"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-card flex items-center justify-center label-mono">
                      Sin portada
                    </div>
                  )}
                  <div className="p-4 border-soft-t">
                    <h3 className="display-md line-clamp-2">{toTitleCase(book.title)}</h3>
                    <p className="label-mono mt-1">{book.authors?.join(", ")}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Events */}
      <section className="page-container mb-16">
        <div className="section-header separator mb-0">
          <span className="label-mono">02 / Proximos eventos</span>
        </div>
        <EventsCalendar events={events} userId={user?.id} />
      </section>
    </main>
  );
}
