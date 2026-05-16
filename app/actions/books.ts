"use server";

import { Book } from "@/lib/types";
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
export async function getBooks(params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  author?: string;
  publisher?: string;
  sortBy?: "title" | "price" | "stock" | "sales" | "created_at";
  sortOrder?: "asc" | "desc";
}) {
  try {
    const supabase = await createClient();
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("books_with_stats")
      .select("*", { count: "exact" });

    if (params.search) {
      query = query.or(`title.ilike.%${params.search}%,isbn.ilike.%${params.search}%`);
    }
    if (params.category && params.category !== "Todas") {
      query = query.contains("categories", [params.category]);
    }
    if (params.author && params.author !== "Todos") {
      query = query.contains("authors", [params.author]);
    }
    if (params.publisher && params.publisher !== "Todos") {
      query = query.eq("publisher", params.publisher);
    }

    const sortColumnMap: Record<string, string> = {
      title: "title",
      price: "selling_price",
      stock: "stock_quantity",
      sales: "sold_count",
      created_at: "created_at",
    };

    const sortBy = sortColumnMap[params.sortBy || "title"] || "title";
    const ascending = params.sortOrder === "asc";

    query = query.order(sortBy, { ascending });

    query = query.range(offset, offset + limit - 1);

    const { data: books, error, count } = await query;

    if (error) throw error;

    return {
      success: true,
      data: books as Book[],
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    };
  } catch (error: any) {
    console.error("Error in getBooks:", error);
    return { success: false, error: error.message };
  }
}

export async function getRecommendedBooks() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("books_with_stats")
      .select("*")
      .eq("is_recommended", true)
      .limit(3);

    if (error) throw error;
    return { success: true, data: data as Book[] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleRecommendation(bookId: string) {
  try {
    const supabase = await createClient();

    const { count, error: countError } = await supabase
      .from("books")
      .select("*", { count: "exact", head: true })
      .eq("is_recommended", true);

    if (countError) throw countError;

    const { data: book, error: bookError } = await supabase
      .from("books")
      .select("is_recommended")
      .eq("id", bookId)
      .single();

    if (bookError) throw bookError;

    const newState = !book.is_recommended;

    if (newState && (count || 0) >= 3) {
      throw new Error("Ya tienes 3 recomendaciones seleccionadas. Desmarca una primero.");
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("books")
      .update({ is_recommended: newState })
      .eq("id", bookId)
      .select();

    if (updateError) {
      console.error("Update Error:", updateError);
      throw updateError;
    }

    if (!updatedData || updatedData.length === 0) {
      console.error("No rows were updated. Check RLS policies or if the book ID exists.");
      throw new Error("No se pudo actualizar el libro. Es posible que no tengas permisos suficientes.");
    }

    console.log("Successfully updated book recommendation state:", updatedData[0]);

    revalidatePath("/admin/inventory");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
