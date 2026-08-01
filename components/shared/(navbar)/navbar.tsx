"use client";

import { Wrench, User, LayoutDashboard, LogOut } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { NavbarProps } from "./navbar.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/service/logout";

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  let userRole;
  if(user.data?.profile?.role === "Admin") {
    userRole = "Admin";
  }else if(user.data?.profile?.role === "Technician") {
    userRole = "Technician";
  }else{
    userRole = "Customer";
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Technicians", href: "/allTechnicians" },
    { label: "Services", href: "/allServices" },
    { label: "Categories", href: "/allCategories" },
  ];

  const userMenuItems = [
    { label: "My Profile", href: "/myProfile", icon: User },
    { label: "Dashboard", href: `/` + userRole.toLowerCase() + `-dashboard`, icon: LayoutDashboard },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="size-4" />
          </span>
          <span className="text-lg tracking-tight">FixItNow</span>
        </Link>

        {/* Nav links */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  className="font-medium text-muted-foreground data-active:text-foreground"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* User dropdown OR Login button */}
        {user.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
            >
              <Avatar className="size-9">
                <AvatarImage src="/user-avatar.png" alt="User avatar" />
                <AvatarFallback>FN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{user.data.profile.name}</DropdownMenuLabel>
                <DropdownMenuLabel>{user.data.profile.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <Link href="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="cursor-pointer">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
