"use client";

import { useState } from "react";
import { Trash2, Edit2, Loader2, AlertTriangle, CheckCircle2, Book, User, Database, Euro } from "lucide-react";
import { deleteBook, updateBook } from "@/app/actions/books";
import { toTitleCase } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book as BookType } from "@/lib/types";

interface BookActionsProps {
  book: BookType;
}

export function BookActions({ book }: BookActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    const result = await deleteBook(book.id);
    if (result.success) {
      setShowDeleteSuccess(true);
      toast.success("Libro eliminado");
    } else {
      toast.error("Error al eliminar", { description: result.error });
      setShowDeleteConfirm(false);
    }
    setIsLoading(false);
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await updateBook(book.id, {
      title:          formData.get("title") as string,
      author:         formData.get("author") as string,
      stock_quantity: parseInt(formData.get("stock") as string),
      selling_price:  parseFloat(formData.get("price") as string),
    });
    if (result.success) {
      setShowEditSuccess(true);
      toast.success("Libro actualizado");
    } else {
      toast.error("Error al actualizar", { description: result.error });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {/* Edit */}
      <button
        className="w-8 h-8 flex items-center justify-center text-foreground/30 hover:text-foreground transition-colors"
        onClick={() => setIsEditing(true)}
        aria-label="Editar"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </button>

      {/* Delete */}
      <button
        className="w-8 h-8 flex items-center justify-center text-foreground/30 hover:text-destructive transition-colors"
        onClick={() => setShowDeleteConfirm(true)}
        aria-label="Eliminar"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>

      {/* ── Edit dialog ── */}
      <Dialog open={isEditing} onOpenChange={(v) => { setIsEditing(v); if (!v) setTimeout(() => setShowEditSuccess(false), 300); }}>
        <DialogContent className="max-w-[560px] p-0 rounded-none border-2 border-foreground shadow-none">
          {showEditSuccess ? (
            <div className="p-10 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-foreground/40" />
              <DialogTitle className="display-md">Cambios guardados</DialogTitle>
              <p className="label-mono">El catalogo se ha actualizado.</p>
              <button className="btn-primary mt-2" onClick={() => setIsEditing(false)}>Cerrar</button>
            </div>
          ) : (
            <>
              <div className="px-8 pt-8 pb-5 border-b border-foreground/15">
                <DialogTitle className="display-md mb-1">Editar libro</DialogTitle>
                <p className="label-mono">{toTitleCase(book.title)}</p>
              </div>
              <form onSubmit={handleUpdate} className="px-8 py-6 space-y-5">
                {[
                  { name: "title",  label: "Titulo",  icon: Book,     type: "text",   defaultValue: book.title,                     colSpan: 2 },
                  { name: "author", label: "Autor",   icon: User,     type: "text",   defaultValue: book.authors?.[0] ?? "",        colSpan: 2 },
                  { name: "stock",  label: "Stock",   icon: Database, type: "number", defaultValue: String(book.stock_quantity ?? 0), colSpan: 1 },
                  { name: "price",  label: "Precio",  icon: Euro,     type: "number", defaultValue: String(book.selling_price ?? 0),  colSpan: 1, step: "0.01" },
                ].reduce<React.ReactNode[]>((acc, field, i, arr) => {
                  if (field.colSpan === 2) {
                    acc.push(
                      <div key={field.name} className="space-y-1.5">
                        <Label className="label-mono" htmlFor={field.name}>{field.label}</Label>
                        <div className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                          <Input id={field.name} name={field.name} type={field.type} defaultValue={field.defaultValue} required className="pl-9" />
                        </div>
                      </div>
                    );
                  } else if (i > 0 && arr[i - 1]?.colSpan === 1) {
                    // already rendered as pair
                  } else {
                    const next = arr[i + 1];
                    acc.push(
                      <div key={field.name} className="grid grid-cols-2 gap-4">
                        {[field, next].map(f => f && (
                          <div key={f.name} className="space-y-1.5">
                            <Label className="label-mono" htmlFor={f.name}>{f.label}</Label>
                            <div className="relative">
                              <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                              <Input id={f.name} name={f.name} type={f.type} defaultValue={f.defaultValue} required className="pl-9" {...(f.step ? { step: f.step } : {})} />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return acc;
                }, [])}

                <DialogFooter className="mt-8 flex gap-3">
                  <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Cancelar</button>
                  <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Guardar cambios"}
                  </button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Delete dialog ── */}
      <Dialog open={showDeleteConfirm} onOpenChange={(v) => { setShowDeleteConfirm(v); if (!v) setTimeout(() => setShowDeleteSuccess(false), 300); }}>
        <DialogContent className="max-w-[440px] p-0 rounded-none border-2 border-foreground shadow-none">
          {showDeleteSuccess ? (
            <div className="p-10 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-foreground/40" />
              <DialogTitle className="display-md">Eliminado</DialogTitle>
              <p className="label-mono">El titulo ha sido borrado del catalogo.</p>
              <button className="btn-primary mt-2" onClick={() => setShowDeleteConfirm(false)}>Cerrar</button>
            </div>
          ) : (
            <>
              <div className="px-8 pt-8 pb-5 border-b border-foreground/15">
                <DialogTitle className="display-md mb-1">Eliminar libro</DialogTitle>
                <p className="label-mono">{toTitleCase(book.title)}</p>
              </div>
              <div className="px-8 py-6 space-y-6">
                <div className="flex items-start gap-3 border-soft p-4">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="body-sans text-foreground/70">
                    Esta accion no se puede deshacer. El libro sera borrado permanentemente del catalogo.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleDelete} disabled={isLoading} className="btn-primary" style={{ borderColor: "hsl(var(--destructive))", backgroundColor: "hsl(var(--destructive))" }}>
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Borrar libro"}
                  </button>
                  <button className="btn-outline" onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
