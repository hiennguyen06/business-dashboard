import { OrderItem } from "@/types";
import { useToast } from "./ToastContainer";

interface OrderSummaryProps {
  items: OrderItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: () => void;
}

export default function OrderSummary({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: OrderSummaryProps) {
  const { showSuccess } = useToast();
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  const handlePlaceOrder = () => {
    onPlaceOrder();
    showSuccess(
      `Order placed successfully! ${items.length} item${
        items.length !== 1 ? "s" : ""
      } ordered for $${total.toFixed(2)}`
    );
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🛒</div>
          <p>No items selected</p>
          <p className="text-sm">
            Add items from the product list to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm">
                {item.product.name}
              </h3>
              <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>
              <p className="text-sm text-gray-600">
                ${item.product.price.toFixed(2)} each
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() =>
                    onUpdateQuantity(
                      item.product.id,
                      Math.max(0, item.quantity - 1)
                    )
                  }
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-sm"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-sm"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-medium text-gray-900 text-sm">
                  ${item.subtotal.toFixed(2)}
                </p>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-xl font-bold text-blue-600">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full text-white font-medium py-3 px-4 rounded-lg transition-colors"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
          }}
        >
          Place Order ({items.length} item{items.length !== 1 ? "s" : ""})
        </button>
      </div>
    </div>
  );
}
