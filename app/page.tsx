import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import { Book } from "@/lib/types";
import { EventsCalendar } from "@/components/events-calendar";
import { createClient } from "@/supabase/server";

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

  // Fetch Books
  const { data: rawBooks, count: totalCount } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .limit(10);
  const books: Book[] = rawBooks || [];
  const count = totalCount || 0;

  // Fetch Events
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(4);

  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Background Decorative Elements */}
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

        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <div className="relative rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-sm shadow-2xl">
            <div className="rounded-xl bg-background overflow-hidden border border-white/5 aspect-video flex items-center justify-center group">
              <div className="text-center p-8">
                <BookOpen className="h-24 w-24 text-primary/20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-xl font-semibold text-muted-foreground">Vista Previa de Biblioteca</h3>
                <p className="text-sm text-muted-foreground/60 mt-2">Más de {count} títulos disponibles</p>
              </div>
            </div>
            {/* Floating badges for extra "Wow" */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce">
              +1k Usuarios
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold shadow-xl">
              Nuevos Títulos Semanales
            </div>
          </div>
        </div>
      </div>

      {/* Events Calendar Section */}
      <div className="container mx-auto px-6 pb-24">
        <EventsCalendar events={events} userId={user?.id} />
      </div>
    </div>
  );
}


