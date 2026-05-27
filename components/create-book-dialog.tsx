"use client";

import { useState } from "react";
import { Plus, Book, User, Hash, Database, Euro, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBook } from "@/app/actions/books";
import { toast } from "sonner";

export function CreateBookDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      isbn: formData.get("isbn") as string,
      stock_quantity: parseInt(formData.get("stock") as string),
      selling_price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      publisher: formData.get("publisher") as string,
      cover_url: formData.get("cover_url") as string,
    };

    const result = await createBook(data);

    if (result.success) {
      setShowSuccess(true);
      toast.success("¡Libro añadido al catálogo!");
    } else {
      toast.error("Error al añadir el libro", { description: result.error });
    }
    setIsLoading(false);
  }

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={(val) => {
        setOpen(val);
        if (!val) setTimeout(() => setShowSuccess(false), 300);
      }}>
        <DialogContent className="sm:max-w-[400px] border-none bg-white/80 backdrop-blur-xl p-0 overflow-hidden rounded-[2.5rem] shadow-2xl">
          <div className="p-lg text-center space-y-6">
            <div className="relative mx-auto w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-25" />
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-black tracking-tight">¡Catálogo Actualizado!</DialogTitle>
              <DialogDescription className="font-medium">El nuevo título ya está disponible para la venta.</DialogDescription>
            </div>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <Plus className="mr-sm h-4 w-4" />
          Añadir Libro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-slate-200 p-0 overflow-hidden">
        <DialogHeader className="p-lg pb-md">
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            Nuevo Título
          </DialogTitle>
          <DialogDescription className="font-medium ">Completa los datos para registrar un nuevo libro en el inventario.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-lg pt-0 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label className="text-xs font-black uppercase tracking-widest">Título del Libro</Label>
              <div className="relative">
                <Book className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <Input name="title" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">Autor</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <Input name="author" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">ISBN</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <Input name="isbn" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">Categoría</Label>
              <Input name="category" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">Editorial</Label>
              <Input name="publisher" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">Stock Inicial</Label>
              <div className="relative">
                <Database className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <Input name="stock" type="number" min="0" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest">Precio de Venta</Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <Input name="price" type="number" step="0.01" min="0" required />
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-xs font-black uppercase tracking-widest">URL de Portada</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <Input name="cover_url" />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-md">
            <Button type="submit" disabled={isLoading} variant="primary">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Registrar Libro"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
