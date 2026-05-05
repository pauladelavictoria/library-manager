"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { Book } from "./types";
import { useAuth } from "./auth-context";
import { redirect } from "next/navigation";

export interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  lastAddedItem: CartItem | null;
  setLastAddedItem: (item: CartItem | null) => void;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("cart");
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded, user]);

  const addToCart = (book: Book) => {
    const newItem = { ...book, quantity: 1 };

    setCart((prevCart) => {
      if (!user) {
        return redirect(`/login?redirect=${encodeURIComponent('/cart')}`);
      }
      const existingItem = prevCart.find((item) => item.id === book.id);
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        setLastAddedItem(updatedItem);
        return prevCart.map((item) =>
          item.id === book.id ? updatedItem : item
        );
      }
      setLastAddedItem(newItem);
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
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.selling_price || 0) * item.quantity, 0);


  return (
    <CartContext.Provider
      value={{
        cart,
        lastAddedItem,
        setLastAddedItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
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

