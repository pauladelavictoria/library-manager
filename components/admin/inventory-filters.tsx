"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface InventoryFiltersProps {
  authors: string[];
  categories: string[];
  publishers: string[];
}

export function InventoryFilters({ authors, categories, publishers }: InventoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(`?${createQueryString("q", debouncedSearch)}`, { scroll: false });
  }, [debouncedSearch, createQueryString, router]);

  const handleFilterChange = (name: string, value: string) => {
    router.push(`?${createQueryString(name, value === "all" ? "" : value)}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push("?", { scroll: false });
    setSearchTerm("");
  };

  const hasFilters = searchParams.get("q") || searchParams.get("author") || searchParams.get("category") || searchParams.get("publisher");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Título o ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 w-full"
          />
        </div>

        <div className="w-[180px]">
          <Select
            value={searchParams.get("category") || "all"}
            onValueChange={(v) => handleFilterChange("category", v)}
          >
            <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-800 w-full">
              <SelectValue placeholder="Género" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
              <SelectItem value="all">Géneros</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[180px]">
          <Select
            value={searchParams.get("author") || "all"}
            onValueChange={(v) => handleFilterChange("author", v)}
          >
            <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-800 w-full">
              <SelectValue placeholder="Autor" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
              <SelectItem value="all">Autores</SelectItem>
              {authors.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[180px]">
          <Select
            value={searchParams.get("publisher") || "all"}
            onValueChange={(v) => handleFilterChange("publisher", v)}
          >
            <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-800 w-full">
              <SelectValue placeholder="Editorial" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
              <SelectItem value="all">Editoriales</SelectItem>
              {publishers.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="rounded-full text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="mr-1 h-3 w-3" />
            Limpiar
          </Button>
        )}
      </div>
    </div>
  );
}
