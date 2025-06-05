export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  lastOrderedDate?: string;
  category?: string;
  description?: string;
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
