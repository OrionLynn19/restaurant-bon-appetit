// components/AddToCartButton.tsx
"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: string;       // stable id (include portion if you want separate lines per portion)
  name: string;
  price: number;    // computed from selected portion
  image: string;
  className?: string;
};

export default function AddToCartButton({ id, name, price, image, className }: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const onAdd = async () => {
    if (adding || added) return;
    setAdding(true);
    try {
      await addItem({ id, name, price, qty: 1, image });
      setAdded(true);            // keep disabled after success
    } catch {
      setAdding(false);          // re-enable if it failed
    }
  };

  return (
    <button
      onClick={onAdd}
      disabled={adding || added}
      className={className ?? `
        w-full h-12 rounded-[10px]
        border-2 border-[#073027] bg-[#EF9748] text-[#073027]
        font-['Bebas_Neue'] text-[16px] uppercase tracking-wide
        shadow-[0_3px_0_0_#073027]
        hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#073027]
        active:translate-y-[2px] active:shadow-[0_1px_0_0_#073027]
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-transform
      `}
      aria-label="Add to cart"
    >
      {added ? "Added" : adding ? "Adding…" : `Add 1 Cart · ${price.toFixed(2)}B`}
    </button>
  );
}
