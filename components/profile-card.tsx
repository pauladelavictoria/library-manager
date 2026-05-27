"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/lib/notification-context";
import { updateProfile } from "@/app/(dashboard)/dashboard/actions";
import { Profile } from "@/lib/types";
import { User } from "@supabase/supabase-js";

interface ProfileCardProps {
  profile: Profile | null;
  user: User;
}

export function ProfileCard({ profile: initialProfile, user }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { notify } = useNotification();
  const [formData, setFormData] = useState({
    full_name: initialProfile?.full_name || "",
    phone: initialProfile?.phone || "",
  });

  const handleSave = async () => {
    setIsPending(true);
    const result = await updateProfile(formData);
    setIsPending(false);

    if (result.success) {
      notify({ type: 'success', title: 'Perfil actualizado', message: 'Tus datos se han guardado correctamente.' });
      setIsEditing(false);
    } else {
      notify({ type: 'error', title: 'Error', message: result.error || 'No se pudo actualizar el perfil.' });
    }
  };

  return (
    <Card className="rounded-[2.5rem] border-cardDark/60 shadow-xl overflow-hidden card-background">
      <CardHeader className="bg-cardDark/30 pb-lg">
        <div className="w-20 h-20 rounded-full bg-cardDark flex items-center justify-center mb-md border-4 border-background shadow-lg">
          <span className="text-2xl font-black text-foreground">
            {formData.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
          </span>
        </div>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-xs font-black uppercase tracking-wider">Nombre Completo</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="rounded-xl border-cardDark"
              />
            </div>
          </div>
        ) : (
          <>
            <CardTitle className="text-2xl font-black">{formData.full_name || "Usuario"}</CardTitle>
            <CardDescription className="font-medium">{user.email}</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="pt-lg space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Teléfono</p>
          {isEditing ? (
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="rounded-xl border-cardDark mt-sm"
              placeholder="Tu número de teléfono"
            />
          ) : (
            <p className="font-bold">{formData.phone || "No proporcionado"}</p>
          )}
        </div>

        {!isEditing && (
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Miembro desde</p>
            <p className="font-bold">
              {initialProfile?.created_at ? new Date(initialProfile.created_at).toLocaleDateString() : "Recientemente"}
            </p>
          </div>
        )}

        <Separator className="bg-cardDark" />

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                className="flex-1 rounded-2xl py-lg font-bold"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    full_name: initialProfile?.full_name || "",
                    phone: initialProfile?.phone || "",
                  });
                }}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 rounded-2xl py-lg font-bold shadow-lg shadow-primary/20"
                onClick={handleSave}
                disabled={isPending}
              >
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              className="w-full rounded-2xl font-bold hover:bg-cardDark hover:text-foreground border-cardDark transition-all"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
