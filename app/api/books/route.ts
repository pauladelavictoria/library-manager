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
    const publisher = searchParams.get("publisher");
    
    // Ordenación
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    let query = supabase
      .from("books_with_stats")
      .select("*", { count: "exact" });

    // Filtro por categoría
    if (category && category !== "Todas") {
      query = query.contains("categories", [category]);
    }

    // Filtro por autor
    if (author && author !== "Todos") {
      query = query.contains("authors", [author]);
    }

    if (publisher && publisher !== "Todos") {
      query = query.eq("publisher", publisher);
    }

    // Búsqueda general
    if (search) {
      query = query.or(`title.ilike.%${search}%,isbn.ilike.%${search}%`);
    }

    // Ordenar
    const validSortColumns: Record<string, string> = {
      title: "title",
      price: "selling_price",
      stock: "stock_quantity",
      sales: "sold_count",
      created_at: "created_at",
    };

    const sortColumn = validSortColumns[sortBy] || "created_at";
    query = query.order(sortColumn, { ascending: sortOrder === "asc" });

    // Rango de paginación
    query = query.range(offset, offset + limit - 1);

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
