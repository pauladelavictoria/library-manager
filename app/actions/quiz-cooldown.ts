"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function setQuizCooldown() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "No autenticado" };

    const { error } = await supabase
      .from("profiles")
      .update({ last_quiz_attempt: new Date().toISOString() })
      .eq("id", user.id);

    if (error) throw error;

    revalidatePath("/trivial");
    return { success: true };
  } catch (error: any) {
    console.error("Error setting quiz cooldown:", error);
    return { success: false, error: error.message };
  }
}
