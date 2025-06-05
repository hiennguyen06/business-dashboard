"use client";

import { Order } from "@/types";

interface OrderHistoryProps {
  orders: Order[];
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "processing":
        return "⏳";
      case "pending":
        return "🕐";
      case "cancelled":
        return "❌";
      default:
        return "📦";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-600">
            Your order history will appear here once you place your first order.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Order Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order {order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(order.status)}</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6 py-4">
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={`${order.id}-${item.product.id}-${index}`}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>SKU: {item.product.sku}</span>
                      {item.product.category && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.product.category}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Details
                </button>
                {order.status === "completed" && (
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Reorder Items
                  </button>
                )}
                {order.status === "pending" && (
                  <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                    Cancel Order
                  </button>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {order.status === "processing" &&
                  "Expected delivery: 2-3 business days"}
                {order.status === "pending" && "Processing will begin shortly"}
                {order.status === "completed" && "Order completed successfully"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
