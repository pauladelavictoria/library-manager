"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Book } from "@/lib/types";

interface AddToCartButtonProps {
  book: Book;
  variant?: "default" | "icon" | "ghost";
}

export default function AddToCartButton({ book, variant }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      variant={variant}
      aria-label="Añadir al carrito"
      onClick={() => addToCart(book)}
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  );
}
