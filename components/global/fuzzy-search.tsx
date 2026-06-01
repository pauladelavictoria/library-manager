"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import Fuse from "fuse.js";
import { Book } from "@/lib/types";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import { toTitleCase } from "@/lib/utils";

export default function FuzzySearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  /* Load book list once */
  useEffect(() => {
    supabase.from("books").select("id, title, cover_url, selling_price, authors").limit(500)
      .then(({ data }) => { if (data) setAllBooks(data as Book[]); });
  }, []);

  /* Keyboard shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* Focus input when overlay opens */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  /* Search */
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const fuse = new Fuse(allBooks, { keys: ["title", "authors"], threshold: 0.4, distance: 100 });
    setResults(fuse.search(query).map(r => r.item).slice(0, 12));
  }, [query, allBooks]);

  function open() { setIsOpen(true); document.body.style.overflow = "hidden"; }
  function close() { setIsOpen(false); setQuery(""); setResults([]); document.body.style.overflow = ""; }

  return (
    <>
      {/* Trigger — header button */}
      <button
        onClick={open}
        className="flex items-center gap-2 label-sans text-foreground/50 hover:text-foreground transition-colors"
        aria-label="Buscar"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">Buscar</span>
      </button>

      {/* Fullscreen overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] flex flex-col"
          style={{
            backgroundColor: "#0F0F0D",
            backgroundImage: "var(--grain)",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            backgroundBlendMode: "overlay",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-[clamp(1rem,4vw,4rem)] py-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(245,240,232,0.1)" }}
          >
            <span className="font-serif font-bold text-2xl tracking-tight" style={{ color: "#F5F0E8" }}>
              éter
            </span>
            <button
              onClick={close}
              className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-60"
              style={{ color: "rgba(245,240,232,0.6)" }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search input */}
          <div className="px-[clamp(1rem,4vw,4rem)] pt-10 pb-6 shrink-0">
            <p className="label-mono mb-5" style={{ color: "rgba(245,240,232,0.55)" }}>
              {query
                ? `${results.length} resultado${results.length !== 1 ? "s" : ""}`
                : `${allBooks.length} titulos disponibles`}
            </p>
            <div style={{ borderBottom: "2px solid rgba(245,240,232,0.15)" }}>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Titulo, autor..."
                className="search-input w-full bg-transparent border-none outline-none pb-5 font-serif font-black italic"
                style={{
                  fontSize: "clamp(40px,7vw,110px)",
                  lineHeight: 0.88,
                  color: "#F5F0E8",
                  caretColor: "#F5F0E8",
                  letterSpacing: "-0.025em",
                }}
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-[clamp(1rem,4vw,4rem)] pb-12">
            {results.length > 0 ? (
              <div
                className="grid gap-0"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  borderTop: "1px solid rgba(245,240,232,0.1)",
                  borderLeft: "1px solid rgba(245,240,232,0.1)",
                }}
              >
                {results.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    onClick={close}
                    className="group flex flex-col"
                    style={{ borderRight: "1px solid rgba(245,240,232,0.1)", borderBottom: "1px solid rgba(245,240,232,0.1)" }}
                  >
                    <div className="aspect-[2/3] overflow-hidden">
                      {book.cover_url ? (
                        <img
                          src={book.cover_url}
                          alt={toTitleCase(book.title)}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "rgba(245,240,232,0.05)" }}>
                          <span className="label-mono" style={{ color: "rgba(245,240,232,0.55)" }}>N/A</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3" style={{ borderTop: "1px solid rgba(245,240,232,0.1)" }}>
                      <p
                        className="font-serif font-bold line-clamp-2 group-hover:opacity-70 transition-opacity"
                        style={{ fontSize: "13px", color: "#F5F0E8", lineHeight: 1.2 }}
                      >
                        {toTitleCase(book.title)}
                      </p>
                      {book.selling_price && (
                        <p className="font-mono font-bold text-xs mt-1" style={{ color: "rgba(245,240,232,0.4)" }}>
                          €{Number(book.selling_price).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : query && results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p
                  className="font-serif font-bold italic mb-3"
                  style={{ fontSize: "clamp(28px,4vw,56px)", color: "rgba(245,240,232,0.45)", lineHeight: 0.9 }}
                >
                  Sin resultados
                </p>
                <p className="label-mono" style={{ color: "rgba(245,240,232,0.45)" }}>
                  Prueba con otro titulo o autor
                </p>
              </div>
            ) : (
              <div className="py-12">
                <p className="label-mono" style={{ color: "rgba(245,240,232,0.45)" }}>
                  Escribe para buscar entre {allBooks.length} titulos
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
