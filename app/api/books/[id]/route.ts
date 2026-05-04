import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: book, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching book:", error);
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err: any) {
    console.error("Unexpected error fetching book:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
