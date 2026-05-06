import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/server";
import { Home, ShoppingBag, BookOpen, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/profile-card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Mi Dashboard</h1>
            <p className="text-muted-foreground text-lg">Bienvenido de nuevo a tu biblioteca personal.</p>
          </div>
          <Button asChild variant="outline" className="rounded-full shadow-sm hover:shadow-md transition-all">
            <Link href="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-8">
            <Suspense fallback={<Card className="animate-pulse h-64" />}>
              <UserData />
            </Suspense>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
              Mis Compras Recientes
            </h2>
            <Suspense fallback={<div className="space-y-4"><div className="h-40 bg-slate-100 rounded-3xl animate-pulse" /></div>}>
              <UserOrders />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

async function UserData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return <ProfileCard profile={profile} user={user} />;
}

async function UserOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white/40 dark:bg-slate-900/40 rounded-[2.5rem] p-12 text-center border border-dashed border-slate-300 dark:border-slate-700">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
        <p className="text-xl font-bold text-muted-foreground">Aún no has realizado ninguna compra</p>
        <Button asChild className="mt-6 rounded-full px-8" variant="secondary">
          <Link href="/books">Ir a la tienda</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md"
        >
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pedido ID</p>
                <p className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fecha</p>
                <p className="font-bold flex items-center gap-1.5 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              {order.promo_code && (
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cupón</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0">
                    <Tag className="h-3 w-3 mr-1" />
                    {order.promo_code}
                  </Badge>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Pagado</p>
              <p className="text-2xl font-black text-primary">€{order.total_amount.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="h-24 w-16 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    {item.cover_url ? (
                      <img src={item.cover_url} alt={item.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground">N/A</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{item.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.categories?.map((cat: string) => (
                            <span key={cat} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-muted-foreground rounded-full">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold">€{item.price_at_purchase.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground font-medium mb-2">Cant: {item.quantity}</p>
                        <Button asChild variant="ghost" size="sm" className="h-8 rounded-full text-[10px] font-bold gap-1.5 hover:bg-primary/5 hover:text-primary">
                          <Link href={`/books/${item.book_id}`}>
                            <BookOpen className="h-3 w-3" />
                            Detalles
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
