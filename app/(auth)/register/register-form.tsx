"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signup } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(50, { message: "Full name can't exceed 50 characters" }),

  email: z.string().email({ message: "Invalid email format" }),

  phone: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number can't exceed 15 digits" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must include at least one number" })
    .regex(/[\W_]/, {
      message: "Password must include at least one special character",
    }),
});

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { notify } = useNotification();

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      notify({
        type: "error",
        title: "Error de registro",
        message: "No se pudo iniciar sesión con Google: " + error.message,
      });
    }
  };

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    startTransition(async () => {
      const response = await signup(values);

      if (response.error) {
        notify({ type: 'error', title: 'Error de registro', message: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
        return;
      }

      notify({ type: 'success', title: '¡Ya casi está!', message: 'Revisa tu bandeja de entrada para activar tu cuenta.' });
      router.push("/");
    });
  }
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="grid gap-6">

        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="my name is..."
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+123456789"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="password"
                        type="password"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button variant="ghost" type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-1">
                  <Icons.spinner className="mr-sm h-4 w-4 animate-spin" />
                  <span>Unirse...</span>
                </div>
              ) : (
                "Unirse"
              )}
            </Button>
          </form>

        </Form>
      </div>
      <div className="text-center flex justify-between gap-6">
        <Button variant="primary" type="button" disabled={isPending} onClick={handleGoogleSignIn}>
          <Icons.google className="h-4 w-4" />
          <p className="ml-sm"> Google</p>
        </Button>
        <Link href="/login" className="w-full">
          <Button variant="primary">
            Ya tengo cuenta
          </Button>
        </Link>
      </div>
    </div>
  );
}
