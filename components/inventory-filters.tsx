"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ArrowUpDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

interface InventoryFiltersProps {
  authors: string[];
  categories: string[];
}

const SORT_OPTIONS = [
  { value: "title",  label: "Titulo (A-Z)" },
  { value: "sales",  label: "Mas vendidos" },
  { value: "stock",  label: "Reponer primero" },
];

export function InventoryFilters({ authors, categories }: InventoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(name, value) : params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(`?${createQueryString("q", debouncedSearch)}`, { scroll: false });
  }, [debouncedSearch, createQueryString, router]);

  const clearFilters = () => { router.push("?", { scroll: false }); setSearchTerm(""); };

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value && value !== "all" ? params.set(name, value) : params.delete(name);
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const hasFilters = searchParams.get("q") || searchParams.get("author") || searchParams.get("category") || searchParams.get("sort");
  const currentSort = searchParams.get("sort") || "title";
  const currentCategory = searchParams.get("category") || "all";
  const currentAuthor = searchParams.get("author") || "all";

  const selectClass = "h-9 border border-foreground/20 bg-background body-sans focus:outline-none focus:border-foreground appearance-none pr-8 pl-3 cursor-pointer";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative w-full sm:w-56">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
        <input
          type="text"
          placeholder="Titulo o ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9 w-full border border-foreground/20 bg-background pl-9 pr-3 body-sans focus:outline-none focus:border-foreground"
        />
      </div>

      {/* Sort */}
      <div className="relative">
        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground/30 pointer-events-none" />
        <select
          value={currentSort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className={cn(selectClass, "pl-8 w-44")}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Category */}
      <select
        value={currentCategory}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        className={cn(selectClass, "w-44")}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
      >
        <option value="all">Todos los generos</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Author */}
      <select
        value={currentAuthor}
        onChange={(e) => handleFilterChange("author", e.target.value)}
        className={cn(selectClass, "w-44")}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
      >
        <option value="all">Todos los autores</option>
        {authors.map(a => <option key={a} value={a}>{a}</option>)}
      </select>

      {hasFilters && (
        <button onClick={clearFilters} className="btn-ghost flex items-center gap-1.5">
          <X className="h-3 w-3" /> Limpiar
        </button>
      )}
    </div>
  );
}
