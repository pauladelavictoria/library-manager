import type { Metadata } from "next";
import LoginForm from "./login-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión para entrar en tu cuenta",
};

export default function LoginPage() {

  return (
    <div className="hero-container">
      <div className="space-y-2 bg-background rounded-2xl w-full max-w-md mx-auto p-lg mb-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-serif tracking-tight">
            Bienvenida
          </h1>
          <p className="text-sm">
            Inicia sesión para entrar en tu cuenta
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
