"use client";

import { useState, useEffect } from "react";
import { Product, OrderItem } from "@/types";
import { getFrequentlyOrderedProducts } from "@/app/lib/mock-data";
import { useOrders } from "@/app/components/OrderContext";
import ProductList from "@/app/components/ProductList";
import OrderSummary from "@/app/components/OrderSummary";

export default function QuickOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addOrder } = useOrders();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getFrequentlyOrderedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToOrder = (product: Product, quantity: number) => {
    setOrderItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prev];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
          subtotal: newQuantity * product.price,
        };
        return updatedItems;
      } else {
        // Add new item
        const newItem: OrderItem = {
          product,
          quantity,
          subtotal: quantity * product.price,
        };
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setOrderItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity, subtotal: quantity * item.product.price }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const handlePlaceOrder = () => {
    // Save the order to global state
    addOrder(orderItems);
    // Clear the current order
    setOrderItems([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quick Order</h1>
        <p className="mt-2 text-gray-600">
          Quickly reorder your frequently purchased items. Select quantities and
          add them to your order.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          <ProductList products={products} onAddToOrder={handleAddToOrder} />
        </div>

        {/* Order Summary - Takes up 1 column on large screens */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <OrderSummary
              items={orderItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
