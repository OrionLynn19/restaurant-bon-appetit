"use client";
import Image from "next/image";
import React from "react";

type OrderItem = {
  id: number;
  name: string;
  qty: number;
  price: number;
  image: string;
};

function Row({
  label,
  value,
  className = "",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

export default function OrderDetails() {
  const items: OrderItem[] = [
    {
      id: 1,
      name: "Stir Fried Crispy pork Belly With Egg",
      qty: 1,
      price: 150,
      image: "/images/OrderDetail1.jpg",
    },
    {
      id: 2,
      name: "Stir Fried Crispy pork Belly With Egg",
      qty: 1,
      price: 150,
      image: "/images/OrderDetail2.jpg",
    },
  ];

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryFee = 30;
  const tax = Math.round(subtotal * 0.07);
  const coupon = 50;
  const total = subtotal + deliveryFee + tax - coupon;

  return (
    <section
      className="
        md:border-r md:border-dashed md:border-[#DADADA]
        p-5 md:p-6 lg:p-7
        text-[#073027] font-['Schibsted_Grotesk']
      "
    >
      <h3 className="text-[16px] font-extrabold tracking-wide uppercase">Order Details</h3>
      <p className="mt-1 text-[12px] text-[#6B7280]">Order Confirmation Number : 66xxxxxxx</p>

      <div className="mt-3 space-y-4">
        {items.map((it) => (
          <div key={it.id} className="grid grid-cols-[72px_1fr_auto] items-center gap-3">
            <div className="relative h-[68px] w-[72px] overflow-hidden rounded-md">
              <Image src={it.image} alt={it.name} fill className="object-cover" sizes="72px" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold leading-tight">{it.name}</p>
              <p className="mt-1 text-[12px] text-[#6B7280]">
                Qty: <span className="font-semibold text-[#073027]">{it.qty}</span>
              </p>
            </div>
            <div className="pl-2 text-[14px] font-semibold tabular-nums">{it.price}B</div>
          </div>
        ))}
      </div>

      <div className="my-4 h-px w-full border-t border-dotted border-[#D9D9D9]" />

      <div className="space-y-1.5 text-[14px]">
        <Row label="Subtotal" value={`${subtotal}B`} />
        <Row label="Delivery Fee" value={`${deliveryFee}B`} />
        <Row label="Tax(7%)" value={`${tax}B`} />
        <Row
          label={
            <span className="inline-flex items-center gap-1">
              <Image 
                src="/images/mdi_coupon.png"
                width={15}
                height={15}
                alt="coupon icon"
              />
              Coupon
            </span>
          }
          value={`-${coupon}B`}
        />
        <div className="mt-2 h-px w-full border-t border-[#D9D9D9]" />
        <Row
          label={<span className="font-extrabold">Total</span>}
          value={<span className="font-extrabold">{total}B</span>}
          className="pt-1"
        />
      </div>
    </section>
  );
}
