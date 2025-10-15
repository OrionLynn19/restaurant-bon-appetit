// src/app/delieverydetail/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import OrderAndDeliveryCard from "@/components/Order&DeliveryCard/OrderAndDeliveryCard";
import DeliveryMap from "@/components/DeliveryMap";

export default function DeliveryDetailPage() {
  const search = useSearchParams();
  const orderId = search.get("orderId") ?? ""; // read ?orderId=... from URL

  return (
    <>
      <DeliveryMap />
      <OrderAndDeliveryCard orderId={orderId} />
    </>
  );
}
