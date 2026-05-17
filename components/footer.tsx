
import Link from "next/link";
import { Facebook, Instagram, Mail, Clock, MapPin, BookOpen, Heart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:rotate-12 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">Librería Éter</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Donde los mundos imaginarios cobran vida. Aunque esta librería sea un sueño digital, nuestra pasión por la lectura es real.
            </p>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button >
                      <Instagram className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-slate-700 text-white font-medium">
                    No hay enlace... ¡Librería Éter es tan exclusiva que no existe! 🌌
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button >
                      <Facebook className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-slate-700 text-white font-medium">
                    Todavía no estamos en FB, preferimos el papel físico. 📖
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/books" className="hover:text-primary transition-colors">Catálogo Completo</Link></li>
              <li><Link href="/trivial" className="hover:text-primary transition-colors">Desafío Trivial</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Mi Perfil</Link></li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Información</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-white font-medium">Horario de Ensueño</p>
                  <p className="text-xs">Lunes a Sábado: 10:00 - 21:00</p>
                  <p className="text-xs italic text-slate-500">Domingos: Solo lectura en la cama</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="hover:text-white transition-colors">hola@libreriaeter.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Calle del Olvido s/n, Macondo</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <h4 className="text-white font-bold mb-2">¿Buscas algo especial?</h4>
            <p className="text-xs mb-6 text-slate-500">Únete a nuestro club de lectura y recibe novedades semanales.</p>
            <Link href="/register">
              <Button variant="secondary">
                Registrarme Gratis
              </Button>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-tighter">
          <p>© {currentYear} Librería Éter. Todos los derechos imaginados.</p>
          <div className="flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-red-500 fill-current" /> por amantes de los libros
          </div>
        </div>
      </div>
    </footer>
  );
}
