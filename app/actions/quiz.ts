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

    const { data, error } = await supabase
      .from("quiz_scores")
      .insert({
        user_id: user.id,
        score: score,
        total_questions: total,
      })
      .select("id")
      .single();

    if (error) throw error;

    revalidatePath("/dashboard");
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error("Error saving quiz score:", error);
    return { success: false, error: error.message };
  }
}

export async function updateQuizScore(id: string, score: number) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("quiz_scores")
      .update({ score: score })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating quiz score:", error);
    return { success: false, error: error.message };
  }
}
