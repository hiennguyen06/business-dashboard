import DashboardLayout from "@/app/components/DashboardLayout";
import { ToastProvider } from "@/app/components/ToastContainer";
import { ReactNode } from "react";

interface DashboardLayoutWrapperProps {
  children: ReactNode;
}

export default function DashboardLayoutWrapper({
  children,
}: DashboardLayoutWrapperProps) {
  return (
    <ToastProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </ToastProvider>
  );
}
