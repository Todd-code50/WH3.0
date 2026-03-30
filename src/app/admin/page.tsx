import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Admin | The Wheelhouse",
  description: "Manage bike configurator data",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminPanel />;
}
