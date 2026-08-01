import { LayoutDashboard, ClipboardList, CreditCard } from "lucide-react";
import { NavItem } from "./NavItems.interface";

export const customerNavItems: NavItem[] = [
  { label: "Dashboard", href: "/customer-dashboard", icon: LayoutDashboard },
  {
    label: "My Bookings",
    href: "/customer-dashboard/myBookings",
    icon: ClipboardList,
  },
  {
    label: "Payment History",
    href: "/customer-dashboard/payments",
    icon: CreditCard,
  },
];
