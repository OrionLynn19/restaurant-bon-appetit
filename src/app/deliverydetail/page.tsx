// src/app/delieverydetail/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OrderAndDeliveryCard from "@/components/Order&DeliveryCard/OrderAndDeliveryCard";
import DeliveryMap from "@/components/DeliveryMap";

// Component that uses useSearchParams
function DeliveryDetailContent() {
  const search = useSearchParams();
  const orderId = search.get("orderId") ?? ""; // read ?orderId=... from URL

  return (
    <>
      <DeliveryMap />
      <OrderAndDeliveryCard orderId={orderId} />
    </>
  );
}

// Loading component for Suspense fallback
function DeliveryDetailLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading delivery details...</div>
    </div>
  );
}

// Main page component
export default function DeliveryDetailPage() {
  return (
    <Suspense fallback={<DeliveryDetailLoading />}>
      <DeliveryDetailContent />
    </Suspense>
  );
}
