import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 mx-auto">
      <div className="w-full max-w-3xl py-8 text-center">
        <div className="mb-8">
          <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Página no encontrada
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Oops! Algo salió mal. La página que estás buscando podría haber
            sido movida, eliminada o estar temporalmente no disponible. Por
            favor, verifica la URL o vuelve a la página principal. Si el problema
            persiste, contacta a soporte para obtener ayuda.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="primary">
            <Link href="/" className="inline-flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
