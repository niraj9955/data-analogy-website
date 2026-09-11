import type { Metadata } from "next";
import { AdminLogin } from "./AdminLogin";

export const metadata: Metadata = {
  title: "Admin Login | DataAnalogy.Com",
  description: "Restricted admin access for DataAnalogy.Com content management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
