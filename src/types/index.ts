export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  lastOrderedDate?: string;
  category?: string;
  description?: string;
  stock: number;
  relatedProductIds?: string[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}

export interface QuickOrderState {
  selectedItems: OrderItem[];
  total: number;
}

export interface SpendingAnalytics {
  totalSpent: number;
  totalSavings: number;
  discountRate: number;
  monthlyData: MonthlySpending[];
  categoryBreakdown: CategorySpending[];
  savingsOverTime: SavingsData[];
}

export interface MonthlySpending {
  month: string;
  year: number;
  totalSpent: number;
  totalSavings: number;
  orderCount: number;
}

export interface CategorySpending {
  category: string;
  totalSpent: number;
  totalSavings: number;
  orderCount: number;
  percentage: number;
}

export interface SavingsData {
  date: string;
  cumulativeSavings: number;
  monthlySavings: number;
}
