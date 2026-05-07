import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", new Date().toISOString()) // Solo eventos futuros
      .order("event_date", { ascending: true })
      .limit(4);

    if (error) throw error;

    return NextResponse.json({ data: events });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }
}
