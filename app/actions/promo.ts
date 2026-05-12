"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPromoCode(formData: {
  code: string;
  discount_amount: number;
  expiry_date: string;
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
