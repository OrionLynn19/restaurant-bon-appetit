"use client"
import OrderAndDeliveryCard from "@/components/Order&DeliveryCard/OrderAndDeliveryCard";
import DeliveryMap from "@/components/DeliveryMap";
export default function DeliveryDetailPage() {
  return (
    <>
      <DeliveryMap />
      <OrderAndDeliveryCard />
    </>
  );
}
