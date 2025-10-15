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
    <section className=" text-[#073027] font-['Schibsted_Grotesk']">
      <h3 className="text-[24px] md:text-[40px] font-['Bebas_Neue'] tracking-wide uppercase">
        Order Details
      </h3>
      <p className=" text-[14px] md:text-[20px] text-[#6B7280]">
        Order Confirmation Number : 66xxxxxxx
      </p>

      <div className="mt-3 mb-5 space-y-3 md:space-y-5">
        {items.map((it) => (
          <div
            key={it.id}
            className="grid grid-cols-[72px_1fr_auto] items-start gap-3 md:grid-cols-[180px_1fr_auto] md:gap-6"
          >
            <div className="relative h-[72px] w-[72px] md:h-[180px] md:w-[180px] overflow-hidden rounded-md">
              <Image
                src={it.image}
                alt={it.name}
                fill
                sizes="(min-width: 768px) 180px, 72px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="text-[16px] leading-tight md:text-[18px] text-wrap">
                {it.name}
              </p>
              <p className="mt-1 md:mt-5 text-[14px] md:text-[18px]">
                Qty: <span className="text-[#073027]">{it.qty}</span>
              </p>
            </div>

            <div className="pl-2 text-[14px] md:text-[18px] tabular-nums">
              {it.price}B
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 text-[16px] md:text-[18px]">
        <Row label="Subtotal" value={`${subtotal}B`} />
        <Row label="Delivery Fee" value={`${deliveryFee}B`} />
        <Row label="Tax(7%)" value={`${tax}B`} />
        <Row
          label={
            <span className="inline-flex items-center gap-1">
              <Image src="/images/mdi_coupon.png" width={15} height={15} alt="coupon icon" />
              Coupon
            </span>
          }
          value={`-${coupon}B`}
        />
        <div className="mt-2 h-px w-full border-t border-[#073027]" />
        <Row label={<span className="font-semibold">Total</span>} value={<span className="font-semibold">{total}B</span>} className="pt-1" />
      </div>
    </section>
  );
}
