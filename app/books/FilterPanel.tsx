"use client";

import { useState } from "react";
import { SlidersHorizontal, X, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  categories: string[];
  category: string;
  search: string;
  promo: string;
}

export function FilterPanel({ categories, category, search, promo }: FilterPanelProps) {
  const [open, setOpen] = useState(false);
  const hasFilters = search || category !== "Todas";

  return (
    <>
      {/* Mobile toggle bar — shown only on < lg */}
      <div className="lg:hidden flex items-center justify-between border-soft-t border-b border-foreground/15 py-3 mb-4">
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-2 label-sans"
        >
          {open ? <X className="h-3.5 w-3.5" /> : <SlidersHorizontal className="h-3.5 w-3.5" />}
          {open ? "Cerrar" : "Filtros"}
        </button>
        {hasFilters && (
          <div className="flex items-center gap-3">
            <span className="label-mono">{category !== "Todas" ? category : search}</span>
            <Link
              href={`/books${promo ? `?promo=${promo}` : ""}`}
              className="label-mono text-foreground/50 flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <FilterX className="h-3 w-3" /> Limpiar
            </Link>
          </div>
        )}
      </div>

      {/* Filter form — always visible on lg, collapsible on mobile */}
      <aside
        className={cn(
          "shrink-0 lg:w-48",
          "lg:block",
          open ? "block" : "hidden"
        )}
      >
        {/* Mobile: full-width panel above the grid */}
        <div className="lg:hidden border-soft mb-6 p-5">
          <FilterForm categories={categories} category={category} search={search} promo={promo} onApply={() => setOpen(false)} />
        </div>

        {/* Desktop: sidebar */}
        <div className="hidden lg:block">
          <FilterForm categories={categories} category={category} search={search} promo={promo} />
        </div>
      </aside>
    </>
  );
}

function FilterForm({ categories, category, search, promo, onApply }: FilterPanelProps & { onApply?: () => void }) {
  return (
    <form className="space-y-5" action="/books" method="GET" onSubmit={onApply}>
      {promo && <input type="hidden" name="promo" value={promo} />}
      <div>
        <h3 className="label-sans mb-4 border-ink-b pb-2">Categorías</h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-2 gap-x-4">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={c}
                defaultChecked={category === c}
                className="h-3.5 w-3.5 border-foreground/30 accent-foreground"
              />
              <span className="label-mono group-hover:opacity-100 opacity-60 transition-opacity">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" variant="primary">Aplicar</Button>
        {(search || category !== "Todas") && (
          <Button variant="secondary" asChild>
            <Link href={`/books${promo ? `?promo=${promo}` : ""}`}>
              <FilterX className="h-3.5 w-3.5 mr-1" /> Limpiar
            </Link>
          </Button>
        )}
      </div>
    </form>
  );
}
