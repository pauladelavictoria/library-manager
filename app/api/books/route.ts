import { createClient } from "../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);

    // Paginación
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = (page - 1) * limit;

    // Filtros
    const category = searchParams.get("category");
    const author = searchParams.get("author");
    const search = searchParams.get("search");

    let query = supabase
      .from("books")
      .select("*", { count: "exact" })
      .range(offset, offset + limit - 1);

    // Filtro por categoría (buscamos si el array categories contiene el valor)
    if (category) {
      query = query.contains("categories", [category]);
    }

    // Filtro por autor (buscamos si el array authors contiene el valor)
    if (author) {
      query = query.contains("authors", [author]);
    }

    // Búsqueda general por título
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    // Ordenar por fecha de creación descendente (los más nuevos primero)
    query = query.order("created_at", { ascending: false });

    const { data: books, error, count } = await query;

    if (error) {
      console.error("Error fetching books:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: books,
      meta: {
        total: count,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    });
  } catch (err: any) {
    console.error("Unexpected error fetching books:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
