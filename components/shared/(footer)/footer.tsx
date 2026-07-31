import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./social-icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Technicians", href: "/technicians" },
  { label: "Services", href: "/services" },
  { label: "Categories", href: "/categories" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

const contactInfo = [
  {
    label: "support@fixitnow.com",
    href: "mailto:support@fixitnow.com",
    icon: Mail,
  },
  { label: "(555) 123-4567", href: "tel:+15551234567", icon: Phone },
  { label: "123 Service St, San Francisco, CA", href: null, icon: MapPin },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="size-4" />
              </span>
              <span className="text-lg tracking-tight">FixItNow</span>
            </Link>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Trusted home services, on demand.
            </p>
          </div>

          {/* Quick Links column */}
          <nav className="flex flex-col gap-3" aria-label="Quick links">
            <h2 className="text-sm font-semibold">Quick Links</h2>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Company column */}
          <nav className="flex flex-col gap-3" aria-label="Company">
            <h2 className="text-sm font-semibold">Company</h2>
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact / Social column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold">Get in Touch</h2>
            <ul className="flex flex-col gap-3">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start"
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center gap-1 md:justify-start">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                >
                  <social.icon className="size-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>{`© ${currentYear} FixItNow. All rights reserved.`}</p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:hidden"
            aria-label="Footer quick links"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
