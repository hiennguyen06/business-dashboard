"use client";

import { useState } from "react";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  onAddToOrder: (product: Product, quantity: number) => void;
}

export default function ProductList({
  products,
  onAddToOrder,
}: ProductListProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  };

  const handleAddToOrder = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    onAddToOrder(product, quantity);
    // Reset quantity after adding
    setQuantities((prev) => ({
      ...prev,
      [product.id]: 0,
    }));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Frequently Ordered Products
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Quick access to your most commonly ordered items
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {products.map((product) => {
          const quantity = quantities[product.id] || 0;

          return (
            <div
              key={product.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>SKU: {product.sku}</span>
                        <span>•</span>
                        <span>
                          Last ordered: {formatDate(product.lastOrderedDate)}
                        </span>
                        {product.category && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category}
                            </span>
                          </>
                        )}
                      </div>
                      {product.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <label
                    htmlFor={`quantity-${product.id}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                      disabled={quantity <= 0}
                    >
                      −
                    </button>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToOrder(product)}
                  disabled={quantity <= 0}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Add to Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
