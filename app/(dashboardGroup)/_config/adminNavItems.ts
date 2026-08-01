import { BarChart3, ClipboardList, FolderKanban, LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { NavItem } from "./NavItems.interface";

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "All Users", href: "/admin/users", icon: Users },
  { label: "All Bookings", href: "/admin/bookings", icon: ClipboardList },
  { label: "All Categories", href: "/admin/categories", icon: FolderKanban },
  { label: "Create Category", href: "/admin/categories/new", icon: PlusCircle },
  { label: "Statistics", href: "/admin/statistics", icon: BarChart3 },
];
