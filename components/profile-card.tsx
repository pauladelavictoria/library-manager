"use client";

import { useState } from "react";
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
      notify({ type: "success", title: "Perfil actualizado", message: "Tus datos se han guardado." });
      setIsEditing(false);
    } else {
      notify({ type: "error", title: "Error", message: result.error || "No se pudo actualizar el perfil." });
    }
  };

  const initial = formData.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "?";

  return (
    <div>
      {/* Avatar + name */}
      <div className="p-6 border-b border-foreground/15 flex items-center gap-4">
        <div className="w-14 h-14 border-ink flex items-center justify-center shrink-0">
          <span className="font-serif font-black text-2xl">{initial}</span>
        </div>
        <div className="min-w-0">
          {isEditing ? (
            <div className="space-y-1.5">
              <Label className="label-mono" htmlFor="full_name">Nombre</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
          ) : (
            <>
              <p className="display-md">{formData.full_name || "Usuario"}</p>
              <p className="label-mono mt-0.5">{user.email}</p>
            </>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="divide-y divide-foreground/10">
        <div className="px-6 py-4">
          <p className="label-mono mb-1.5">Telefono</p>
          {isEditing ? (
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Tu numero de telefono"
            />
          ) : (
            <p className="body-sans">{formData.phone || "No proporcionado"}</p>
          )}
        </div>

        {!isEditing && (
          <div className="px-6 py-4">
            <p className="label-mono mb-1.5">Miembro desde</p>
            <p className="body-sans">
              {initialProfile?.created_at
                ? new Date(initialProfile.created_at).toLocaleDateString("es-ES")
                : "Recientemente"}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-foreground/15 flex gap-3">
        {isEditing ? (
          <>
            <button
              className="btn-outline flex-1"
              onClick={() => { setIsEditing(false); setFormData({ full_name: initialProfile?.full_name || "", phone: initialProfile?.phone || "" }); }}
              disabled={isPending}
            >
              Cancelar
            </button>
            <button className="btn-primary flex-1" onClick={handleSave} disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar"}
            </button>
          </>
        ) : (
          <button className="btn-outline w-full" onClick={() => setIsEditing(true)}>
            Editar perfil
          </button>
        )}
      </div>
    </div>
  );
}
