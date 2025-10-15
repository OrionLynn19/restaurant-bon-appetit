"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  inc: (id: string) => Promise<void>;
  dec: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  coupon: number;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // --- Load from server ---
  async function refreshFromServer() {
    try {
      const res = await fetch("/api/cart", { cache: "no-store", credentials: "include" });
      const json = await res.json();
      if (res.ok && json?.items) {
        setItems(json.items as CartItem[]);
      }
    } catch (e) {
      console.warn("GET /api/cart error:", e);
    }
  }

  useEffect(() => {
    refreshFromServer();
  }, []);

  // --- Main actions ---
  const addItem = async (incoming: CartItem) => {
    // Optimistic UI so the button enables immediately
    setItems((prev) => {
      const existing = prev.find((x) => x.id === incoming.id);
      if (existing) {
        return prev.map((x) => (x.id === incoming.id ? { ...x, qty: x.qty + incoming.qty } : x));
      }
      return [...prev, incoming];
    });

    // Send to API (match /api/cart POST body shape)
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: incoming.id,
          name: incoming.name,
          price: incoming.price,
          qty: incoming.qty,
          image: incoming.image,
        }),
      });
      await res.json();
      // Sync actual data
      refreshFromServer();
    } catch (e) {
      console.warn("POST /api/cart error:", e);
    }
  };

  const patchQty = async (id: string, qty: number) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)));
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ qty }),
      });
      await res.json();
      refreshFromServer();
    } catch (e) {
      console.warn("PATCH error:", e);
    }
  };

  const inc = async (id: string) => {
    const current = items.find((x) => x.id === id);
    const nextQty = (current?.qty || 0) + 1;
    await patchQty(id, nextQty);
  };

  const dec = async (id: string) => {
    const current = items.find((x) => x.id === id);
    const nextQty = Math.max(0, (current?.qty || 0) - 1);
    if (nextQty === 0) await removeItem(id);
    else await patchQty(id, nextQty);
  };

  const removeItem = async (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    try {
      const res = await fetch(`/api/cart/${id}`, { method: "DELETE", credentials: "include" });
      await res.json();
      refreshFromServer();
    } catch (e) {
      console.warn("DELETE error:", e);
    }
  };

  // --- Totals ---
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.07);
  const coupon = 0;
  const total = subtotal + deliveryFee + tax - coupon;

  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  const value: CartContextType = {
    items,
    addItem,
    inc,
    dec,
    removeItem,
    subtotal,
    deliveryFee,
    tax,
    coupon,
    total,
    count,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
