"use server";

/**
 * Simulación de envío de correo electrónico de confirmación de reserva.
 * En un entorno real, aquí se integraría Resend, SendGrid o similar.
 */
export async function sendBookingEmail({ 
  email, 
  name, 
  eventTitle, 
  eventDate, 
  location 
}: { 
  email: string; 
  name: string; 
  eventTitle: string; 
  eventDate: string; 
  location: string;
}) {
  // Simulación de retraso de red
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log(`
    ============================================================
    📧 NUEVO CORREO ENVIADO (SIMULACIÓN)
    ============================================================
    PARA: ${email}
    NOMBRE: ${name}
    ASUNTO: Confirmación de tu plaza para "${eventTitle}"
    
    CONTENIDO:
    Hola ${name},
    
    ¡Gracias por tu interés! Tu reserva para el evento 
    "${eventTitle}" ha sido confirmada correctamente.
    
    DETALLES DEL EVENTO:
    📅 Fecha: ${eventDate}
    📍 Lugar: ${location}
    
    ¡Te esperamos con los libros abiertos!
    Librería Antigravity
    ============================================================
  `);

  return { success: true };
}
