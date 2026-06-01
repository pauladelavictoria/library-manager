"use client";

import { useState } from "react";
import { Plus, Book, User, Hash, Database, Euro, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBook } from "@/app/actions/books";
import { toast } from "sonner";

const fields = [
  { name: "title",     label: "Título del libro",  icon: Book,       type: "text",   colSpan: 2, required: true },
  { name: "author",    label: "Autor",              icon: User,       type: "text",   colSpan: 1, required: true },
  { name: "isbn",      label: "ISBN",               icon: Hash,       type: "text",   colSpan: 1, required: true },
  { name: "category",  label: "Categoría",          icon: null,       type: "text",   colSpan: 1, required: false },
  { name: "publisher", label: "Editorial",          icon: null,       type: "text",   colSpan: 1, required: false },
  { name: "stock",     label: "Stock inicial",      icon: Database,   type: "number", colSpan: 1, required: true, min: "0" },
  { name: "price",     label: "Precio de venta",    icon: Euro,       type: "number", colSpan: 1, required: true, min: "0", step: "0.01" },
  { name: "cover_url", label: "URL de portada",     icon: ImageIcon,  type: "text",   colSpan: 2, required: false },
];

export function CreateBookDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await createBook({
      title:          formData.get("title") as string,
      author:         formData.get("author") as string,
      isbn:           formData.get("isbn") as string,
      stock_quantity: parseInt(formData.get("stock") as string),
      selling_price:  parseFloat(formData.get("price") as string),
      category:       formData.get("category") as string,
      publisher:      formData.get("publisher") as string,
      cover_url:      formData.get("cover_url") as string,
    });
    if (result.success) {
      setShowSuccess(true);
      toast.success("Libro añadido al catálogo");
    } else {
      toast.error("Error al añadir el libro", { description: result.error });
    }
    setIsLoading(false);
  }

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) setTimeout(() => setShowSuccess(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary">
          <Plus className="mr-2 h-3.5 w-3.5" />
          Añadir libro
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[680px] p-0 rounded-none border-2 border-foreground shadow-none">
        {showSuccess ? (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-foreground/40" />
            <DialogTitle className="display-md">Catalogo actualizado</DialogTitle>
            <p className="label-mono">El nuevo titulo ya está disponible.</p>
            <Button variant="primary" onClick={() => setOpen(false)} className="mt-2">
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-10 pt-10 pb-6 border-b border-foreground/15">
              <DialogTitle className="display-md mb-1">Nuevo titulo</DialogTitle>
              <p className="label-mono">Registrar libro en inventario</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-10 py-8">
              <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                {fields.map(({ name, label, icon: Icon, type, colSpan, required, ...rest }) => (
                  <div key={name} className={`space-y-1.5 ${colSpan === 2 ? "col-span-2" : ""}`}>
                    <Label className="label-mono" htmlFor={name}>{label}</Label>
                    <div className="relative">
                      {Icon && (
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30 pointer-events-none" />
                      )}
                      <Input
                        id={name}
                        name={name}
                        type={type}
                        required={required}
                        className={Icon ? "pl-9" : ""}
                        {...rest}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter className="mt-8 flex gap-3">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Registrar libro"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
