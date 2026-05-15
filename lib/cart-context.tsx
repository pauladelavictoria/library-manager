"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { Book, PromoCode } from "./types";
import { useAuth } from "./auth-context";
import { useNotification } from "./notification-context";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
    // We only clear the cart on logout, but we could keep the promo
    if (!user && isLoaded) {
      localStorage.removeItem("cart");
      setCart([]);
      // We keep the promo if the user wants to keep seeing discounts
    }
  }, [user, isLoaded]);

  useEffect(() => {
    // Load data regardless of user status
    const savedCart = localStorage.getItem("cart");
    const savedPromo = localStorage.getItem("appliedPromo");

    if (savedCart && user) { // Cart still requires user for now
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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const promoCode = searchParams.get("promo");
    if (promoCode && isLoaded && (!appliedPromo || appliedPromo.code !== promoCode)) {
      applyPromo(promoCode);
    }
  }, [searchParams, isLoaded, appliedPromo, pathname, router]);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      if (appliedPromo) {
        localStorage.setItem("appliedPromo", JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem("appliedPromo");
      }
    }
  }, [cart, appliedPromo, isLoaded, user]);

  const addToCart = (book: Book) => {
    if (!user) {
      return router.push(`/login?redirect=${encodeURIComponent('/cart')}`);
    }

    const existingItem = cart.find((item) => item.id === book.id);
    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === book.id ? updatedItem : item))
      );
      notify({ type: 'cart', title: 'Añadido al carrito', message: '', data: updatedItem });
    } else {
      const newItem = { ...book, quantity: 1 };
      setCart((prevCart) => [...prevCart, newItem]);
      notify({ type: 'cart', title: 'Añadido al carrito', message: '', data: newItem });
    }
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
        .ilike("code", code)
        .single();

      if (error || !data) {
        return { success: false, message: "El código promocional no es válido" };
      }

      const expiryDate = new Date(data.expiry_date);
      if (expiryDate < new Date()) {
        return { success: false, message: "Este código promocional ha caducado" };
      }

      if (data.is_one_time) {
        const { count, error: countError } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("promo_code", data.code);

        if (countError) throw countError;
        if (count && count > 0) {
          return { success: false, message: "Este código promocional ya ha sido utilizado" };
        }
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

