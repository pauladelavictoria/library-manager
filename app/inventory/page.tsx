import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { Book, Tag as TagIcon, CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Book as BookType } from "@/lib/types";
import { getPromoPerformance } from "@/app/actions/promo";
import { getBooks } from "@/app/actions/books";

import { CatalogTab } from "@/components/inventory/catalog-tab";
import { PromoTab } from "@/components/inventory/promo-tab";
import { EventsTab } from "@/components/inventory/events-tab";

export const metadata = {
  title: "Gestión | Librería Éter",
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

  if (!profile?.is_admin) redirect("/");

  const sortByMap: Record<string, "title" | "sales" | "stock" | "price" | "created_at"> = {
    sales: "sales",
    stock: "stock",
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
    sortOrder: params.sort === "stock" ? "asc" : "desc",
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

  const { data: topSellers } = await getBooks({ limit: 10, sortBy: "sales", sortOrder: "desc" });
  const sortedBestSellers = (topSellers || []) as BookType[];
  const recommendedCount = paginatedBooks.filter(b => (b as BookType & { is_recommended?: boolean }).is_recommended).length;

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
    if (dailyData[label] !== undefined) dailyData[label] += Number(order.total_amount);
  });

  const salesChartData = Object.entries(dailyData).map(([date, amount]) => ({
    date,
    amount: Number(amount.toFixed(2)),
  }));

  const { data: promoStatsResult } = await getPromoPerformance();
  const promoPerformance = promoStatsResult || [];
  const totalDiscountGiven = promoPerformance.reduce((sum, p) => sum + (p.total_discount || 0), 0);
  const activePromosCount = promoPerformance.filter(p => p.isActive).length;

  const { data: allEvents } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  const { data: allBookings } = await supabase.from("event_bookings").select("event_id");

  const eventPerformance = (allEvents || []).reverse().map(event => ({
    ...event,
    attendees: (allBookings || []).filter(b => b.event_id === event.id).length,
    isPast: new Date(event.event_date) < new Date(),
  }));

  return (
    <main className="page-container py-12">
      <div className="mb-8">
        <h1 className="display-lg">Gestión</h1>
      </div>

      <Tabs defaultValue="catalog" className="w-full">
        <TabsList className="border-ink-b w-full justify-start gap-0 rounded-none bg-transparent h-auto p-0">
          <TabsTrigger value="catalog" className="rounded-none border-r border-foreground/15 px-6 py-3 label-sans data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=inactive]:bg-transparent">
            <Book className="h-3.5 w-3.5 mr-2" />
            Catálogo
          </TabsTrigger>
          <TabsTrigger value="marketing" className="rounded-none border-r border-foreground/15 px-6 py-3 label-sans data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=inactive]:bg-transparent">
            <TagIcon className="h-3.5 w-3.5 mr-2" />
            Promociones
          </TabsTrigger>
          <TabsTrigger value="events" className="rounded-none px-6 py-3 label-sans data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=inactive]:bg-transparent">
            <CalendarDays className="h-3.5 w-3.5 mr-2" />
            Agenda
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <CatalogTab
            paginatedBooks={paginatedBooks}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            totalPages={totalPages}
            recommendedCount={recommendedCount}
            filterOptions={{ authors: filterOptions.authors, categories: filterOptions.categories }}
            params={params}
            salesChartData={salesChartData}
            sortedBestSellers={sortedBestSellers}
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
    </main>
  );
}
