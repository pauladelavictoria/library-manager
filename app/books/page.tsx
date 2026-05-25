import { BookCard } from "@/components/book-card";
import { Search, FilterX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { Book } from "@/lib/types";
import { PromoHandler } from "@/components/promo-handler";
import { BookSort } from "@/components/book-sort";
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
  const sortBy = typeof params.sortBy === 'string' ? params.sortBy : 'created_at';
  const sortOrder = typeof params.sortOrder === 'string' ? params.sortOrder : 'desc';

  const promo = typeof params.promo === 'string' ? params.promo : '';

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const apiUrl = new URL(`${protocol}://${host}/api/books`);
  apiUrl.searchParams.set("page", page);
  apiUrl.searchParams.set("limit", "20");
  apiUrl.searchParams.set("sortBy", sortBy);
  apiUrl.searchParams.set("sortOrder", sortOrder);
  if (search) apiUrl.searchParams.set("search", search);
  if (category !== 'Todas') apiUrl.searchParams.set("category", category);

  const res = await fetch(apiUrl.toString(), { cache: 'no-store' });
  const { data: rawBooks, meta } = await res.json();
  const books: Book[] = rawBooks || [];

  const count = meta?.total || 0;
  const limit = meta?.limit || 20;
  const currentPage = parseInt(page, 10);

  const categoriesApiUrl = new URL(`${protocol}://${host}/api/categories`);
  let categories = ["Fiction", "Fantasy", "Science", "History", "Romance", "Thriller", "Todas"]; // Fallback
  try {
    const categoriesRes = await fetch(categoriesApiUrl.toString(), { cache: 'no-store' });
    const { data: fetchedCategories } = await categoriesRes.json();
    if (fetchedCategories && Array.isArray(fetchedCategories)) {
      categories = [...fetchedCategories, "Todas"];
    }
  } catch (error) {
    console.error("Error fetching categories frontend:", error);
  }


  return (
    <div className="hero-container">
      <Suspense fallback={null}>
        <PromoHandler />
      </Suspense>
      <div>
        <h1 className="text-6xl font-serif mb-md">
          Explora nuestro catálogo
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Encuentra tu próxima gran lectura entre nuestros más de {count || 0} títulos disponibles. Las mejores historias a un clic de distancia.
        </p>
      </div>

      <div className="my-lg">
        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="shrink-0 space-y-8 bg-cardDark rounded-2xl h-fit">
            <form className="space-y-6 p-lg rounded-2xl" action="/books" method="GET">
              {promo && <input type="hidden" name="promo" value={promo} />}
              <div>
                <h3 className="mb-sm text-sm uppercase">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <label key={c} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={c}
                        defaultChecked={category === c}
                        className="form-radio text-primary focus:ring-primary h-4 w-4 border-slate-300 bg-slate-50"
                      />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="ghost">Aplicar Filtros</Button>
              {(search || category !== 'Todas') && (
                <Button variant="primary" asChild title="Limpiar Filtros">
                  <Link href={`/books${promo ? `?promo=${promo}` : ''}`}><FilterX className="h-4 w-4" /></Link>
                </Button>
              )}
            </form>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-lg gap-4">
              <p className="text-sm">
                Mostrando <span className="font-medium text-slate-900">{books?.length || 0}</span> resultados de {count || 0}
              </p>

              <BookSort currentSort={sortBy} />
            </div>

            {books && books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-xl text-center bg-white rounded-2xl border border-slate-100 border-dashed">
                <div className="h-16 w-16  rounded-full flex items-center justify-center mb-md">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-sm">No se encontraron libros</h3>
                <p className=" mb-lg max-w-sm">
                  Intenta cambiar los filtros o realizar una búsqueda diferente.
                </p>
                <Button asChild variant="primary">
                  <Link href={`/books${promo ? `?promo=${promo}` : ''}`}>Limpiar Filtros</Link>
                </Button>
              </div>
            )}

            {count && count > limit && (
              <div className="mt-lg flex justify-center gap-2">
                {currentPage > 1 && (
                  <Button variant="primary" >
                    <Link href={`/books?page=${currentPage - 1}${search ? `&search=${search}` : ''}${category !== 'Todas' ? `&category=${category}` : ''}${promo ? `&promo=${promo}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${sortOrder ? `&sortOrder=${sortOrder}` : ''}`}>Anterior</Link>
                  </Button>
                )}
                {(currentPage * limit) < count && (
                  <Button variant="primary" >
                    <Link href={`/books?page=${currentPage + 1}${search ? `&search=${search}` : ''}${category !== 'Todas' ? `&category=${category}` : ''}${promo ? `&promo=${promo}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}${sortOrder ? `&sortOrder=${sortOrder}` : ''}`}>Siguiente</Link>
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
