"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function checkout(cart: any[], totalAmount: number, promoCode?: string) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Debes estar autenticado para realizar un pedido" };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      promo_code: promoCode,
      status: 'completed'
    })
    .select()
    .single();

  if (orderError) {
    return { error: "Error al procesar el pedido" };
  }

  const orderItems = cart.map((item) => ({
    order_id: order.id,
    book_id: item.id,
    title: item.title,
    quantity: item.quantity,
    price_at_purchase: item.selling_price || 0,
    cover_url: item.cover_url,
    categories: item.categories
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    return { error: "Error al procesar los detalles del pedido" };
  }

  revalidatePath("/dashboard");
  return { success: true, orderId: order.id };
}
