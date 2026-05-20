"use client";

import { useState } from "react";
import { Trash2, Edit2, Loader2, AlertTriangle, CheckCircle2, Book, User, Database, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBook, updateBook } from "@/app/actions/books";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      stock_quantity: parseInt(formData.get("stock") as string),
      selling_price: parseFloat(formData.get("price") as string),
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
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        onClick={() => setIsEditing(true)}
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        onClick={() => setShowDeleteConfirm(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={isEditing} onOpenChange={(val) => {
        setIsEditing(val);
        if (!val) setTimeout(() => setShowEditSuccess(false), 300);
      }}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0">
          {showEditSuccess ? (
            <div className="p-lg text-center space-y-6 bg-white/90 backdrop-blur-xl">
              <div className="relative mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-black">Libro Actualizado</DialogTitle>
                <DialogDescription className="text-sm font-medium text-balance">Los cambios en el catálogo se han guardado correctamente.</DialogDescription>
              </div>
              <Button onClick={() => setIsEditing(false)}>Cerrar</Button>
            </div>
          ) : (
            <div className="p-lg space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Editar Libro</DialogTitle>
                <DialogDescription className="font-medium ">Ajusta los detalles de este título en el inventario.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Título</Label>
                  <div className="relative">
                    <Book className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input name="title" defaultValue={book.title} className="pl-lg h-11 rounded-xl bg-slate-50 border-none font-bold" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Autor</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input name="author" defaultValue={book.authors?.join(",")} className="pl-lg h-11 rounded-xl bg-slate-50 border-none font-bold" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Stock Actual</Label>
                    <div className="relative">
                      <Database className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="stock" type="number" defaultValue={book.stock_quantity} className="pl-lg h-11 rounded-xl bg-slate-50 border-none font-bold" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Precio</Label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="price" type="number" step="0.01" defaultValue={book.selling_price || 0} className="pl-lg h-11 rounded-xl bg-slate-50 border-none font-bold" required />
                    </div>
                  </div>
                </div>
                <DialogFooter className="pt-md gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar Cambios"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={(val) => {
        setShowDeleteConfirm(val);
        if (!val) setTimeout(() => setShowDeleteSuccess(false), 300);
      }}>
        <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0">
          {showDeleteSuccess ? (
            <div className="p-lg text-center space-y-6 bg-white/90 backdrop-blur-xl">
              <div className="relative mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                <Trash2 className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-black tracking-tight">Eliminado</DialogTitle>
                <DialogDescription className="text-sm font-medium text-balance">El título ha sido borrado del catálogo permanentemente.</DialogDescription>
              </div>
              <Button onClick={() => setShowDeleteConfirm(false)}>Cerrar</Button>
            </div>
          ) : (
            <div className="p-lg text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-black text-slate-900">¿Estás seguro?</DialogTitle>
                <DialogDescription className="text-sm font-medium leading-relaxed">
                  Estás a punto de borrar <span className="font-bold text-slate-900">{book.title}</span>. Esta acción no se puede deshacer.
                </DialogDescription>
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleDelete} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sí, borrar libro"}
                </Button>
                <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
