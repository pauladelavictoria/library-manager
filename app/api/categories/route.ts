import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
      .from("categories")
      .select("name")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories from database:", error);
      throw error;
    }

    const categoryNames = categories ? categories.map((c) => c.name) : [];

    return NextResponse.json({ data: categoryNames });
  } catch (error: any) {
    console.error("Unexpected error fetching categories:", error);
    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }
}
