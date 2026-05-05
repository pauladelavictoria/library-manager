"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: { full_name: string; phone: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: formData.full_name,
      phone: formData.phone,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Error al actualizar el perfil" };
  }

  await supabase.auth.updateUser({
    data: {
      full_name: formData.full_name,
      phone: formData.phone
    }
  });

  revalidatePath("/dashboard");
  return { success: true };
}
