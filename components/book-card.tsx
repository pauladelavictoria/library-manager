"use client";

import Link from "next/link";
import PriceTag from "@/components/ui/price-tag";
import { Book } from "@/lib/types";
import AddToCartButton from "./global/add-to-cart-button";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0] : "Autor desconocido";

  const originalPrice = book.selling_price || 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/50">
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

      <div className="flex flex-col flex-1 p-md">
        <Link href={`/books/${book.id}`}>
          <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-xs group-hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-md">{authorName}</p>

        <div className="mt-auto flex items-center justify-between">
          <PriceTag price={originalPrice} size="lg" showDiscountBadge />
          <AddToCartButton book={book} />
        </div>
      </div>
    </div>
  );
}
