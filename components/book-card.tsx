"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Book } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart, appliedPromo } = useCart();
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0] : "Autor desconocido";
  const category = book.categories && book.categories.length > 0 ? book.categories[0] : "General";

  const originalPrice = book.selling_price || 0;
  const discountAmount = appliedPromo ? (originalPrice * (appliedPromo.discount_amount / 100)) : 0;
  const discountedPrice = originalPrice - discountAmount;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/books/${book.id}`} className="block relative aspect-[2/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
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
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur-md">
            {category}
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/books/${book.id}`}>
          <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4">{authorName}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {appliedPromo && originalPrice > 0 ? (
              <>
                <span className="text-xs text-slate-400 line-through font-medium">
                  €{originalPrice.toFixed(2)}
                </span>
                <span className="text-xl font-black text-green-600 dark:text-green-400">
                  €{discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                {originalPrice > 0 ? `€${originalPrice.toFixed(2)}` : 'N/A'}
              </span>
            )}
          </div>
          <Button 
            size="icon" 
            className="rounded-full h-10 w-10 shadow-md shadow-primary/20 hover:scale-105 transition-transform" 
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
