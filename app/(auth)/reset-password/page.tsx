"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useNotification } from "@/lib/notification-context";
import { createClient } from "@/supabase/client";

const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Mínimo 8 caracteres" })
      .regex(/\d/, { message: "Debe incluir al menos un número" }),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { notify } = useNotification();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        notify({ type: "error", title: "Error", message: error.message });
        return;
      }

      notify({
        type: "success",
        title: "Contraseña actualizada",
        message: "Ya puedes iniciar sesión con tu nueva contraseña.",
      });
      router.push("/login");
    });
  }

  return (
    <div className="hero-container">
      <div className="space-y-2 bg-background rounded-none w-full max-w-md mx-auto p-lg mb-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-serif tracking-tight">
            Nueva contraseña
          </h1>
          <p className="text-sm">Elige una contraseña segura para tu cuenta.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-1">
                  <Icons.spinner className="mr-sm h-4 w-4 animate-spin" />
                  <span>Guardando...</span>
                </div>
              ) : (
                "Guardar contraseña"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
