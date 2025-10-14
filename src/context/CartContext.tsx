"use client";
import React, { createContext, useContext, useState } from "react";

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
  inc: (id: string) => void;
  dec: (id: string) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Stir  Fried Crispy pork Belly With Egg",
      price: 150,
      qty: 2,
      image: "/images/menu1.png",
    },
    {
      id: "2",
      name: "Stir  Fried Crispy pork Belly With Egg",
      price: 150,
      qty: 0,
      image: "/images/menu2.png",
    },
    {
      id: "3",
      name: "Stir  Fried Crispy pork Belly With Egg",
      price: 150,
      qty: 0,
      image: "/images/menu3.png",
    },
    {
      id: "4",
      name: "Stir  Fried Crispy pork Belly With Egg",
      price: 150,
      qty: 0,
      image: "/images/Hungry3.jpg",
    },
  ]);

  const inc = (id: string) =>
    setItems((arr) =>
      arr.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );

  const dec = (id: string) =>
    setItems((arr) =>
      arr.map((it) =>
        it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it
      )
    );

  const removeItem = (id: string) =>
    setItems((arr) => arr.filter((it) => it.id !== id));

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.07);
  const coupon = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee + tax - coupon;

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        subtotal,
        deliveryFee,
        tax,
        coupon,
        total,
        inc,
        dec,
        removeItem,
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
