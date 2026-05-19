"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createEvent(data: {
  title: string;
  description: string;
  location: string;
  event_date: string;
  type: string;
  image_url?: string;
}) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase
      .from("events")
      .insert({
        title: data.title,
        description: data.description,
        location: data.location,
        event_date: data.event_date,
        type: data.type,
        image_url: data.image_url,
      });

    if (error) throw error;

    revalidatePath("/inventory");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEvent(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/inventory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateEvent(id: string, data: {
  title?: string;
  description?: string;
  location?: string;
  event_date?: string;
  type?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No autenticado");

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) throw new Error("No autorizado");

    const { error } = await supabase.from("events").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/inventory");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function sendBookingEmail(data: {
  email: string;
  name: string;
  eventTitle: string;
  eventDate: string;
  location?: string;
}) {



  // Simulación de envío de correo electrónico
  console.log("-----------------------------------------");
  console.log("📧 SIMULACIÓN DE ENVÍO DE EMAIL");
  console.log(`Para: ${data.name} <${data.email}>`);
  console.log(`Asunto: Confirmación de reserva: ${data.eventTitle}`);
  console.log(`Mensaje: Hola ${data.name}, tu plaza para "${data.eventTitle}" el ${data.eventDate} en ${data.location || "la librería"} ha sido confirmada.`);
  console.log("-----------------------------------------");

  await new Promise(resolve => setTimeout(resolve, 800));

  return { success: true };
}
