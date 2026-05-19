
import Link from "next/link";
import { Facebook, Instagram, Heart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-background p-lg">
      <div className="container mx-auto px-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-md">
          <div className="space-y-6">
            <Link href="/">
              <p className="text-2xl">Librería Éter</p>
            </Link>
            <p className="text-sm">
              Donde los mundos imaginarios cobran vida. Aunque esta librería sea un sueño digital, nuestra pasión por la lectura es real.
            </p>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Instagram className="h-5 w-5 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-slate-700 text-white font-medium">
                    No hay enlace... ¡Librería Éter es tan exclusiva que no existe! 🌌
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Facebook className="h-5 w-5 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-slate-700 text-white font-medium">
                    Todavía no estamos en FB, preferimos el papel físico. 📖
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs mb-lg">Navegación</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:underline">Inicio</Link></li>
              <li><Link href="/books" className="hover:underline">Catálogo Completo</Link></li>
              <li><Link href="/trivial" className="hover:underline">Desafío Trivial</Link></li>
              <li><Link href="/dashboard" className="hover:underline">Mi Perfil</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-lg">Información</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div>
                  <p className="font-medium">Horario de Ensueño</p>
                  <p className="text-xs">Lunes a Sábado: 10:00 - 21:00</p>
                  <p className="text-xs italic text-slate-500">Domingos: Solo lectura en la cama</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="hover: transition-colors">hola@libreriaeter.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span>Calle del Olvido s/n, Macondo</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/30 p-lg rounded-3xl border border-slate-800">
            <h4 className="font-bold mb-sm">¿Buscas algo especial?</h4>
            <p className="text-xs mb-lg text-slate-500">Únete a nuestro club de lectura y recibe novedades semanales.</p>
            <Link href="/register">
              <Button variant="ghost">
                Registrarme Gratis
              </Button>
            </Link>
          </div>
        </div>

        <div className="pt-lg border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-tighter">
          <p>© {currentYear} Librería Éter. Todos los derechos imaginados.</p>
          <div className="flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-red-500 fill-current" /> por amantes de los libros
          </div>
        </div>
      </div>
    </footer>
  );
}
