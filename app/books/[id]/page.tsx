import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book } from "@/lib/types";
import { cn } from "@/lib/utils";
import AddToCartButton from "./add-to-cart-button";
import PriceDisplay from "./price-display";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch book data from the API
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const apiUrl = `${protocol}://${host}/api/books/${id}`;

  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Libro no encontrado</h1>
        <Link href="/books">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const book: Book = await res.json();
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0] : "Autor desconocido";

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group font-medium"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative group">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10 p-1">
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-background relative">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                    <p className="font-bold">Sin portada disponible</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>


          </div>

          <div className="flex flex-col pt-4">
            <div className="mb-10">
              <div className="flex flex-wrap gap-3 mb-8">
                {book.categories?.map(cat => (
                  <span key={cat} className="px-5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-[0.95] text-foreground">
                {book.title}
              </h1>
              <p className="text-2xl lg:text-3xl text-muted-foreground font-medium flex items-center gap-3">
                <span className="h-px w-8 bg-muted-foreground/30" />
                {authorName}
              </p>
            </div>

            <PriceDisplay book={book} />

            <div className="prose dark:prose-invert max-w-none mb-12 mt-12">
              <h3 className="text-sm uppercase tracking-widest font-black text-foreground/40 mb-4">Sinopsis</h3>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {book.description || "Este libro no cuenta con una descripción detallada en este momento. Sin embargo, es una de las obras más buscadas de su categoría."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <AddToCartButton book={book} />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t border-slate-100 dark:border-white/5">
              <div className="flex flex-col gap-3 group">
                <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider">Envío Gratis</p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">En pedidos superiores a 30€</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 group">
                <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider">Pago Seguro</p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">Encriptación SSL avanzada</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 group">
                <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider">Devoluciones</p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">Plazo extendido de 30 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

