import { BookCard } from "@/components/book-card";
import { Search, FilterX, BookOpen } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { Book } from "@/lib/types";
import { PromoHandler } from "@/components/promo-handler";
import { Suspense } from "react";

export const metadata = {
  title: "Catálogo | Librería",
  description: "Explora nuestra colección de libros.",
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;

  const page = typeof params.page === 'string' ? params.page : '1';
  const search = typeof params.search === 'string' ? params.search : '';
  const category = typeof params.category === 'string' ? params.category : 'Todas';

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const apiUrl = new URL(`${protocol}://${host}/api/books`);
  apiUrl.searchParams.set("page", page);
  apiUrl.searchParams.set("limit", "20");
  if (search) apiUrl.searchParams.set("search", search);
  if (category !== 'Todas') apiUrl.searchParams.set("category", category);

  const res = await fetch(apiUrl.toString(), { cache: 'no-store' });
  const { data: rawBooks, meta } = await res.json();
  const books: Book[] = rawBooks || [];

  const count = meta?.total || 0;
  const limit = meta?.limit || 20;
  const currentPage = parseInt(page, 10);

  const categories = ["Fiction", "Fantasy", "Science", "History", "Romance", "Thriller", "Todas"];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      <Suspense fallback={null}>
        <PromoHandler />
      </Suspense>
      <div className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            <span>Novedades Literarias</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
            Explora nuestro <br className="hidden md:block" /> catálogo
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Encuentra tu próxima gran lectura entre nuestros más de {count || 0} títulos disponibles. Las mejores historias a un clic de distancia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <form className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800" action="/books" method="GET">
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-500">Buscar</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="search"
                    defaultValue={search}
                    placeholder="Título del libro..."
                    className="pl-9 bg-slate-50 dark:bg-slate-800 border-none"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-500">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <label key={c} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={c}
                        defaultChecked={category === c}
                        className="form-radio text-primary focus:ring-primary h-4 w-4 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <Button type="submit" className="w-full">Aplicar Filtros</Button>
                {(search || category) && (
                  <Button variant="outline" asChild size="icon" title="Limpiar Filtros">
                    <Link href="/books"><FilterX className="h-4 w-4" /></Link>
                  </Button>
                )}
              </div>
            </form>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Mostrando <span className="font-medium text-slate-900 dark:text-white">{books?.length || 0}</span> resultados de {count || 0}
              </p>
            </div>

            {books && books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 border-dashed">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No se encontraron libros</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                  Intenta cambiar los filtros o realizar una búsqueda diferente.
                </p>
                <Button asChild variant="outline">
                  <Link href="/books">Limpiar Filtros</Link>
                </Button>
              </div>
            )}

            {count && count > limit && (
              <div className="mt-12 flex justify-center gap-2">
                {currentPage > 1 && (
                  <Button variant="outline" asChild>
                    <Link href={`/books?page=${currentPage - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}>Anterior</Link>
                  </Button>
                )}
                {(currentPage * limit) < count && (
                  <Button variant="outline" asChild>
                    <Link href={`/books?page=${currentPage + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`}>Siguiente</Link>
                  </Button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
