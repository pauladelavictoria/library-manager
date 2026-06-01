"use client";

import Link from "next/link";
import { Book } from "@/lib/types";
import AddToCartButton from "./global/add-to-cart-button";
import { toTitleCase } from "@/lib/utils";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0] : "Autor desconocido";
  const originalPrice = book.selling_price || 0;

  return (
    <div className="group flex flex-col overflow-hidden bg-background">
      <Link href={`/books/${book.id}`} className="block overflow-hidden">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={toTitleCase(book.title)}
            className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-card flex items-center justify-center label-mono">
            Sin portada
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-3">
        <Link href={`/books/${book.id}`}>
          <h3 className="display-md leading-tight line-clamp-2 mb-1 group-hover:opacity-70 transition-opacity">
            {toTitleCase(book.title)}
          </h3>
        </Link>
        <p className="label-mono mt-1 mb-3">{authorName}</p>

        <div className="border-soft-t pt-3 mt-auto flex items-center justify-between">
          <span className="price-mono">
            {originalPrice > 0 ? `${originalPrice.toFixed(2)} €` : ""}
          </span>
          <AddToCartButton book={book} />
        </div>
      </div>
    </div>
  );
}
