import { BarChart3, ClipboardList, FolderKanban, LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { NavItem } from "./NavItems.interface";

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "All Users", href: "/admin-dashboard/getAllUsers", icon: Users },
  {
    label: "All Bookings",
    href: "/admin-dashboard/getAllBookings",
    icon: ClipboardList,
  },
  {
    label: "All Categories",
    href: "/admin-dashboard/getAllCategories",
    icon: FolderKanban,
  },
  {
    label: "Create Category",
    href: "/admin-dashboard/createCategory",
    icon: PlusCircle,
  },
  {
    label: "Statistics",
    href: "/admin-dashboard/admin-statistics",
    icon: BarChart3,
  },
];
