"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Wrench, User, LayoutDashboard, LogOut, Menu } from "lucide-react";

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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { NavbarProps } from "./navbar.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/service/logout";
import { Separator } from "@/components/ui/separator";

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  let userRole;
  if (user.data?.profile?.role === "Admin") {
    userRole = "Admin";
  } else if (user.data?.profile?.role === "Technician") {
    userRole = "Technician";
  } else {
    userRole = "Customer";
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Technicians", href: "/allTechnicians" },
    { label: "Services", href: "/allServices" },
    { label: "Categories", href: "/allCategories" },
    { label: "About", href: "/about" },
  ];

  const userMenuItems = [
    { label: "My Profile", href: "/myProfile", icon: User },
    {
      label: "Dashboard",
      href: `/` + userRole.toLowerCase() + `-dashboard`,
      icon: LayoutDashboard,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = async () => {
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold shrink-0">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105">
            <Wrench className="size-4" />
          </span>
          <span className="text-lg tracking-tight">FixItNow</span>
        </Link>

        {/* Desktop Nav links - CENTERED */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild active={active}>
                    <Link
                      href={link.href}
                      className={`relative inline-flex items-center rounded-md px-4 py-2 text-base font-medium transition-all duration-200
                        ${
                          active
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {link.label}
                      {active && (
                        <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* User dropdown OR Login/Register buttons */}
        {user.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors cursor-pointer hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-9 ring-2 ring-border hover:ring-primary/40 transition-all">
                  <AvatarImage src="/user-avatar.png" alt="User avatar" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user.data.profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-semibold">
                  {user.data.profile.name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  {user.data.profile.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer text-base"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="cursor-pointer text-base">
                Register
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          {/* Hide default close button - we use our own in the header */}
          <SheetContent
            side="left"
            className="w-72 p-0 flex flex-col"
            showCloseButton={false}
          >
            <SheetHeader className="border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <SheetTitle asChild>
                  <Link
                    href="/"
                    onClick={closeMobile}
                    className="flex items-center gap-2 font-bold"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Wrench className="size-4" />
                    </span>
                    <span className="text-lg tracking-tight">FixItNow</span>
                  </Link>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobile}
                  className="cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        className={`flex items-center rounded-md px-3 py-3 text-base font-medium transition-all
                          ${
                            active
                              ? "text-primary bg-primary/10 border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60 border-l-2 border-transparent"
                          }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {user.success && (
                <>
                  <Separator className="my-4" />
                  <ul className="space-y-1">
                    {userMenuItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                        >
                          <item.icon className="size-4" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </nav>

            <div className="border-t p-4 space-y-2">
              {user.success ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="size-9 ring-2 ring-border">
                      <AvatarImage src="/user-avatar.png" alt="User avatar" />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.data.profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold truncate">
                        {user.data.profile.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.data.profile.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full cursor-pointer text-base"
                    onClick={() => {
                      closeMobile();
                      handleLogout();
                    }}
                  >
                    <LogOut className="size-4 mr-2" />
                    Log out
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" onClick={closeMobile} className="block">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer text-base"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobile}
                    className="block"
                  >
                    <Button className="w-full cursor-pointer text-base">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
