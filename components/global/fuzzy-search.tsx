"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Fuse from "fuse.js";
import { Book } from "@/lib/types";
import Link from "next/link";
import PriceTag from "../ui/price-tag";
import { createClient } from "@/supabase/client";

export default function FuzzySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await supabase
        .from("books")
        .select("id, title, cover_url, selling_price")
        .limit(500);

      if (data) setAllBooks(data as Book[]);
    }
    fetchBooks();
  }, []);

  const fuse = new Fuse(allBooks, {
    keys: ["title"],
    threshold: 0.4,
    distance: 100,
  });

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.search(query).map(r => r.item);
      setResults(searchResults.slice(0, 6));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[300px]">
      <div className="relative group">
        <input
          type="text"
          placeholder="Buscar libros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="font-serif bg-white rounded-full p-[8px] border pl-[16px]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top">
          <div className="p-2">
            {results.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 shadow-sm border border-white/5">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-[8px]">No img</div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-xs truncate group-hover:text-primary transition-colors">{book.title}</p>
                  <PriceTag price={book.selling_price || 0} size="sm" showDiscountBadge />
                </div>
              </Link>
            ))}
          </div>
          <div className="p-2 border-t border-white/5 bg-white/[0.02]">
            <Link
              href={`/books?q=${query}`}
              onClick={() => setIsOpen(false)}
              className="block text-center text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
            >
              Ver todos los resultados
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
