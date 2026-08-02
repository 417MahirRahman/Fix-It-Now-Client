import { LayoutDashboard, ClipboardList, PlusCircle, Wrench, CreditCard } from "lucide-react";
import { NavItem } from "./NavItems.interface";

export const technicianNavItems: NavItem[] = [
  { label: "Dashboard", href: "/technician-dashboard", icon: LayoutDashboard },
  {
    label: "Bookings",
    href: "/technician-dashboard/bookings",
    icon: ClipboardList,
  },
  {
    label: "Create Service",
    href: "/technician-dashboard/createNewService/",
    icon: PlusCircle,
  },
  { label: "My Services", href: "/technician-dashboard/myServices", icon: Wrench },
  { label: "Payments", href: "/technician-dashboard/payments", icon: CreditCard },
];
