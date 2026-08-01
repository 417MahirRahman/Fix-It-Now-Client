import { LayoutDashboard, ClipboardList, PlusCircle, Wrench, CreditCard } from "lucide-react";
import { NavItem } from "./NavItems.interface";

export const technicianNavItems: NavItem[] = [
  { label: "Dashboard", href: "/technician/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/technician/bookings", icon: ClipboardList },
  {
    label: "Create Service",
    href: "/technician/services/new",
    icon: PlusCircle,
  },
  { label: "My Services", href: "/technician/services", icon: Wrench },
  { label: "Payments", href: "/technician/payments", icon: CreditCard },
];
