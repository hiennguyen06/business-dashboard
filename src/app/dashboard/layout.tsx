import DashboardLayout from "@/app/components/DashboardLayout";
import { ToastProvider } from "@/app/components/ToastContainer";
import { OrderProvider } from "@/app/components/OrderContext";
import { ReactNode } from "react";

interface DashboardLayoutWrapperProps {
  children: ReactNode;
}

export default function DashboardLayoutWrapper({
  children,
}: DashboardLayoutWrapperProps) {
  return (
    <OrderProvider>
      <ToastProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </ToastProvider>
    </OrderProvider>
  );
}
