"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveQuizScore(score: number, total: number) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "No autenticado", code: "AUTH_REQUIRED" };
    }

    const { error } = await supabase
      .from("quiz_scores")
      .insert({
        user_id: user.id,
        score: score,
        total_questions: total,
      });

    if (error) throw error;

    revalidatePath("/profile");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving quiz score:", error);
    return { success: false, error: error.message };
  }
}
