"use client";

import { useOrders } from "@/app/components/OrderContext";
import OrderHistory from "@/app/components/OrderHistory";

export default function OrderHistoryPage() {
  const { orders } = useOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="mt-2 text-gray-600">
          View and manage your past orders and track their status.
        </p>
      </div>

      <OrderHistory orders={orders} />
    </div>
  );
}
