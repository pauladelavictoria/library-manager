import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { InventoryFilters } from "@/components/inventory-filters";
import { CreateBookDialog } from "@/components/create-book-dialog";
import { BookActions } from "@/components/book-actions";
import { RecommendationToggle } from "@/components/recommendation-toggle";
import type { Book } from "@/lib/types";

interface CatalogTabProps {
  paginatedBooks: (Book & { is_recommended?: boolean })[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  recommendedCount: number;
  filterOptions: {
    authors: string[];
    categories: string[];
  };
  params: {
    q?: string;
    author?: string;
    category?: string;
    publisher?: string;
    sort?: "sales" | "stock" | "category" | "title";
    page?: string;
  };
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
}: CatalogTabProps) {
  const buildPageUrl = (pageNumber: number) => {
    const searchParamsObj: Record<string, string> = {};
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && typeof val === "string") {
        searchParamsObj[key] = val;
      }
    });
    searchParamsObj.page = pageNumber.toString();
    return `?${new URLSearchParams(searchParamsObj).toString()}`;
  };

  return (
    <main className="w-full">
      <Card className="rounded-[2rem] border-slate-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-lg bg-back px-lg py-lg">
          <div>
            <CardTitle className="text-3xl font-black">Catálogo de Inventario</CardTitle>
            <CardDescription className="font-medium">
              Gestión total de los libros y existencias de la librería.
            </CardDescription>
          </div>
          <CreateBookDialog />
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-lg pt-0 border-b border-slate-100">
            <InventoryFilters
              authors={filterOptions.authors}
              categories={filterOptions.categories}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="pl-lg font-bold uppercase text-[10px] tracking-widest py-lg">
                  Libro
                </TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                  Estado
                </TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-center">
                  Reco
                </TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-center">
                  Ventas
                </TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                  Stock
                </TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                  Precio
                </TableHead>
                <TableHead className="pr-lg text-right font-bold uppercase text-[10px] tracking-widest">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBooks.map((book) => {
                const isLowStock = (book.stock_quantity || 0) < 5;
                return (
                  <TableRow
                    key={book.id}
                    className={cn(
                      "group transition-colors border-slate-50 ",
                      isLowStock ? "bg-red-50/50 hover:bg-red-100/50 " : "hover:bg-slate-50 "
                    )}
                  >
                    <TableCell className="pl-lg py-lg">
                      <div className="flex items-center gap-4">
                        <Link href={`/books/${book.id}`}>
                          <div className="w-12 h-16 cursor-pointer rounded-lg overflow-hidden shrink-0 shadow-sm border border-slate-100">
                            {book.cover_url ? (
                              <img
                                src={book.cover_url}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[8px]">
                                No img
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="min-w-0">
                          <p className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">
                            {book.title}
                          </p>
                          <p className="text-sm truncate max-w-[200px]">{book.isbn}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {isLowStock ? (
                        <Badge
                          variant="destructive"
                          className="rounded-lg px-sm.5 py-xs font-black text-[10px] tracking-wider animate-pulse shadow-sm"
                        >
                          CRÍTICO
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="rounded-lg px-sm.5 py-xs font-bold text-[10px] tracking-wider text-emerald-600 border-emerald-500/20 bg-emerald-500/10"
                        >
                          SALUDABLE
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <RecommendationToggle
                        bookId={book.id}
                        isRecommended={!!book.is_recommended}
                        currentCount={recommendedCount}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="text-xl font-black text-slate-900">
                          {book.sold_count}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">
                          unidades
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-black text-xl",
                            isLowStock ? "text-red-600" : "text-slate-700 "
                          )}
                        >
                          {book.stock_quantity}
                        </span>
                        {isLowStock && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-base text-slate-600">
                      €{book.selling_price || "0.00"}
                    </TableCell>
                    <TableCell className="pr-lg text-right">
                      <BookActions book={book} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="p-lg bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Mostrando{" "}
              <span className="font-bold text-slate-900">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              a{" "}
              <span className="font-bold text-slate-900">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{" "}
              de <span className="font-bold text-slate-900">{totalItems}</span> libros
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={buildPageUrl(currentPage - 1)}
                className={cn(
                  "p-sm rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={buildPageUrl(pageNum)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all",
                        currentPage === pageNum
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-slate-200 "
                      )}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
                {totalPages > 5 && <span className="px-sm">...</span>}
              </div>
              <Link
                href={buildPageUrl(currentPage + 1)}
                className={cn(
                  "p-sm rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
