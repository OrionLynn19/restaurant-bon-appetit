"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  coupon: number;
  total: number;
  count: number;
  inc: (id: string) => void;
  dec: (id: string) => void;
  removeItem: (id: string) => void;
  addItem: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { id: "1", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 2, image: "/images/menu1.png" },
    { id: "2", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu2.png" },
    { id: "3", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/menu3.png" },
    { id: "4", name: "Stir  Fried Crispy pork Belly With Egg", price: 150, qty: 0, image: "/images/Hungry3.jpg" },
  ]);

  const inc = (id: string) =>
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));

  const dec = (id: string) =>
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it)));

  const removeItem = (id: string) => setItems((arr) => arr.filter((it) => it.id !== id));

  const addItem = (item: CartItem) =>
    setItems((arr) => {
      const idx = arr.findIndex((it) => it.id === item.id);
      if (idx === -1) return [...arr, item];
      const copy = [...arr];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + item.qty, price: item.price, image: item.image, name: item.name };
      return copy;
    });

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.07);
  const coupon = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee + tax - coupon;
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, setItems, subtotal, deliveryFee, tax, coupon, total, count, inc, dec, removeItem, addItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
}
