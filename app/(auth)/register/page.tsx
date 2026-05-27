import type { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Registro",
  description: "Crea una nueva cuenta",
};

export default function SignupPage() {
  return (
    <div className="hero-container">
      <div className="space-y-2 bg-background rounded-2xl w-full max-w-md mx-auto p-lg">
        <h1 className="text-2xl font-serif tracking-tight">
          Crear una cuenta
        </h1>
        <p className="text-sm text-muted-foreground">
          Regístrate para comenzar
        </p>
        <RegisterForm />
      </div>
      <p className="text-center text-sm mt-lg">
        Al continuar, aceptas nuestros <a href="/terms">términos de servicio</a> y <a href="/privacy">política de privacidad</a>.
      </p>
    </div>
  );
}
