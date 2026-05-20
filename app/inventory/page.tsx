import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { AlertTriangle, Trophy, Tag, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { InventoryFilters } from "@/components/inventory-filters";
import { CreatePromoDialog } from "@/components/create-promo-dialog";
import { getPromoPerformance } from "@/app/actions/promo";
import { CreateEventDialog } from "@/components/create-event-dialog";
import { SalesChart } from "@/components/sales-chart";
import { BestSellersBubbles } from "@/components/best-sellers-bubbles";
import { PromoActions } from "@/components/promo-actions";
import { CreateBookDialog } from "@/components/create-book-dialog";
import { BookActions } from "@/components/book-actions";
import { getBooks } from "@/app/actions/books";
import { Calendar as CalendarIcon, Users as UsersIcon, MapPin, PenTool, BookOpen, Presentation, LayoutDashboard, Book, Tag as TagIcon, CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Book as BookType } from "@/lib/types";
import { RecommendationToggle } from "@/components/recommendation-toggle";
import { EventActions } from "@/components/event-actions";


export const metadata = {
  title: "Gestión de Inventario | Admin",
  description: "Panel de control para la gestión de libros, eventos, promociones y stock.",
};

export default async function AdminInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    author?: string;
    category?: string;
    publisher?: string;
    period?: "week" | "month";
    sort?: "sales" | "stock" | "category" | "title";
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const currentPage = parseInt(params.page || "1");
  const itemsPerPage = 10;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/");
  }

  const sortByMap: Record<string, any> = {
    sales: "sales",
    stock: "stock",
    category: "category",
    title: "title",
  };

  const { data: booksData, meta } = await getBooks({
    page: currentPage,
    limit: itemsPerPage,
    search: params.q,
    category: params.category,
    author: params.author,
    publisher: params.publisher,
    sortBy: sortByMap[params.sort || "title"] || "title",
    sortOrder: params.sort === "stock" ? "asc" : "desc"
  });

  const paginatedBooks = booksData || [];
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;


  const { data: filterBase } = await supabase.from("books").select("authors, categories, publisher");

  const filterOptions = {
    authors: Array.from(new Set((filterBase || []).flatMap(b => b.authors || []))).sort(),
    categories: Array.from(new Set((filterBase || []).flatMap(b => b.categories || []))).sort(),
    publishers: Array.from(new Set((filterBase || []).map(b => b.publisher).filter(Boolean))).sort() as string[],
  };

  const { data: topSellers } = await getBooks({
    limit: 10,
    sortBy: "sales",
    sortOrder: "desc"
  });
  const sortedBestSellers = (topSellers || []) as BookType[];

  const recommendedCount = paginatedBooks.filter(b => (b as any).is_recommended).length;

  const period = params.period || "week";
  const daysToFetch = period === "month" ? 30 : 7;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysToFetch);

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("created_at, total_amount")
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: true });

  const dailyData: { [key: string]: number } = {};
  for (let i = daysToFetch - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const label = period === "month"
      ? date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
      : date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" });
    dailyData[label] = 0;
  }

  recentOrders?.forEach(order => {
    const date = new Date(order.created_at);
    const label = period === "month"
      ? date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
      : date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" });
    if (dailyData[label] !== undefined) {
      dailyData[label] += Number(order.total_amount);
    }
  });

  const salesChartData = Object.entries(dailyData).map(([date, amount]) => ({
    date,
    amount: Number(amount.toFixed(2))
  }));

  const { data: promoStatsResult } = await getPromoPerformance();
  const promoPerformance = promoStatsResult || [];

  const totalDiscountGiven = promoPerformance.reduce((sum, p) => sum + (p.total_discount || 0), 0);
  const activePromosCount = promoPerformance.filter(p => p.isActive).length;


  const { data: allEvents } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  const { data: allBookings } = await supabase
    .from("event_bookings")
    .select("event_id");

  const eventPerformance = (allEvents || []).map(event => {
    const attendees = (allBookings || []).filter(b => b.event_id === event.id).length;
    const isPast = new Date(event.event_date) < new Date();
    return {
      ...event,
      attendees,
      isPast,
    };
  });

  return (
    <div className="hero-container">
      <div className="container mx-auto px-md sm:px-lg lg:px-lg">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-lg">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-sm">Gestión de la Librería</h1>
            <p className="text-slate-500">Supervisa el rendimiento y gestiona el inventario.</p>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-lg w-fit bg-slate-100/50 backdrop-blur-sm border border-slate-200/50">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Vista General
            </TabsTrigger>
            <TabsTrigger value="catalog" className="gap-2">
              <Book className="h-4 w-4" />
              Catálogo de Libros
            </TabsTrigger>
            <TabsTrigger value="marketing" className="gap-2">
              <TagIcon className="h-4 w-4" />
              Promociones
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Agenda Cultural
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-lg">
              <SalesChart data={salesChartData} />

              <Card className="rounded-[2rem] border-slate-200 shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-md">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                          Libros Más Vendidos
                        </CardTitle>
                        <CardDescription className="font-medium text-slate-500">
                          {params.category && params.category !== "Todas" ? `Top ventas en ${params.category}` :
                            params.author && params.author !== "Todos" ? `Top ventas de ${params.author}` :
                              "Top 10 títulos con mayor número de ventas generales."}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-sm pb-lg flex flex-col justify-center min-h-[400px]">
                  {sortedBestSellers.length > 0 ? (
                    <BestSellersBubbles data={sortedBestSellers} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-lg text-center border-2 border-dashed border-slate-200 rounded-3xl">
                      <Trophy className="h-12 w-12 text-slate-300 mb-sm" />
                      <p className="text-slate-500 font-medium">No hay ventas registradas para este filtro</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketing">
            <div className="mb-lg">
              <div className="flex items-center justify-between mb-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  <h2 className="text-2xl font-bold tracking-tight">Rendimiento de Promociones</h2>
                </div>
                <div className="flex gap-3">
                  <CreatePromoDialog />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-lg">
                <Card className="rounded-3xl border-slate-200 shadow-lg bg-emerald-500/5 border-emerald-500/10">
                  <CardHeader className="pb-sm">
                    <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Ahorro Total Clientes</CardDescription>
                    <CardTitle className="text-3xl font-black text-emerald-600">€{totalDiscountGiven.toFixed(2)}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="rounded-3xl border-slate-200 shadow-lg">
                  <CardHeader className="pb-sm">
                    <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Cupones Activos</CardDescription>
                    <CardTitle className="text-3xl font-black">{activePromosCount}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="rounded-3xl border-slate-200 shadow-lg">
                  <CardHeader className="pb-sm">
                    <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Pedidos con Cupón</CardDescription>
                    <CardTitle className="text-3xl font-black">{promoPerformance.reduce((sum, p) => sum + (p.usage_count || 0), 0)}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="rounded-3xl border-slate-200 shadow-lg">
                  <CardHeader className="pb-sm">
                    <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Ingresos vía Promo</CardDescription>
                    <CardTitle className="text-3xl font-black text-primary">€{promoPerformance.reduce((sum, p) => sum + (p.total_revenue || 0), 0).toFixed(2)}</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card className="rounded-[2rem] border-slate-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="pl-lg font-bold uppercase text-[10px] tracking-widest  py-lg">Código</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest ">Descuento</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest ">Usos</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest ">Total Descontado</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest ">Ingresos (Neto)</TableHead>
                      <TableHead className="pr-lg text-right font-bold uppercase text-[10px] tracking-widest ">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promoPerformance.map((promo) => (
                      <TableRow key={promo.code} className="group border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="pl-lg py-md">
                          <div className="flex items-center gap-3">
                            <div className="p-sm rounded-lg bg-primary/10 text-primary">
                              <Tag className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-black tracking-tight">{promo.code}</p>
                              <div className="flex items-center gap-1.5">
                                <div className={cn("h-1.5 w-1.5 rounded-full", promo.isActive ? "bg-emerald-500" : "bg-slate-300")} />
                                <p className="text-[10px] font-bold  uppercase tracking-tighter">
                                  {promo.isActive ? "Activo" : (promo.is_one_time && promo.usage_count > 0 ? "Usado" : "Inactivo")}
                                </p>
                                {promo.is_one_time && (
                                  <Badge variant="secondary" className="text-[8px] h-3.5 px-xs rounded bg-amber-100 text-amber-700 border-none font-black uppercase">
                                    Único
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-md font-black border-primary/20 text-primary bg-primary/5">
                            -{promo.discount_amount}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold text-slate-600">{promo.usage_count}</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold text-red-600">-€{(promo.total_discount || 0).toFixed(2)}</p>
                        </TableCell>
                        <TableCell className="text-center">
                          <p className="font-black text-lg tracking-tight">€{(promo.total_revenue || 0).toFixed(2)}</p>
                        </TableCell>
                        <TableCell className="pr-lg text-right">
                          <PromoActions promo={promo} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="mb-lg">
              <div className="flex items-center justify-between mb-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  <h2 className="text-2xl font-bold tracking-tight">Agenda Cultural</h2>
                </div>
                <CreateEventDialog />
              </div>

              <Card className="rounded-[2rem] border-slate-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="pl-lg font-bold uppercase text-[10px] tracking-widest  py-lg">Evento</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest ">Tipo</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest ">Fecha y Hora</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest ">Ubicación</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-widest  text-center">Asistentes</TableHead>
                      <TableHead className="pr-lg text-right font-bold uppercase text-[10px] tracking-widest ">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventPerformance.length > 0 ? (
                      eventPerformance.map((event) => (
                        <TableRow
                          key={event.id}
                          className={cn("group border-slate-100 transition-colors", event.isPast ? "bg-slate-50/30 opacity-60" : "hover:bg-slate-50/50 ")}
                        >
                          <TableCell className="pl-lg py-md">
                            <div className="flex items-center gap-2">
                              <p className="font-black tracking-tight">{event.title}</p>
                              {event.isPast && (
                                <Badge variant="secondary" className="text-[9px] h-4 rounded-sm bg-slate-200 text-slate-500 font-bold border-none px-xs uppercase tracking-tighter">
                                  Finalizado
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="rounded-md font-black border-slate-200 bg-slate-50 flex w-fit items-center gap-1.5 capitalize">
                              {event.type === 'signing' && <PenTool className="h-3 w-3" />}
                              {event.type === 'workshop' && <BookOpen className="h-3 w-3" />}
                              {event.type === 'club' && <UsersIcon className="h-3 w-3" />}
                              {event.type === 'presentation' && <Presentation className="h-3 w-3" />}
                              {event.type === 'generic' && <CalendarIcon className="h-3 w-3" />}
                              {event.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm font-bold text-slate-600">
                              {new Date(event.event_date).toLocaleString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs font-medium">{event.location || "N/A"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="inline-flex items-center justify-center px-sm py-xs rounded-full bg-emerald-50 text-emerald-600 font-black text-sm">
                              {event.attendees}
                            </div>
                          </TableCell>
                          <TableCell className="pr-lg text-right">
                            <EventActions event={event} />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-slate-500 font-medium italic">
                          No hay eventos programados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="catalog">
            <main className="w-full">
              <Card className="rounded-[2rem] border-slate-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-lg bg-back px-lg py-lg">
                  <div>
                    <CardTitle className="text-3xl font-black">Catálogo de Inventario</CardTitle>
                    <CardDescription className="font-medium">Gestión total de los libros y existencias de la librería.</CardDescription>
                  </div>
                  <CreateBookDialog />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-lg  pt-0 border-b border-slate-100">
                    <InventoryFilters
                      authors={filterOptions.authors}
                      categories={filterOptions.categories}
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="pl-lg font-bold uppercase text-[10px] tracking-widest py-lg">Libro</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Estado</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest text-center">Reco</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest text-center">Ventas</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Stock</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Precio</TableHead>
                        <TableHead className="pr-lg text-right font-bold uppercase text-[10px] tracking-widest">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBooks.map((book) => {
                        const isLowStock = (book.stock_quantity || 0) < 5;
                        return (
                          <TableRow
                            key={book.id}
                            className={cn("group transition-colors border-slate-50 ", isLowStock ? "bg-red-50/50 hover:bg-red-100/50 " : "hover:bg-slate-50 ")}
                          >
                            <TableCell className="pl-lg py-lg">
                              <div className="flex items-center gap-4">
                                <Link href={`/books/${book.id}`}>
                                  <div className="w-12 h-16 cursor-pointer rounded-lg overflow-hidden shrink-0 shadow-sm border border-slate-100">
                                    {book.cover_url ? (
                                      <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[8px]">No img</div>
                                    )}
                                  </div>
                                </Link>
                                <div className="min-w-0">
                                  <p className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">{book.title}</p>
                                  <p className="text-sm  truncate max-w-[200px]">{book.isbn}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {isLowStock ? (
                                <Badge variant="destructive" className="rounded-lg px-sm.5 py-xs font-black text-[10px] tracking-wider animate-pulse shadow-sm">
                                  CRÍTICO
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="rounded-lg px-sm.5 py-xs font-bold text-[10px] tracking-wider text-emerald-600 border-emerald-500/20 bg-emerald-500/10">
                                  SALUDABLE
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <RecommendationToggle
                                bookId={book.id}
                                isRecommended={(book as any).is_recommended}
                                currentCount={recommendedCount}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="inline-flex flex-col items-center">
                                <span className="text-xl font-black text-slate-900">{book.sold_count}</span>
                                <span className="text-[10px] font-bold  uppercase tracking-tighter">unidades</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={cn("font-black text-xl", isLowStock ? "text-red-600" : "text-slate-700 ")}>
                                  {book.stock_quantity}
                                </span>
                                {isLowStock && <AlertTriangle className="h-4 w-4 text-red-500" />}
                              </div>
                            </TableCell>
                            <TableCell className="font-bold text-base text-slate-600">
                              €{book.selling_price || '0.00'}
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
                      Mostrando <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, totalItems)}</span> de <span className="font-bold text-slate-900">{totalItems}</span> libros
                    </p>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`?${new URLSearchParams({ ...params, page: (currentPage - 1).toString() }).toString()}`}
                        className={cn("p-sm rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm", currentPage === 1 && "pointer-events-none opacity-50")}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Link>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <Link
                              key={pageNum}
                              href={`?${new URLSearchParams({ ...params, page: pageNum.toString() }).toString()}`}
                              className={cn("w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all", currentPage === pageNum ? "bg-primary text-white shadow-lg shadow-primary/30" : "hover:bg-slate-200 ")}
                            >
                              {pageNum}
                            </Link>
                          );
                        })}
                        {totalPages > 5 && <span className="px-sm">...</span>}
                      </div>
                      <Link
                        href={`?${new URLSearchParams({ ...params, page: (currentPage + 1).toString() }).toString()}`}
                        className={cn("p-sm rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm", currentPage === totalPages && "pointer-events-none opacity-50")}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </main>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
