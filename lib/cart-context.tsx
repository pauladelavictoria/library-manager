"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { Book, PromoCode } from "./types";
import { useAuth } from "./auth-context";
import { useNotification } from "./notification-context";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/client";

export interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => Promise<{ success: boolean; message: string }>;
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();
  const { notify } = useNotification();
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("cart");
      localStorage.removeItem("appliedPromo");
      setCart([]);
      setAppliedPromo(null);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const savedCart = localStorage.getItem("cart");
    const savedPromo = localStorage.getItem("appliedPromo");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    if (savedPromo) {
      try {
        setAppliedPromo(JSON.parse(savedPromo));
      } catch (e) {
        console.error("Failed to parse promo from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
      if (appliedPromo) {
        localStorage.setItem("appliedPromo", JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem("appliedPromo");
      }
    }
  }, [cart, appliedPromo, isLoaded, user]);

  const addToCart = (book: Book) => {
    const newItem = { ...book, quantity: 1 };

    setCart((prevCart) => {
      if (!user) {
        return redirect(`/login?redirect=${encodeURIComponent('/cart')}`);
      }
      const existingItem = prevCart.find((item) => item.id === book.id);
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        notify({ type: 'cart', title: 'Añadido al carrito', message: '', data: updatedItem });
        return prevCart.map((item) =>
          item.id === book.id ? updatedItem : item
        );
      }
      notify({ type: 'cart', title: 'Añadido al carrito', message: '', data: newItem });
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (bookId: string) => {
    if (!user) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (!user) return;
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    if (!user) return;
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromo = async (code: string) => {
    try {
      const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .eq("code", code)
        .single();

      if (error || !data) {
        return { success: false, message: "El código promocional no es válido" };
      }

      const expiryDate = new Date(data.expiry_date);
      if (expiryDate < new Date()) {
        return { success: false, message: "Este código promocional ha caducado" };
      }

      setAppliedPromo(data as PromoCode);
      const successMsg = `Has aplicado el código ${data.code} con un ${data.discount_amount}% de descuento.`;
      notify({ type: 'success', title: 'Cupón aplicado', message: successMsg, data: data });
      return { success: true, message: successMsg };
    } catch (err) {
      const errorMsg = "No pudimos validar ese código. Inténtalo de nuevo.";
      notify({ type: 'error', title: 'Error en cupón', message: errorMsg });
      return { success: false, message: errorMsg };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.selling_price || 0) * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * (appliedPromo.discount_amount / 100)) : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        appliedPromo,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

