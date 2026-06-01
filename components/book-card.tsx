"use client";

import Link from "next/link";
import { Book } from "@/lib/types";
import AddToCartButton from "./global/add-to-cart-button";
import { toTitleCase } from "@/lib/utils";
import PriceTag from "@/components/ui/price-tag";
import { useCart } from "@/lib/cart-context";
import { Tag } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { appliedPromo } = useCart();
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

        {appliedPromo && (
          <div className="flex items-center gap-1.5 text-emerald-600 mb-3 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-sm border border-emerald-500/20">
            <Tag className="w-3 h-3" />
            <span className="label-mono text-[10px] uppercase">{appliedPromo.code}</span>
          </div>
        )}

        <div className="border-soft-t pt-3 mt-auto flex items-center justify-between">
          {originalPrice > 0 ? (
            <PriceTag price={originalPrice} size="md" />
          ) : (
            <span />
          )}
          <AddToCartButton book={book} />
        </div>
      </div>
    </div>
  );
}
