import { createClient } from "@/supabase/server";
import { ShoppingBag, BookOpen, Calendar, Tag, Trophy, HelpCircle, Star, Gift } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/profile-card";
import { toTitleCase } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <main className="page-container py-12">
      <div className="mb-8">
        <h1 className="display-lg">Mi perfil</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-0 border-soft overflow-hidden">
        {/* Left column */}
        <div className="lg:col-span-1 lg:border-r border-foreground/15">
          <Suspense fallback={<div className="p-8 animate-pulse h-64 bg-card" />}>
            <UserData />
          </Suspense>
          <Suspense fallback={<div className="p-8 animate-pulse h-48 bg-card border-soft-t" />}>
            <TriviaStats />
          </Suspense>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-foreground/15">
            <ShoppingBag className="h-3.5 w-3.5 text-foreground/30" />
            <span className="label-sans">Compras recientes</span>
          </div>
          <Suspense fallback={<div className="p-8 animate-pulse h-40 bg-card" />}>
            <UserOrders />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function UserData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return <ProfileCard profile={profile} user={user} />;
}

async function TriviaStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: scores } = await supabase.from("quiz_scores").select("*").eq("user_id", user.id);
  const perfectGames = (scores || []).filter(s => s.score === s.total_questions).length;
  const totalPoints = perfectGames * 10;
  const progress = Math.min(100, (totalPoints / 100) * 100);
  const rewardReached = totalPoints >= 100;

  let rewardCode = "";
  if (rewardReached) {
    const potentialCode = `TRIVIA3-${user.id.slice(0, 5).toUpperCase()}`;
    const { data: existingPromo } = await supabase.from("promo_codes").select("code").eq("code", potentialCode).single();
    if (existingPromo) {
      rewardCode = existingPromo.code;
    } else {
      const { error } = await supabase.from("promo_codes").insert({
        code: potentialCode, discount_amount: 3.00,
        expiry_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(), is_one_time: true,
      });
      if (!error) rewardCode = potentialCode;
    }
  }

  return (
    <div className="border-soft-t" style={{ backgroundColor: "#0F0F0D" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(245,240,232,0.15)" }}>
        <div className="flex items-center gap-2">
          <Trophy className="h-3.5 w-3.5" style={{ color: "rgba(245,240,232,0.65)" }} />
          <span className="label-sans" style={{ color: "rgba(245,240,232,0.8)" }}>Rango literario</span>
        </div>
        <span className="font-mono font-black text-lg" style={{ color: "#F5F0E8" }}>{totalPoints}</span>
      </div>

      {/* Progress */}
      <div className="px-6 py-5">
        <div className="flex justify-between mb-3">
          <span className="label-mono" style={{ color: "rgba(245,240,232,0.65)" }}>Progreso al premio</span>
          <span className="label-mono" style={{ color: "rgba(245,240,232,0.65)" }}>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full" style={{ backgroundColor: "rgba(245,240,232,0.15)" }}>
          <div
            className="h-full transition-all duration-1000"
            style={{ width: `${progress}%`, backgroundColor: rewardReached ? "#F5F0E8" : "rgba(245,240,232,0.55)" }}
          />
        </div>
      </div>

      {/* Reward or hint */}
      {rewardReached ? (
        <div className="mx-6 mb-5 p-4" style={{ backgroundColor: "rgba(245,240,232,0.1)", border: "1px solid rgba(245,240,232,0.3)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Gift className="h-3.5 w-3.5" style={{ color: "rgba(245,240,232,0.7)" }} />
            <span className="label-sans" style={{ color: "rgba(245,240,232,0.8)" }}>Premio desbloqueado</span>
          </div>
          <p className="font-mono font-black text-2xl tracking-widest" style={{ color: "#F5F0E8" }}>{rewardCode}</p>
          <p className="label-mono mt-1" style={{ color: "rgba(245,240,232,0.65)" }}>Cupon de 3€ — un solo uso</p>
        </div>
      ) : (
        <div className="mx-6 mb-5 flex items-start gap-3">
          <HelpCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: "rgba(245,240,232,0.55)" }} />
          <p className="label-mono" style={{ color: "rgba(245,240,232,0.65)" }}>
            10 puntos por partida perfecta. 100 puntos = cupon de 3€.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="px-6 pb-6">
        <Link
          href="/trivial"
          className="flex items-center justify-center gap-2 w-full py-3 label-sans transition-colors"
          style={{ backgroundColor: "rgba(245,240,232,0.1)", color: "#F5F0E8", border: "1px solid rgba(245,240,232,0.3)" }}
        >
          <Star className="h-3.5 w-3.5" />
          Jugar al trivial
        </Link>
      </div>
    </div>
  );
}

async function UserOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: orders } = await supabase
    .from("orders")
    .select(`*, order_items (*)`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-8">
        <ShoppingBag className="h-8 w-8 text-foreground/20 mb-4" />
        <h3 className="display-md mb-2">Sin compras</h3>
        <p className="body-sans text-foreground/50 mb-6">Todavia no has realizado ninguna compra.</p>
        <Link href="/books" className="btn-primary">Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="border-soft-t">
          {/* Order header */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-card">
            <div className="flex items-center gap-6">
              <div>
                <p className="label-mono mb-0.5">Pedido</p>
                <p className="font-mono text-xs font-bold">#{order.id.slice(0, 8)}</p>
              </div>
              <div>
                <p className="label-mono mb-0.5">Fecha</p>
                <div className="flex items-center gap-1.5 label-mono text-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(order.created_at).toLocaleDateString("es-ES")}
                </div>
              </div>
              {order.promo_code && (
                <div>
                  <p className="label-mono mb-0.5">Cupon</p>
                  <Badge variant="outline" className="label-mono">
                    <Tag className="h-3 w-3 mr-1" />
                    {order.promo_code}
                  </Badge>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="label-mono mb-0.5">Total</p>
              <p className="price-mono text-lg">€{order.total_amount.toFixed(2)}</p>
            </div>
          </div>

          {/* Order items */}
          <div>
            {order.order_items.map((item: any) => (
              <div key={item.id} className="flex gap-4 px-6 py-4 border-soft-t group">
                <div className="w-12 h-16 overflow-hidden shrink-0">
                  {item.cover_url ? (
                    <img src={item.cover_url} alt={toTitleCase(item.title)} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-card flex items-center justify-center label-mono text-[8px]">N/A</div>
                  )}
                </div>
                <div className="flex-1 flex items-start justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <h4 className="display-md line-clamp-1">{toTitleCase(item.title)}</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {item.categories?.map((cat: string) => (
                        <span key={cat} className="label-mono border-soft px-1.5 py-0.5">{cat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="price-mono">€{item.price_at_purchase.toFixed(2)}</p>
                    <p className="label-mono mt-0.5">Cant: {item.quantity}</p>
                    <Link href={`/books/${item.book_id}`} className="btn-ghost mt-2 inline-flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> Ver
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
