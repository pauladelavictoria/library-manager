"use client";

import { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-8">

        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Cookie className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight">Preferencias de Cookies</h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <p className="text-sm font-medium text-slate-600">
            Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y recordar tus preferencias. Al aceptar, nos ayudas a ofrecerte un servicio más personalizado y eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-8">
            <Button
              variant="default"
              onClick={handleAccept}
            >
              Aceptar Todo
            </Button>
            <Button
              variant="ghost"
              onClick={handleDecline}
            >
              Solo Necesarias
            </Button>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
            <ShieldCheck className="h-3 w-3" />
            <span>Navegación Segura y Privada</span>
          </div>
        </div>
      </div>
    </div>
  );
}
