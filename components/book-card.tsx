"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriceTag from "@/components/ui/price-tag";
import { Book } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0] : "Autor desconocido";
  const category = book.categories && book.categories.length > 0 ? book.categories[0] : "General";

  const originalPrice = book.selling_price || 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/50 dark:bg-slate-900/50">
      <Link href={`/books/${book.id}`}>
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">Sin portada</div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <Link href={`/books/${book.id}`}>
          <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4">{authorName}</p>

        <div className="mt-auto flex items-center justify-between">
          <PriceTag price={originalPrice} size="lg" showDiscountBadge />
          <Button
            variant="icon"
            aria-label="Añadir al carrito"
            onClick={() => addToCart(book)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
