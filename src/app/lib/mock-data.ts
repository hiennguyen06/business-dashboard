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
  },
  {
    id: "2",
    name: "Blue Ballpoint Pens (Pack of 12)",
    sku: "BP-12-BL",
    price: 8.49,
    lastOrderedDate: "2024-05-25",
    category: "Writing Supplies",
    description: "Smooth-writing ballpoint pens in blue ink",
  },
  {
    id: "3",
    name: "Sticky Notes (3x3, Yellow, 100 sheets)",
    sku: "SN-3X3-YL",
    price: 4.99,
    lastOrderedDate: "2024-05-30",
    category: "Office Supplies",
    description: "Self-adhesive notes for reminders and organization",
  },
  {
    id: "4",
    name: "Manila File Folders (Pack of 25)",
    sku: "FF-25-MN",
    price: 15.99,
    lastOrderedDate: "2024-05-20",
    category: "Filing",
    description: "Durable manila folders for document organization",
  },
  {
    id: "5",
    name: "Stapler with 1000 Staples",
    sku: "ST-1000-BK",
    price: 22.99,
    lastOrderedDate: "2024-05-15",
    category: "Office Equipment",
    description: "Heavy-duty stapler with included staples",
  },
  {
    id: "6",
    name: "Whiteboard Markers (Set of 4)",
    sku: "WM-4-AST",
    price: 11.99,
    lastOrderedDate: "2024-05-22",
    category: "Presentation",
    description: "Assorted color dry-erase markers for whiteboards",
  },
  {
    id: "7",
    name: "Printer Ink Cartridge (Black)",
    sku: "IC-BK-HP",
    price: 34.99,
    lastOrderedDate: "2024-05-18",
    category: "Printer Supplies",
    description: "Compatible black ink cartridge for HP printers",
  },
  {
    id: "8",
    name: "Desk Organizer Tray",
    sku: "DO-TRY-BK",
    price: 18.99,
    lastOrderedDate: "2024-05-12",
    category: "Organization",
    description: "Multi-compartment tray for desk organization",
  },
];

export async function getFrequentlyOrderedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return frequentlyOrderedProducts;
}
