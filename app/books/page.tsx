import { BookCard } from "@/components/book-card";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { Book } from "@/lib/types";
import { PromoHandler } from "@/components/promo-handler";
import { BookSort } from "@/components/book-sort";
import { FilterPanel } from "@/app/books/FilterPanel";
import { Suspense } from "react";

export const metadata = {
  title: "Catálogo | Librería Éter",
  description: "Explora nuestra colección de libros.",
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;

  const page = typeof params.page === "string" ? params.page : "1";
  const search = typeof params.search === "string" ? params.search : "";
  const category = typeof params.category === "string" ? params.category : "Todas";
  const sortBy = typeof params.sortBy === "string" ? params.sortBy : "created_at";
  const sortOrder = typeof params.sortOrder === "string" ? params.sortOrder : "desc";
  const promo = typeof params.promo === "string" ? params.promo : "";

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const apiUrl = new URL(`${protocol}://${host}/api/books`);
  apiUrl.searchParams.set("page", page);
  apiUrl.searchParams.set("limit", "20");
  apiUrl.searchParams.set("sortBy", sortBy);
  apiUrl.searchParams.set("sortOrder", sortOrder);
  if (search) apiUrl.searchParams.set("search", search);
  if (category !== "Todas") apiUrl.searchParams.set("category", category);

  const res = await fetch(apiUrl.toString(), { cache: "no-store" });
  const { data: rawBooks, meta } = await res.json();
  const books: Book[] = rawBooks || [];

  const count = meta?.total || 0;
  const limit = meta?.limit || 20;
  const currentPage = parseInt(page, 10);

  const categoriesApiUrl = new URL(`${protocol}://${host}/api/categories`);
  let categories = ["Fiction", "Fantasy", "Science", "History", "Romance", "Thriller", "Todas"];
  try {
    const categoriesRes = await fetch(categoriesApiUrl.toString(), { cache: "no-store" });
    const { data: fetchedCategories } = await categoriesRes.json();
    if (fetchedCategories && Array.isArray(fetchedCategories)) {
      categories = [...fetchedCategories, "Todas"];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <main className="page-container py-12">
      <Suspense fallback={null}>
        <PromoHandler />
      </Suspense>

      <div className="mb-10">
        <h1 className="display-lg mb-4">Catálogo</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <FilterPanel categories={categories} category={category} search={search} promo={promo} />

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 border-ink-b pb-4">
            <p className="label-mono">
              {books?.length || 0} de {count || 0} resultados
            </p>
            <BookSort currentSort={sortBy} />
          </div>

          {books && books.length > 0 ? (
            <div className="book-grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center border-soft">
              <Search className="h-8 w-8 text-foreground/30 mb-6" />
              <h3 className="display-md mb-3">Sin resultados</h3>
              <p className="body-sans text-foreground/50 mb-8 max-w-sm">
                Cambia los filtros o realiza una busqueda diferente.
              </p>
              <Button asChild variant="primary">
                <Link href={`/books${promo ? `?promo=${promo}` : ""}`}>Limpiar filtros</Link>
              </Button>
            </div>
          )}

          {count && count > limit && (
            <div className="mt-10 flex justify-center gap-3">
              {currentPage > 1 && (
                <Button variant="secondary" asChild>
                  <Link href={`/books?page=${currentPage - 1}${search ? `&search=${search}` : ""}${category !== "Todas" ? `&category=${category}` : ""}${promo ? `&promo=${promo}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}${sortOrder ? `&sortOrder=${sortOrder}` : ""}`}>
                    Anterior
                  </Link>
                </Button>
              )}
              {currentPage * limit < count && (
                <Button variant="primary" asChild>
                  <Link href={`/books?page=${currentPage + 1}${search ? `&search=${search}` : ""}${category !== "Todas" ? `&category=${category}` : ""}${promo ? `&promo=${promo}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}${sortOrder ? `&sortOrder=${sortOrder}` : ""}`}>
                    Siguiente
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
