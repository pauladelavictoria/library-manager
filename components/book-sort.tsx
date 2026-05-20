"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function BookSort({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.set("sortOrder", value === "price" ? "asc" : "desc");
    params.set("page", "1");

    router.push(`/books?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Ordenar por:</span>
      <select
        defaultValue={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="text-sm border-slate-200 bg-background rounded-sm p-xs"
      >
        <option value="created_at">Novedades</option>
        <option value="price">Precio</option>
        <option value="title">Título</option>
        <option value="sales">Más Vendidos</option>
      </select>
    </div>
  );
}
