import type { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Registro",
  description: "Crea una nueva cuenta",
};

export default function SignupPage() {
  return (
    <div className="p-xl bg-[url(/images/background.jpg)] bg-cover">
      <div className="space-y-2 bg-background rounded-lg w-full max-w-md mx-auto p-lg">
        <h1 className="text-2xl font-semibold tracking-tight">
          Crear una cuenta
        </h1>
        <p className="text-sm text-muted-foreground">
          Regístrate para comenzar
        </p>
        <RegisterForm />
      </div>
      <p className="px-lg text-center text-sm text-muted-foreground">
        Al continuar, aceptas nuestros términos de servicio y política de privacidad.
      </p>
    </div>
  );
}
