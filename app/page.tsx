import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { EventsCalendar } from "@/components/events-calendar";
import { getRecommendedBooks } from "@/app/actions/books";
import { createClient } from "@/supabase/server";
import { Event } from "@/lib/types";

export const metadata = {
  title: "Home | Librería",
  description: "Explora nuestra colección de libros y únete a nuestros eventos.",
};

export default async function Home({
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
    <div className="hero-container">

      <div className="ml-xl my-lg">
        <h1 className="text-[120px] font-serif leading-[100px] mb-lg">
          Tu próxima gran aventura comienza aquí.
        </h1>
        <p className="">
          Descubre nuevos títulos y desafía tus conocimientos literarios en nuestra comunidad de lectores. Todo en un solo lugar.
        </p>
        <div className="mt-lg flex items-center gap-x-6">
          <Link href="/books">
            <Button variant="primary">
              EXPLORAR LIBROS
            </Button>
          </Link>
          <Link href="/trivial">
            <Button variant="secondary">
              JUGAR TRIVIAL
            </Button>
          </Link>
        </div>
      </div>

      {recommendedBooks && recommendedBooks.length > 0 && (
        <div className="flex flex-col justify-between gap-4 mb-lg mt-[100px]">
          <div className="flex justify-between">
            <div className="">
              <h2 className="text-2xl">RECOMENDACIONES DEL LIBRERO</h2>
              <p className="mb-[16px]">
                Joyas literarias seleccionadas cuidadosamente por nuestro equipo para transformar tu forma de leer.
              </p>
            </div>

            <Link href="/books">
              <Button variant="secondary">
                VER CATÁLOGO COMPLETO
              </Button>
            </Link>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[24px]">
            {recommendedBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div>
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="object-cover cursor-pointer mb-md h-[300px]" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-slate-300" />
                    </div>
                  )}
                  <div className="">
                    <h3 className="">
                      {book.title}
                    </h3>
                    <p>
                      {book.authors?.join(", ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <EventsCalendar events={events} userId={user?.id} />
    </div>
  );
}


