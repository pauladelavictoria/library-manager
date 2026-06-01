import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { createClient } from "@/supabase/server";

export async function Footer() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="invert-block mt-16">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 items-start">
          <div className="space-y-6">
            <Link href="/">
              <Logo className="h-8 w-[54px]" color="#F5F0E8" />
            </Link>
            <p className="body-sans opacity-70 max-w-[28ch]">
              Donde los mundos imaginarios cobran vida. Pasión por la lectura, en papel y en pantalla.
            </p>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Instagram className="h-4 w-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background text-foreground border-ink body-sans px-3 py-2">
                    Librería Éter no existe... todavia.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Facebook className="h-4 w-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background text-foreground border-ink body-sans px-3 py-2">
                    Preferimos el papel fisico.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div>
            <h4 className="label-sans mb-6 opacity-100">Navegación</h4>
            <ul className="space-y-3 label-mono">
              <li><Link href="/" className="hover:opacity-70 transition-opacity">Inicio</Link></li>
              <li><Link href="/books" className="hover:opacity-70 transition-opacity">Catalogo</Link></li>
              <li><Link href="/trivial" className="hover:opacity-70 transition-opacity">Trivial</Link></li>
              <li><Link href="/dashboard" className="hover:opacity-70 transition-opacity">Mi perfil</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label-sans mb-6 opacity-100">Horario</h4>
            <ul className="space-y-3 label-mono">
              <li>Lun - Sab: 10:00 - 21:00</li>
              <li>Domingos: cerrado</li>
              <li className="pt-2">hola@libreriaeter.com</li>
              <li>Calle del Olvido s/n, Macondo</li>
            </ul>
          </div>

          <div>
            <h4 className="label-sans mb-6 opacity-100">Club de lectura</h4>
            <p className="label-mono mb-6 opacity-70">Novedades semanales y eventos exclusivos.</p>
            {!user && (
              <Link href="/register" className="btn-outline" style={{ color: "hsl(var(--background))", borderColor: "hsl(var(--background))" }}>
                Registrarme
              </Link>
            )}
          </div>
        </div>

        <div className="border-soft-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="label-mono opacity-50">© {currentYear} Librería Éter. Todos los derechos imaginados.</p>
          <p className="label-mono opacity-50">Hecho por amantes de los libros</p>
        </div>
      </div>
    </footer>
  );
}
