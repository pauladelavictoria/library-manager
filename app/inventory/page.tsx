import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, Book, Tag as TagIcon, CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Book as BookType } from "@/lib/types";
import { getPromoPerformance } from "@/app/actions/promo";
import { getBooks } from "@/app/actions/books";

import { DashboardTab } from "@/components/inventory/dashboard-tab";
import { CatalogTab } from "@/components/inventory/catalog-tab";
import { PromoTab } from "@/components/inventory/promo-tab";
import { EventsTab } from "@/components/inventory/events-tab";

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
            <DashboardTab
              salesChartData={salesChartData}
              sortedBestSellers={sortedBestSellers}
              category={params.category}
              author={params.author}
            />
          </TabsContent>

          <TabsContent value="catalog">
            <CatalogTab
              paginatedBooks={paginatedBooks}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              totalPages={totalPages}
              recommendedCount={recommendedCount}
              filterOptions={{
                authors: filterOptions.authors,
                categories: filterOptions.categories,
              }}
              params={params}
            />
          </TabsContent>

          <TabsContent value="marketing">
            <PromoTab
              promoPerformance={promoPerformance}
              totalDiscountGiven={totalDiscountGiven}
              activePromosCount={activePromosCount}
            />
          </TabsContent>

          <TabsContent value="events">
            <EventsTab eventPerformance={eventPerformance} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
