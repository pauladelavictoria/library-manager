"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBook(data: {
  title: string;
  author: string;
  isbn: string;
  stock_quantity: number;
  selling_price: number;
  category?: string;
  publisher?: string;
  cover_url?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase.from("books").insert(data);
    if (error) throw error;

    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateBook(id: string, data: Partial<{
  title: string;
  author: string;
  isbn: string;
  stock_quantity: number;
  selling_price: number;
  category: string;
  publisher: string;
  cover_url: string;
}>) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase.from("books").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBook(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/inventory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
