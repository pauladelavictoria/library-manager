import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowRight, Star } from "lucide-react";
import { EventsCalendar } from "@/components/events-calendar";
import { getRecommendedBooks } from "@/app/actions/books";
import { createClient } from "@/supabase/server";
import { Event } from "@/lib/types";

export const metadata = {
  title: "Home | Librería",
  description: "Explora nuestra colección de libros y únete a nuestros eventos.",
};

export default async function Home({ searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();



  const { data: events } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(4) as { data: Event[]; }

  const { data: recommendedBooks } = await getRecommendedBooks();

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-[-10%]">
          <div className="aspect-[1108/632] fill-primary/10" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
              <span className="font-semibold text-primary">Novedades</span>
              <span className="h-4 w-px bg-white/10" />
              <Link href="/books" className="flex items-center gap-x-1">
                Explora el nuevo catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
            Tu próxima gran aventura comienza aquí.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Gestiona tu biblioteca personal, descubre nuevos títulos y desafía tus conocimientos literarios en nuestra comunidad de lectores. Todo en un solo lugar.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/books">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg font-semibold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105 transition-all duration-300 group">
                Explorar Libros
                <Sparkles className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
            </Link>
            <Link href="/trivial" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors flex items-center gap-2">
              Jugar trivial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {recommendedBooks && recommendedBooks.length > 0 && (
        <div className="container mx-auto px-6 pb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-widest mb-4">
                <Star className="h-3 w-3 fill-current" />
                <span>Recomendación Exclusiva</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight">Recomendaciones del Librero</h2>
              <p className="text-slate-500 font-medium max-w-xl mt-2 text-lg">
                Joyas literarias seleccionadas cuidadosamente por nuestro equipo para transformar tu forma de leer.
              </p>
            </div>
            <Link href="/books" className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Ver catálogo completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="flex items-center gap-2 mb-3">
                      {book.categories?.[0] && (
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest">
                          {book.categories[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 leading-tight drop-shadow-md">
                      {book.title}
                    </h3>
                    <p className="text-white/70 font-medium text-sm line-clamp-1">
                      {book.authors?.join(", ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 pb-24">
        <EventsCalendar events={events} userId={user?.id} />
      </div>
    </div>
  );
}


