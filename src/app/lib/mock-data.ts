import { Product } from "@/types";

export const frequentlyOrderedProducts: Product[] = [
  {
    id: "1",
    name: "Premium Copy Paper (500 sheets)",
    sku: "PP-500-WH",
    price: 12.99,
    lastOrderedDate: "2024-05-28",
    category: "Office Supplies",
    description: "High-quality white copy paper for everyday printing",
    stock: 0, // Out of stock
    relatedProductIds: ["9", "10"],
  },
  {
    id: "2",
    name: "Blue Ballpoint Pens (Pack of 12)",
    sku: "BP-12-BL",
    price: 8.49,
    lastOrderedDate: "2024-05-25",
    category: "Writing Supplies",
    description: "Smooth-writing ballpoint pens in blue ink",
    stock: 25,
    relatedProductIds: ["11", "6"],
  },
  {
    id: "3",
    name: "Sticky Notes (3x3, Yellow, 100 sheets)",
    sku: "SN-3X3-YL",
    price: 4.99,
    lastOrderedDate: "2024-05-30",
    category: "Office Supplies",
    description: "Self-adhesive notes for reminders and organization",
    stock: 15,
    relatedProductIds: ["12", "1"],
  },
  {
    id: "4",
    name: "Manila File Folders (Pack of 25)",
    sku: "FF-25-MN",
    price: 15.99,
    lastOrderedDate: "2024-05-20",
    category: "Filing",
    description: "Durable manila folders for document organization",
    stock: 8,
    relatedProductIds: ["13", "8"],
  },
  {
    id: "5",
    name: "Stapler with 1000 Staples",
    sku: "ST-1000-BK",
    price: 22.99,
    lastOrderedDate: "2024-05-15",
    category: "Office Equipment",
    description: "Heavy-duty stapler with included staples",
    stock: 0, // Out of stock
    relatedProductIds: ["14", "15"],
  },
  {
    id: "6",
    name: "Whiteboard Markers (Set of 4)",
    sku: "WM-4-AST",
    price: 11.99,
    lastOrderedDate: "2024-05-22",
    category: "Presentation",
    description: "Assorted color dry-erase markers for whiteboards",
    stock: 12,
    relatedProductIds: ["16", "2"],
  },
  {
    id: "7",
    name: "Printer Ink Cartridge (Black)",
    sku: "IC-BK-HP",
    price: 34.99,
    lastOrderedDate: "2024-05-18",
    category: "Printer Supplies",
    description: "Compatible black ink cartridge for HP printers",
    stock: 0, // Out of stock
    relatedProductIds: ["17", "18"],
  },
  {
    id: "8",
    name: "Desk Organizer Tray",
    sku: "DO-TRY-BK",
    price: 18.99,
    lastOrderedDate: "2024-05-12",
    category: "Organization",
    description: "Multi-compartment tray for desk organization",
    stock: 6,
    relatedProductIds: ["4", "19"],
  },
  // Related products that are in stock
  {
    id: "9",
    name: "Standard Copy Paper (500 sheets)",
    sku: "SP-500-WH",
    price: 9.99,
    lastOrderedDate: "2024-05-10",
    category: "Office Supplies",
    description: "Standard quality white copy paper for general use",
    stock: 50,
    relatedProductIds: ["1", "10"],
  },
  {
    id: "10",
    name: "Recycled Copy Paper (500 sheets)",
    sku: "RP-500-WH",
    price: 11.49,
    lastOrderedDate: "2024-05-08",
    category: "Office Supplies",
    description:
      "Eco-friendly recycled paper for environmentally conscious printing",
    stock: 30,
    relatedProductIds: ["1", "9"],
  },
  {
    id: "11",
    name: "Black Ballpoint Pens (Pack of 12)",
    sku: "BP-12-BK",
    price: 8.49,
    lastOrderedDate: "2024-05-05",
    category: "Writing Supplies",
    description: "Smooth-writing ballpoint pens in black ink",
    stock: 40,
    relatedProductIds: ["2", "6"],
  },
  {
    id: "12",
    name: "Sticky Notes (3x3, Multi-color, 100 sheets)",
    sku: "SN-3X3-MC",
    price: 5.99,
    lastOrderedDate: "2024-05-03",
    category: "Office Supplies",
    description: "Self-adhesive notes in assorted colors for organization",
    stock: 25,
    relatedProductIds: ["3", "1"],
  },
  {
    id: "13",
    name: "Colored File Folders (Pack of 25)",
    sku: "FF-25-CL",
    price: 17.99,
    lastOrderedDate: "2024-05-01",
    category: "Filing",
    description: "Assorted color folders for color-coded organization",
    stock: 20,
    relatedProductIds: ["4", "8"],
  },
  {
    id: "14",
    name: "Heavy Duty Stapler",
    sku: "ST-HD-BK",
    price: 28.99,
    lastOrderedDate: "2024-04-28",
    category: "Office Equipment",
    description: "Industrial-grade stapler for heavy-duty use",
    stock: 15,
    relatedProductIds: ["5", "15"],
  },
  {
    id: "15",
    name: "Desktop Stapler (Compact)",
    sku: "ST-CP-BK",
    price: 16.99,
    lastOrderedDate: "2024-04-25",
    category: "Office Equipment",
    description: "Compact desktop stapler for everyday use",
    stock: 22,
    relatedProductIds: ["5", "14"],
  },
  {
    id: "16",
    name: "Permanent Markers (Set of 4)",
    sku: "PM-4-AST",
    price: 9.99,
    lastOrderedDate: "2024-04-22",
    category: "Presentation",
    description: "Assorted color permanent markers for various surfaces",
    stock: 18,
    relatedProductIds: ["6", "2"],
  },
  {
    id: "17",
    name: "Printer Ink Cartridge (Color)",
    sku: "IC-CL-HP",
    price: 39.99,
    lastOrderedDate: "2024-04-20",
    category: "Printer Supplies",
    description: "Compatible color ink cartridge for HP printers",
    stock: 12,
    relatedProductIds: ["7", "18"],
  },
  {
    id: "18",
    name: "Generic Ink Cartridge (Black)",
    sku: "IC-BK-GN",
    price: 24.99,
    lastOrderedDate: "2024-04-18",
    category: "Printer Supplies",
    description:
      "Generic black ink cartridge compatible with multiple printers",
    stock: 35,
    relatedProductIds: ["7", "17"],
  },
  {
    id: "19",
    name: "Drawer Organizer Set",
    sku: "DO-SET-BK",
    price: 24.99,
    lastOrderedDate: "2024-04-15",
    category: "Organization",
    description: "Set of drawer organizers for office supplies",
    stock: 10,
    relatedProductIds: ["8", "4"],
  },
];

export async function getFrequentlyOrderedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return frequentlyOrderedProducts;
}

export function getRelatedProductsInStock(productId: string): Product[] {
  const product = frequentlyOrderedProducts.find((p) => p.id === productId);
  if (!product || !product.relatedProductIds) {
    return [];
  }

  return frequentlyOrderedProducts.filter(
    (p) => product.relatedProductIds!.includes(p.id) && p.stock > 0
  );
}
