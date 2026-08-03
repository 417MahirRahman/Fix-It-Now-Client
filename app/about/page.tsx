import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Pros",
    description:
      "Every technician's profile, experience, and reviews are visible before you book — no guessing who's showing up.",
  },
  {
    icon: Handshake,
    title: "Fair, Upfront Pricing",
    description:
      "Prices are set per service by the technician offering it. What you see on the listing is what you pay.",
  },
  {
    icon: CheckCircle2,
    title: "Accountable by Design",
    description:
      "Every booking moves through a clear status, from request to completion, so nothing gets lost or forgotten.",
  },
];

const categories = ["Plumbing", "Electrical", "Cleaning", "Painting"];

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
          <Wrench className="size-8" />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
          Every home has something
          <br className="hidden sm:block" /> that needs fixing.
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
          FixItNow connects people who need work done with the technicians who
          can actually do it — plumbers, electricians, cleaners, and painters,
          all in one place.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            <Link href="/technicians" className="flex items-center gap-2">
              Find a Technician
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 text-base font-medium"
          >
            <Link href="/register">Join as a Technician</Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-4 text-primary" />
            </div>
            <span>Verified Technicians</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="size-4 text-primary" />
            </div>
            <span>Secure Bookings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Categories strip */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-balance leading-tight">
            Built around the trades people rely on most
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <div
              key={cat}
              className="group relative rounded-full border border-border/50 bg-background px-5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-md hover:-translate-y-0.5"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Values */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <ShieldCheck className="size-4" />
            Our Promise
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What we won&apos;t compromise on
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {values.map((value) => (
            <Card
              key={value.title}
              className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-60 group-hover:opacity-100 transition-opacity" />

              <CardContent className="flex flex-col flex-1 p-6 space-y-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <value.icon className="size-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </CardContent>

              {/* Ring overlay for depth */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Closing CTA */}
      <section className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Wrench className="size-4" />
          Ready to get started?
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Something needs fixing today?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
          Browse verified technicians near you and get it booked in minutes.
        </p>
        <Button
          asChild
          size="lg"
          className="h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
        >
          <Link href="/technicians" className="flex items-center gap-2">
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
