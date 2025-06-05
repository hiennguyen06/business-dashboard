"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Quick Order", href: "/dashboard/quick-order", icon: "🛒" },
  { name: "Order History", href: "/dashboard/orders", icon: "📋" },
  { name: "Spend Insights", href: "/dashboard/insights", icon: "📊" },
  { name: "Marketing Toolkit", href: "/dashboard/marketing", icon: "📢" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar with gradient background */}
      <header
        className="shadow-lg border-b border-gray-200"
        style={{
          background: "linear-gradient(135deg, #001080 0%, #0066cc 100%)",
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">
                Business Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-blue-100">Welcome back, Admin</div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white/20"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
          <div className="p-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white border border-blue-300"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                    }`}
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(135deg, #001080 0%, #0066cc 100%)",
                          }
                        : {}
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
