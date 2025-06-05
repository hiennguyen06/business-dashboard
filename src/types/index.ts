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

export interface MarketingAsset {
  id: string;
  name: string;
  type: "banner" | "social" | "email" | "flyer";
  format: "html" | "image";
  template: BannerTemplate;
  content: BannerContent;
  createdAt: string;
  updatedAt: string;
}

export interface BannerTemplate {
  id: string;
  name: string;
  type: "promotional" | "seasonal" | "product" | "discount" | "announcement";
  dimensions: {
    width: number;
    height: number;
  };
  layout: "hero" | "sidebar" | "header" | "footer" | "square" | "story";
  colorScheme: "blue" | "green" | "red" | "purple" | "orange" | "custom";
}

export interface BannerContent {
  headline: string;
  subheadline?: string;
  description?: string;
  callToAction: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  imageUrl?: string;
  logoUrl?: string;
  discount?: {
    percentage: number;
    code: string;
    validUntil: string;
  };
}

export interface PromptTemplate {
  id: string;
  name: string;
  category: "promotional" | "seasonal" | "product" | "discount";
  prompt: string;
  variables: string[];
  example: BannerContent;
}
