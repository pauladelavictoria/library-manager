import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, toTitleCase } from "@/lib/utils";
import { InventoryFilters } from "@/components/inventory-filters";
import { CreateBookDialog } from "@/components/create-book-dialog";
import { BookActions } from "@/components/book-actions";
import { RecommendationToggle } from "@/components/recommendation-toggle";
import { Dashboard } from "@/components/inventory/dashboard";
import type { Book } from "@/lib/types";

interface CatalogTabProps {
  paginatedBooks: (Book & { is_recommended?: boolean })[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  recommendedCount: number;
  filterOptions: { authors: string[]; categories: string[] };
  params: {
    q?: string;
    author?: string;
    category?: string;
    publisher?: string;
    sort?: "sales" | "stock" | "category" | "title";
    page?: string;
  };
  salesChartData: { date: string; amount: number }[];
  sortedBestSellers: Book[];
}

export function CatalogTab({
  paginatedBooks,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  recommendedCount,
  filterOptions,
  params,
  salesChartData,
  sortedBestSellers,
}: CatalogTabProps) {
  const buildPageUrl = (pageNumber: number) => {
    const p: Record<string, string> = {};
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined && typeof v === "string") p[k] = v; });
    p.page = pageNumber.toString();
    return `?${new URLSearchParams(p).toString()}`;
  };

  return (
    <main className="w-full space-y-0">
      {/* Charts */}
      <Dashboard salesChartData={salesChartData} sortedBestSellers={sortedBestSellers} />

      <div className="card-flat overflow-hidden">
        {/* Row 1: title + add button */}
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-baseline gap-3">
            <h2 className="label-sans">Catálogo</h2>
            <span className="label-mono">{totalItems} titulos · {recommendedCount} recomendados</span>
          </div>
          <CreateBookDialog />
        </div>

        {/* Row 2: filters */}
        <div className="px-6 py-3 border-soft-t bg-card">
          <InventoryFilters authors={filterOptions.authors} categories={filterOptions.categories} />
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-card">
              <TableHead className="pl-6 label-mono py-3">Libro</TableHead>
              <TableHead className="label-mono">Estado</TableHead>
              <TableHead className="label-mono text-center">Reco</TableHead>
              <TableHead className="label-mono text-right">Ventas</TableHead>
              <TableHead className="label-mono text-right">Stock</TableHead>
              <TableHead className="label-mono text-right">Precio</TableHead>
              <TableHead className="pr-6 text-right label-mono">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBooks.map((book) => {
              const isLowStock = (book.stock_quantity || 0) < 5;
              return (
                <TableRow
                  key={book.id}
                  className={cn(
                    "group transition-colors",
                    isLowStock ? "bg-destructive/5 hover:bg-destructive/10" : "hover:bg-card"
                  )}
                >
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <Link href={`/books/${book.id}`}>
                        <div className="w-10 h-14 overflow-hidden shrink-0 border-soft">
                          {book.cover_url ? (
                            <img src={book.cover_url} alt={toTitleCase(book.title)} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-card flex items-center justify-center label-mono text-[8px]">-</div>
                          )}
                        </div>
                      </Link>
                      <div className="min-w-0">
                        <p className="font-serif font-bold text-base line-clamp-1">{toTitleCase(book.title)}</p>
                        <p className="label-mono mt-0.5">{book.isbn}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {isLowStock ? (
                      <Badge variant="destructive" className="label-mono animate-pulse">CRITICO</Badge>
                    ) : (
                      <Badge variant="outline" className="label-mono text-foreground/50">OK</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <RecommendationToggle bookId={book.id} isRecommended={!!book.is_recommended} />
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="price-mono">{book.sold_count}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {isLowStock && <AlertTriangle className="h-3 w-3 text-destructive" />}
                      <span className={cn("price-mono", isLowStock ? "text-destructive" : "")}>
                        {book.stock_quantity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="price-mono">€{Number(book.selling_price || 0).toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <BookActions book={book} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-6 border-soft-t flex items-center justify-between">
          <p className="label-mono">
            {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
          </p>
          <div className="flex items-center gap-1">
            {/* Prev */}
            <Link
              href={buildPageUrl(currentPage - 1)}
              className={cn(
                "w-8 h-8 flex items-center justify-center border border-foreground/20 hover:bg-card transition-colors focus:outline-none",
                currentPage === 1 && "pointer-events-none opacity-25"
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Link>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Link
                  key={pageNum}
                  href={buildPageUrl(pageNum)}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center label-mono transition-colors focus:outline-none",
                    currentPage === pageNum
                      ? "bg-foreground border border-foreground"
                      : "border border-foreground/20 hover:bg-card"
                  )}
                  style={currentPage === pageNum ? { color: "hsl(var(--background))" } : undefined}
                >
                  {pageNum}
                </Link>
              );
            })}
            {totalPages > 5 && <span className="label-mono px-2 text-foreground/40">...</span>}

            {/* Next */}
            <Link
              href={buildPageUrl(currentPage + 1)}
              className={cn(
                "w-8 h-8 flex items-center justify-center border border-foreground/20 hover:bg-card transition-colors focus:outline-none",
                currentPage === totalPages && "pointer-events-none opacity-25"
              )}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
