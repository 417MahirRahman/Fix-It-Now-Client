import { adminNavItems } from "./adminNavItems";
import { customerNavItems } from "./customerNavItems";
import { NavItem } from "./NavItems.interface";
import { technicianNavItems } from "./technicianNavItems";

export function getNavItemsByRole(role: string): NavItem[] {
  switch (role) {
    case "Admin":
      return adminNavItems;
    case "Technician":
      return technicianNavItems;
    default:
      return customerNavItems;
  }
}
