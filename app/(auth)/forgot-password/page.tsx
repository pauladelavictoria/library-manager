"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNotification } from "@/lib/notification-context";

const schema = z.object({
  email: z.string().email({ message: "Formato de email inválido" }),
});

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const { notify } = useNotification();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    startTransition(async () => {
      const result = await forgotPassword(values.email);
      if (result.error) {
        notify({ type: "error", title: "Error", message: result.error });
        return;
      }
      setSent(true);
    });
  }

  return (
    <div className="hero-container">
      <div className="space-y-2 bg-background rounded-none w-full max-w-md mx-auto p-lg mb-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-serif tracking-tight">
            Recuperar contraseña
          </h1>
          <p className="text-sm">
            {sent
              ? "Revisa tu correo y sigue el enlace para restablecer tu contraseña."
              : "Ingresa tu email y te enviaremos un enlace de recuperación."}
          </p>
        </div>

        {!sent && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@mail.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? (
                  <div className="flex items-center justify-center gap-1">
                    <Icons.spinner className="mr-sm h-4 w-4 animate-spin" />
                    <span>Enviando...</span>
                  </div>
                ) : (
                  "Enviar enlace"
                )}
              </Button>
            </form>
          </Form>
        )}

        <div className="flex gap-2 items-center justify-center pt-2">
          <Button variant="ghost">
            <Link href="/login">Volver al inicio de sesión</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
