import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Book } from "@/lib/types";
import PriceDisplay from "../../../components/global/price-display";
import PaymentConditions from "@/components/global/payment-conditions";
import { SynopsisToggle } from "@/components/synopsis-toggle";
import { toTitleCase } from "@/lib/utils";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/books/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return (
      <main className="page-container py-24 text-center">
        <h1 className="display-md mb-8">Libro no encontrado</h1>
        <Link href="/books" className="btn-ghost inline-flex items-center gap-2">
          <ArrowLeft className="h-3 w-3" />
          Volver al catalogo
        </Link>
      </main>
    );
  }

  const book: Book = await res.json();
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0] : "Autor desconocido";

  return (
    <main className="page-container py-12">

      <Link href="/books" className="inline-flex items-center gap-2 label-mono hover:opacity-60 transition-opacity mb-8 group">
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Catalogo
      </Link>

      <div className="section-header separator mb-0">
        <div className="flex flex-wrap items-baseline gap-4">
          <h1 className="display-lg">{toTitleCase(book.title)}</h1>
          <span className="label-mono">{authorName}</span>
        </div>
        {book.categories && book.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 shrink-0">
            {book.categories.map(cat => (
              <span key={cat} className="label-mono border-soft px-2 py-1">{cat}</span>
            ))}
          </div>
        )}
      </div>

      <div className="border-soft overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">

          <div className="md:col-span-3 md:border-r border-foreground/15 overflow-hidden border-b border-foreground/15 md:border-b-0">
            {book.cover_url ? (
              <img src={book.cover_url} alt={toTitleCase(book.title)} className="w-full object-cover" />
            ) : (
              <div className="aspect-[2/3] bg-card flex items-center justify-center label-mono">
                Sin portada
              </div>
            )}
          </div>

          <div className="md:col-span-5 md:border-r border-foreground/15 p-8 flex flex-col gap-4 border-b border-foreground/15 md:border-b-0">
            <h2 className="label-sans border-ink-b pb-2">Sinopsis</h2>
            <SynopsisToggle description={book.description} />
            {book.isbn && (
              <div className="border-soft-t pt-4 mt-auto">
                <p className="label-mono">ISBN: {book.isbn}</p>
                {book.publisher && <p className="label-mono mt-1">Editorial: {book.publisher}</p>}
              </div>
            )}
          </div>

          <div className="md:col-span-4 flex flex-col">
            <PriceDisplay book={book} />
            <PaymentConditions />
          </div>

        </div>
      </div>
    </main>
  );
}
