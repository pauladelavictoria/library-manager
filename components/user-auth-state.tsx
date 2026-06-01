"use client";

import { useAuth } from "@/lib/auth-context";
import React, { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logOut } from "@/app/(auth)/actions";
import { Icons } from "@/components/ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/lib/notification-context";

export default function UserAuthState() {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return <div className="w-20 h-8" />;

  async function removeUser() {
    startTransition(async () => {
      const response = await logOut();
      if (response?.error) {
        notify({ type: "error", title: "Error", message: "Algo salio mal al cerrar sesion." });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      notify({ type: "info", title: "Sesion cerrada", message: "Has cerrado sesion correctamente." });
      router.push("/");
    });
  }

  if (!user) {
    return (
      <Link href="/login" className="btn-outline">
        {isPending ? <Icons.spinner className="h-3.5 w-3.5 animate-spin" /> : "Entrar"}
      </Link>
    );
  }

  const initial = user.user_metadata?.full_name?.charAt(0).toUpperCase()
    || user.email?.charAt(0).toUpperCase()
    || "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} className="focus:outline-none">
        <Avatar className="relative h-8 w-8">
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/80 z-10">
              <Icons.spinner className="h-3.5 w-3.5 animate-spin text-background" />
            </div>
          )}
          <AvatarImage src={user.user_metadata?.avatar_url || ""} alt="Avatar" />
          <AvatarFallback className="label-sans bg-foreground text-background text-xs">
            {initial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[180px]">
        {/* User email — non-interactive header */}
        <div className="px-4 py-3 border-b border-foreground/15">
          <p className="label-mono truncate max-w-[160px]">{user.email}</p>
        </div>

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-card focus:bg-card">
          <Link href="/dashboard" className="label-sans w-full px-4 py-3 block">
            Area personal
          </Link>
        </DropdownMenuItem>

        <div className="border-t border-foreground/15">
          <DropdownMenuItem
            onClick={removeUser}
            disabled={isPending}
            className="cursor-pointer hover:bg-card focus:bg-card label-sans px-4 py-3 text-foreground/60 hover:text-foreground"
          >
            {isPending ? <Icons.spinner className="h-3.5 w-3.5 animate-spin" /> : "Cerrar sesion"}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
