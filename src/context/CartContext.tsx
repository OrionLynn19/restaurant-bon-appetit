// src/context/CartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

  async function refreshFromServer() {
    try {
      const res = await fetch("/api/cart", {
        cache: "no-store",
        credentials: "include",
      });
      const json = await res.json();
      if (res.ok && Array.isArray(json?.items)) {
        setItems(json.items as CartItem[]);
      }
    } catch (e) {
      console.warn("GET /api/cart error:", e);
    }
  }

  useEffect(() => {
    void refreshFromServer();
  }, []);

  // --- ADD ITEM (server expects a single flat object, not items: []) ---
  const addItem = async (incoming: CartItem) => {
    // Optimistic update
    setItems((prev) => {
      const existing = prev.find((x) => x.id === incoming.id);
      if (existing) {
        return prev.map((x) =>
          x.id === incoming.id ? { ...x, qty: x.qty + incoming.qty } : x
        );
      }
      return [...prev, incoming];
    });

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
          image: incoming.image ?? null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        console.error("POST /api/cart failed:", json?.error);
        await refreshFromServer(); // rollback to server truth
      } else {
        await refreshFromServer(); // sync
      }
    } catch (e) {
      console.warn("POST /api/cart error:", e);
      await refreshFromServer();
    }
  };

  // --- PATCH QTY helper (needed by inc/dec) ---
  const patchQty = async (id: string, qty: number) => {
    // optimistic
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)));
    try {
      const res = await fetch(`/api/cart/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ qty }),
      });
      const json = await res.json();
      if (!res.ok) {
        console.warn("PATCH /api/cart/[id] failed:", json?.error);
        await refreshFromServer();
      } else {
        await refreshFromServer();
      }
    } catch (e) {
      console.warn("PATCH /api/cart/[id] error:", e);
      await refreshFromServer();
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
    if (nextQty === 0) {
      await removeItem(id);
    } else {
      await patchQty(id, nextQty);
    }
  };

  const removeItem = async (id: string) => {
    // optimistic
    setItems((prev) => prev.filter((x) => x.id !== id));
    try {
      const res = await fetch(`/api/cart/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) {
        console.warn("DELETE /api/cart/[id] failed:", json?.error);
        await refreshFromServer();
      } else {
        await refreshFromServer();
      }
    } catch (e) {
      console.warn("DELETE /api/cart/[id] error:", e);
      await refreshFromServer();
    }
  };

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.07);
  const coupon = 0;
  const total = subtotal + deliveryFee + tax - coupon;
  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );

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
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
