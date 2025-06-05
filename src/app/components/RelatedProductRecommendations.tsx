"use client";

import { Product } from "@/types";

interface RelatedProductRecommendationsProps {
  relatedProducts: Product[];
  onAddToOrder: (product: Product, quantity: number) => void;
}

export default function RelatedProductRecommendations({
  relatedProducts,
  onAddToOrder,
}: RelatedProductRecommendationsProps) {
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start space-x-2">
        <div className="text-blue-600 mt-0.5">💡</div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Recommended Alternatives
          </h4>
          <p className="text-xs text-blue-700 mb-3">
            This item is out of stock. Here are similar products that are
            available:
          </p>
          <div className="space-y-2">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between bg-white p-3 rounded border border-blue-100"
              >
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h5>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span>SKU: {product.sku}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">
                      {product.stock} in stock
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => onAddToOrder(product, 1)}
                  className="text-white text-xs font-medium py-2 px-3 rounded transition-colors"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                  }}
                >
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
