"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPromoCode(formData: {
  code: string;
  discount_amount: number;
  expiry_date: string;
  is_one_time?: boolean;
}) {

  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error al obtener perfil:", profileError);
      throw new Error(`Error de permisos: ${profileError.message}`);
    }

    if (!profile?.is_admin) {
      console.warn(`Usuario ${user.id} intentó crear cupón sin ser admin`);
      throw new Error("No tienes permisos de administrador para realizar esta acción");
    }

    const { error } = await supabase
      .from("promo_codes")
      .insert({
        code: formData.code.toUpperCase(),
        discount_amount: formData.discount_amount,
        expiry_date: formData.expiry_date,
        is_one_time: formData.is_one_time || false,
      });

    if (error) {
      if (error.code === "23505") throw new Error("El código ya existe");
      throw error;
    }

    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating promo code:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePromoCode(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase.from("promo_codes").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePromoCode(id: string, data: {
  discount_amount?: number;
  expiry_date?: string;
  is_one_time?: boolean;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase.from("promo_codes").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
export async function getPromoPerformance() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { data, error } = await supabase
      .from("promo_performance")
      .select("*")
      .order("usage_count", { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data: data.map(promo => ({
        ...promo,
        isActive: (new Date(promo.expiry_date) > new Date()) && (!promo.is_one_time || promo.usage_count === 0)
      }))
    };
  } catch (error: any) {
    console.error("Error in getPromoPerformance:", error);
    return { success: false, error: error.message };
  }
}
