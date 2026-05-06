import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { Package2, AlertTriangle, ArrowLeft, MoreVertical, Trophy, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { InventoryFilters } from "@/components/admin/inventory-filters";
import { SalesChart } from "@/components/admin/sales-chart";


export const metadata = {
  title: "Gestión de Inventario | Admin",
  description: "Panel de control para la gestión de libros y stock.",
};

export default async function AdminInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; author?: string; category?: string; publisher?: string; period?: "week" | "month" }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

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

  const { data: allBooks, error } = await supabase
    .from("books")
    .select("*")
    .order("title", { ascending: true });

  if (error) console.error("Error fetching books:", error);

  const filteredBooks = (allBooks || []).filter(book => {
    const matchesSearch = !params.q ||
      book.title.toLowerCase().includes(params.q.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(params.q.toLowerCase());

    const matchesCategory = !params.category ||
      book.categories?.includes(params.category);

    const matchesAuthor = !params.author ||
      book.authors?.includes(params.author);

    const matchesPublisher = !params.publisher ||
      book.publisher === params.publisher;

    return matchesSearch && matchesCategory && matchesAuthor && matchesPublisher;
  });

  const getAvailableOptions = (excludeFilter: string) => {
    const booksMatchingOthers = (allBooks || []).filter(book => {
      const matchesSearch = !params.q ||
        book.title.toLowerCase().includes(params.q.toLowerCase()) ||
        book.isbn?.toLowerCase().includes(params.q.toLowerCase());

      const matchesCategory = excludeFilter === 'category' || !params.category ||
        book.categories?.includes(params.category);

      const matchesAuthor = excludeFilter === 'author' || !params.author ||
        book.authors?.includes(params.author);

      const matchesPublisher = excludeFilter === 'publisher' || !params.publisher ||
        book.publisher === params.publisher;

      return matchesSearch && matchesCategory && matchesAuthor && matchesPublisher;
    });

    return booksMatchingOthers;
  };

  const { data: allSoldItems } = await supabase.from("order_items").select("book_id");
  const soldBooksIds = new Set((allSoldItems || []).map(item => item.book_id).filter(Boolean));
  const soldBooks = (allBooks || []).filter(b => soldBooksIds.has(b.id));

  const filterOptions = {
    authors: Array.from(new Set(soldBooks.flatMap(b => b.authors || []))).sort(),
    categories: Array.from(new Set(soldBooks.flatMap(b => b.categories || []))).sort(),
    publishers: Array.from(new Set(soldBooks.map(b => b.publisher).filter(Boolean))).sort() as string[],
  };

  let bestSellersQuery = supabase
    .from("order_items")
    .select("title, quantity, cover_url, book_id, categories");

  if (params.category && params.category !== "Todas") {
    bestSellersQuery = bestSellersQuery.contains("categories", [params.category]);
  }

  const { data: bestSellers } = await bestSellersQuery;

  let filteredBestSellersData = bestSellers || [];
  if (params.author && params.author !== "Todos") {
    const booksByAuthor = (allBooks || []).filter(b => b.authors?.includes(params.author as string));
    const bookTitlesByAuthor = new Set(booksByAuthor.map(b => b.title));
    filteredBestSellersData = filteredBestSellersData.filter(item => bookTitlesByAuthor.has(item.title));
  }

  const salesMap: { [key: string]: { total: number, cover_url: string } } = {};
  filteredBestSellersData.forEach(item => {
    if (!salesMap[item.title]) salesMap[item.title] = { total: 0, cover_url: item.cover_url || "" };
    salesMap[item.title].total += item.quantity;
  });

  const sortedBestSellers = Object.entries(salesMap)
    .map(([title, data]) => ({ title, ...data }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

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

  // --- Promo Code Performance Metrics ---
  const { data: allOrders } = await supabase
    .from("orders")
    .select("id, promo_code, total_amount");
  const { data: allPromoCodes } = await supabase
    .from("promo_codes")
    .select("*");
  const { data: allOrderItems } = await supabase
    .from("order_items")
    .select("order_id, price_at_purchase, quantity");

  const promoPerformance = (allPromoCodes || []).map(promo => {
    const usages = (allOrders || []).filter(o => o.promo_code === promo.code);
    const count = usages.length;

    // Calculate original subtotal for these orders to find the discount given
    let totalDiscount = 0;
    let totalRevenue = 0;

    usages.forEach(order => {
      const items = (allOrderItems || []).filter(item => item.order_id === order.id);
      const subtotal = items.reduce((sum, item) => sum + (Number(item.price_at_purchase) * item.quantity), 0);
      const discount = subtotal - Number(order.total_amount);
      totalDiscount += Math.max(0, discount);
      totalRevenue += Number(order.total_amount);
    });

    return {
      code: promo.code,
      discount_pct: promo.discount_amount,
      count,
      totalDiscount,
      totalRevenue,
      isActive: new Date(promo.expiry_date) > new Date()
    };
  }).sort((a, b) => b.count - a.count);

  const totalDiscountGiven = promoPerformance.reduce((sum, p) => sum + p.totalDiscount, 0);
  const activePromosCount = (allPromoCodes || []).filter(p => new Date(p.expiry_date) > new Date()).length;

  const lowStockBooks = (allBooks || []).filter(book => (book.stock_quantity || 0) < 5);
  const maxSales = Math.max(...sortedBestSellers.map(s => s.total), 1);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Package2 className="h-4 w-4" />
              <span>Administración</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Gestión de la Librería</h1>
            <p className="text-slate-500 dark:text-slate-400">Supervisa el rendimiento y gestiona el inventario.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="rounded-xl">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Panel
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SalesChart data={salesChartData} />

          <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Libros Más Vendidos
                    </CardTitle>
                    <CardDescription className="font-medium">
                      {params.category && params.category !== "Todas" ? `Top ventas en ${params.category}` :
                        params.author && params.author !== "Todos" ? `Top ventas de ${params.author}` :
                          "Top 5 títulos con mayor número de ventas generales."}
                    </CardDescription>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
                  <InventoryFilters
                    authors={filterOptions.authors}
                    categories={filterOptions.categories}
                    publishers={filterOptions.publishers}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-8">
              {sortedBestSellers.length > 0 ? (
                <div className="space-y-6">
                  {sortedBestSellers.map((seller, index) => (
                    <div key={seller.title} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-400 w-4">#{index + 1}</span>
                          <span className="text-sm font-bold truncate max-w-[200px] sm:max-w-[400px]">{seller.title}</span>
                        </div>
                        <span className="text-xs font-black text-primary uppercase tracking-wider">{seller.total} vendidos</span>
                      </div>
                      <div className="relative h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(seller.total / maxSales) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                  <Trophy className="h-12 w-12 text-slate-300 mb-3" />
                  <p className="text-slate-500 font-medium">No hay ventas registradas para este filtro</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 rounded-[2rem] border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 shadow-xl shadow-red-500/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-6 w-6" />
                <div>
                  <CardTitle className="text-xl font-bold">Alerta de Reposición</CardTitle>
                  <CardDescription className="font-medium text-red-600/70 dark:text-red-400/70">
                    Menos de 5 ejemplares.
                  </CardDescription>
                </div>
              </div>
              <Badge variant="destructive" className="rounded-full px-4 py-1 font-black">
                {lowStockBooks.length} CRÍTICOS
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lowStockBooks.length > 0 ? (
                  lowStockBooks.slice(0, 4).map((book) => (
                    <div key={book.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/50 shadow-sm">
                      <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 shadow-inner">
                        {book.cover_url ? (
                          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">No img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm line-clamp-1">{book.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black text-red-600">Stock: {book.stock_quantity}</span>
                          <Button size="sm" variant="ghost" className="h-6 text-[10px] font-bold text-primary p-0">
                            PEDIR
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-red-200 dark:border-red-800">
                    <p className="text-sm font-bold text-slate-500">Todo el stock está al día</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Estado General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <p className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-widest text-[10px]">Total Títulos</p>
                <p className="text-3xl font-black text-primary">{allBooks?.length || 0}</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-widest text-[10px]">Stock Saludable</p>
                <p className="text-3xl font-black text-emerald-500">{(allBooks?.length || 0) - lowStockBooks.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promo Code Performance */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight">Rendimiento de Promociones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg bg-emerald-500/5 border-emerald-500/10">
              <CardHeader className="pb-2">
                <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Ahorro Total Clientes</CardDescription>
                <CardTitle className="text-3xl font-black text-emerald-600 dark:text-emerald-400">€{totalDiscountGiven.toFixed(2)}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Cupones Activos</CardDescription>
                <CardTitle className="text-3xl font-black">{activePromosCount}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Pedidos con Cupón</CardDescription>
                <CardTitle className="text-3xl font-black">{promoPerformance.reduce((sum, p) => sum + p.count, 0)}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Ingresos vía Promo</CardDescription>
                <CardTitle className="text-3xl font-black text-primary">€{promoPerformance.reduce((sum, p) => sum + p.totalRevenue, 0).toFixed(2)}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                  <TableHead className="pl-8 font-bold uppercase text-[10px] tracking-widest text-slate-400 py-6">Código</TableHead>
                  <TableHead className="font-bold uppercase text-[10px] tracking-widest text-slate-400">Descuento</TableHead>
                  <TableHead className="font-bold uppercase text-[10px] tracking-widest text-slate-400">Usos</TableHead>
                  <TableHead className="font-bold uppercase text-[10px] tracking-widest text-slate-400">Total Descontado</TableHead>
                  <TableHead className="pr-8 text-right font-bold uppercase text-[10px] tracking-widest text-slate-400">Ingresos (Neto)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promoPerformance.map((promo) => (
                  <TableRow key={promo.code} className="group border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <TableCell className="pl-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Tag className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-black tracking-tight">{promo.code}</p>
                          <div className="flex items-center gap-1.5">
                            <div className={cn("h-1.5 w-1.5 rounded-full", promo.isActive ? "bg-emerald-500" : "bg-slate-300")} />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                              {promo.isActive ? "Activo" : "Caducado"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-md font-black border-primary/20 text-primary bg-primary/5">
                        -{promo.discount_pct}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-slate-600 dark:text-slate-400">{promo.count}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-red-600 dark:text-red-400/80">-€{promo.totalDiscount.toFixed(2)}</p>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <p className="font-black text-lg tracking-tight">€{promo.totalRevenue.toFixed(2)}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <main className="w-full">
          <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 bg-white dark:bg-slate-900 px-8 py-8">
              <div>
                <CardTitle className="text-3xl font-black">Catálogo de Inventario</CardTitle>
                <CardDescription className="font-medium">Gestión total de los libros y existencias de la librería.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 hidden">
                <InventoryFilters
                  authors={filterOptions.authors}
                  categories={filterOptions.categories}
                  publishers={filterOptions.publishers}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                    <TableHead className="pl-8 font-bold uppercase text-[10px] tracking-widest text-slate-400 py-6">Libro</TableHead>
                    <TableHead className="font-bold uppercase text-[10px] tracking-widest text-slate-400">Stock</TableHead>
                    <TableHead className="font-bold uppercase text-[10px] tracking-widest text-slate-400">Precio</TableHead>
                    <TableHead className="pr-8 text-right font-bold uppercase text-[10px] tracking-widest text-slate-400">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book) => (
                    <TableRow key={book.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-50 dark:border-slate-800 transition-colors">
                      <TableCell className="pl-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm border border-slate-100 dark:border-slate-800">
                            {book.cover_url ? (
                              <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px]">No img</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">{book.title}</p>
                            <p className="text-sm text-slate-400 truncate max-w-[200px]">{book.isbn}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-black text-lg",
                            (book.stock_quantity || 0) < 5 ? "text-red-600" : "text-slate-700 dark:text-slate-300"
                          )}>
                            {book.stock_quantity}
                          </span>
                          {(book.stock_quantity || 0) < 5 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-base text-slate-600 dark:text-slate-400">
                        €{book.selling_price || '0.00'}
                      </TableCell>
                      <TableCell className="pr-8 text-right">
                        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
