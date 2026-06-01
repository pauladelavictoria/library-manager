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
      <div className="border-ink bg-background p-lg">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="h-5 w-5" />
              <h3 className="display-md">Cookies</h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="btn-ghost py-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="body-sans text-foreground/60">
            Utilizamos cookies para mejorar tu experiencia y recordar tus preferencias.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" onClick={handleAccept}>
              Aceptar
            </Button>
            <Button variant="ghost" onClick={handleDecline}>
              Solo necesarias
            </Button>
          </div>

          <div className="flex items-center gap-2 label-mono">
            <ShieldCheck className="h-3 w-3" />
            Navegacion segura y privada
          </div>
        </div>
      </div>
    </div>
  );
}
