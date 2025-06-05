"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  Order,
  OrderItem,
  SpendingAnalytics,
  MonthlySpending,
  CategorySpending,
  SavingsData,
} from "@/types";

interface OrderContextType {
  orders: Order[];
  addOrder: (items: OrderItem[]) => void;
  getOrderById: (id: string) => Order | undefined;
  getSpendingAnalytics: () => SpendingAnalytics;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}

interface OrderProviderProps {
  children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<Order[]>([
    // Mock order history data
    {
      id: "ORD-001",
      items: [
        {
          product: {
            id: "2",
            name: "Blue Ballpoint Pens (Pack of 12)",
            sku: "BP-12-BL",
            price: 8.49,
            stock: 25,
            category: "Writing Supplies",
            description: "Smooth-writing ballpoint pens in blue ink",
          },
          quantity: 3,
          subtotal: 25.47,
        },
        {
          product: {
            id: "3",
            name: "Sticky Notes (3x3, Yellow, 100 sheets)",
            sku: "SN-3X3-YL",
            price: 4.99,
            stock: 15,
            category: "Office Supplies",
            description: "Self-adhesive notes for reminders and organization",
          },
          quantity: 2,
          subtotal: 9.98,
        },
      ],
      total: 35.45,
      createdAt: "2024-05-30T10:30:00Z",
      status: "completed",
    },
    {
      id: "ORD-002",
      items: [
        {
          product: {
            id: "4",
            name: "Manila File Folders (Pack of 25)",
            sku: "FF-25-MN",
            price: 15.99,
            stock: 8,
            category: "Filing",
            description: "Durable manila folders for document organization",
          },
          quantity: 1,
          subtotal: 15.99,
        },
        {
          product: {
            id: "6",
            name: "Whiteboard Markers (Set of 4)",
            sku: "WM-4-AST",
            price: 11.99,
            stock: 12,
            category: "Presentation",
            description: "Assorted color dry-erase markers for whiteboards",
          },
          quantity: 2,
          subtotal: 23.98,
        },
      ],
      total: 39.97,
      createdAt: "2024-05-28T14:15:00Z",
      status: "processing",
    },
    {
      id: "ORD-003",
      items: [
        {
          product: {
            id: "8",
            name: "Desk Organizer Tray",
            sku: "DO-TRY-BK",
            price: 18.99,
            stock: 6,
            category: "Organization",
            description: "Multi-compartment tray for desk organization",
          },
          quantity: 1,
          subtotal: 18.99,
        },
      ],
      total: 18.99,
      createdAt: "2024-05-25T09:45:00Z",
      status: "completed",
    },
    // Additional mock orders for better analytics
    {
      id: "ORD-004",
      items: [
        {
          product: {
            id: "2",
            name: "Blue Ballpoint Pens (Pack of 12)",
            sku: "BP-12-BL",
            price: 8.49,
            stock: 25,
            category: "Writing Supplies",
            description: "Smooth-writing ballpoint pens in blue ink",
          },
          quantity: 5,
          subtotal: 42.45,
        },
      ],
      total: 42.45,
      createdAt: "2024-04-15T11:20:00Z",
      status: "completed",
    },
    {
      id: "ORD-005",
      items: [
        {
          product: {
            id: "7",
            name: "Printer Ink Cartridge (Black)",
            sku: "IC-BK-HP",
            price: 34.99,
            stock: 0,
            category: "Printer Supplies",
            description: "Compatible black ink cartridge for HP printers",
          },
          quantity: 2,
          subtotal: 69.98,
        },
        {
          product: {
            id: "4",
            name: "Manila File Folders (Pack of 25)",
            sku: "FF-25-MN",
            price: 15.99,
            stock: 8,
            category: "Filing",
            description: "Durable manila folders for document organization",
          },
          quantity: 3,
          subtotal: 47.97,
        },
      ],
      total: 117.95,
      createdAt: "2024-04-10T16:45:00Z",
      status: "completed",
    },
    {
      id: "ORD-006",
      items: [
        {
          product: {
            id: "3",
            name: "Sticky Notes (3x3, Yellow, 100 sheets)",
            sku: "SN-3X3-YL",
            price: 4.99,
            stock: 15,
            category: "Office Supplies",
            description: "Self-adhesive notes for reminders and organization",
          },
          quantity: 10,
          subtotal: 49.9,
        },
      ],
      total: 49.9,
      createdAt: "2024-03-22T13:30:00Z",
      status: "completed",
    },
  ]);

  const addOrder = (items: OrderItem[]) => {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const getSpendingAnalytics = (): SpendingAnalytics => {
    const discountRate = 0.05; // 5% business discount
    const completedOrders = orders.filter(
      (order) => order.status === "completed"
    );

    // Calculate totals
    const totalSpent = completedOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );
    const totalSavings = totalSpent * discountRate;

    // Group by month
    const monthlyMap = new Map<string, MonthlySpending>();
    completedOrders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthName = date.toLocaleDateString("en-US", { month: "long" });

      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, {
          month: monthName,
          year: date.getFullYear(),
          totalSpent: 0,
          totalSavings: 0,
          orderCount: 0,
        });
      }

      const monthData = monthlyMap.get(monthKey)!;
      monthData.totalSpent += order.total;
      monthData.totalSavings += order.total * discountRate;
      monthData.orderCount += 1;
    });

    // Group by category
    const categoryMap = new Map<string, CategorySpending>();
    completedOrders.forEach((order) => {
      order.items.forEach((item) => {
        const category = item.product.category || "Uncategorized";

        if (!categoryMap.has(category)) {
          categoryMap.set(category, {
            category,
            totalSpent: 0,
            totalSavings: 0,
            orderCount: 0,
            percentage: 0,
          });
        }

        const categoryData = categoryMap.get(category)!;
        categoryData.totalSpent += item.subtotal;
        categoryData.totalSavings += item.subtotal * discountRate;
        categoryData.orderCount += 1;
      });
    });

    // Calculate percentages for categories
    categoryMap.forEach((category) => {
      category.percentage = (category.totalSpent / totalSpent) * 100;
    });

    // Generate savings over time data
    const savingsOverTime: SavingsData[] = [];
    let cumulativeSavings = 0;

    // Sort orders by date
    const sortedOrders = [...completedOrders].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Group by month for cumulative savings
    const monthlyTotals = new Map<string, number>();
    sortedOrders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyTotals.has(monthKey)) {
        monthlyTotals.set(monthKey, 0);
      }
      monthlyTotals.set(
        monthKey,
        monthlyTotals.get(monthKey)! + order.total * discountRate
      );
    });

    // Create cumulative savings data
    Array.from(monthlyTotals.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([monthKey, monthlySavings]) => {
        cumulativeSavings += monthlySavings;
        savingsOverTime.push({
          date: monthKey,
          cumulativeSavings,
          monthlySavings,
        });
      });

    return {
      totalSpent,
      totalSavings,
      discountRate,
      monthlyData: Array.from(monthlyMap.values()).sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return (
          new Date(`${a.month} 1, ${a.year}`).getMonth() -
          new Date(`${b.month} 1, ${b.year}`).getMonth()
        );
      }),
      categoryBreakdown: Array.from(categoryMap.values()).sort(
        (a, b) => b.totalSpent - a.totalSpent
      ),
      savingsOverTime,
    };
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, getOrderById, getSpendingAnalytics }}
    >
      {children}
    </OrderContext.Provider>
  );
}
