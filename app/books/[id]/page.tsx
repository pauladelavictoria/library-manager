import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book } from "@/lib/types";
import PriceDisplay from "../../../components/global/price-display";
import AddToCartButton from "@/components/global/add-to-cart-button";
import PaymentConditions from "@/components/global/payment-conditions";
import { SynopsisToggle } from "@/components/synopsis-toggle";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const apiUrl = `${protocol}://${host}/api/books/${id}`;


  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) {
    return (
      <div className="container mx-auto px-md py-xl text-center">
        <h1 className="text-3xl font-bold mb-lg">Libro no encontrado</h1>
        <Link href="/books">
          <Button variant="ghost">
            <ArrowLeft className="mr-sm h-4 w-4" />
            Volver al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const book: Book = await res.json();
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0] : "Autor desconocido";

  return (
    <div className="hero-container">
      <div className="container mx-auto px-md py-lg lg:py-xl">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-lg group font-medium"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver al catálogo
        </Link>


        <div className="mb-lg">
          <div className="flex flex-wrap gap-3 mb-lg">
            {book.categories?.map(cat => (
              <span key={cat} className="px-md py-xs.5 rounded-full uppercase card-background">
                {cat}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-5xl font-serif max-w-3xl">
                {book.title}
              </h1>
              <p className="text-3lg font-light">
                {authorName}
              </p>
            </div>
            <AddToCartButton book={book} variant="primary" />

          </div>

          <div className="grid grid-cols-2 gap-10 my-lg">
            <div className="overflow-hidden">
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <p className="font-bold">Sin portada disponible</p>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl">Sinopsis</h3>
              <SynopsisToggle description={book.description} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 my-lg">
            <PriceDisplay book={book} />
            <PaymentConditions />
          </div>
        </div>

      </div>
    </div >
  );
}

