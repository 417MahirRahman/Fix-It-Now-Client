import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Handshake,
  Search,
  CalendarCheck,
  CheckCircle2,
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

const steps = [
  {
    icon: Search,
    title: "Find the right pro",
    description:
      "Browse by category, location, and rating until you find a good fit.",
  },
  {
    icon: CalendarCheck,
    title: "Book a time that works",
    description:
      "Pick a slot, add any notes about the job, and send the request.",
  },
  {
    icon: Wrench,
    title: "Get it fixed",
    description:
      "Your technician confirms, does the work, and you pay once it's done.",
  },
];

const categories = ["Plumbing", "Electrical", "Cleaning", "Painting"];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Wrench className="size-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Every home has something
          <br className="hidden sm:block" /> that needs fixing.
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-pretty">
          FixItNow connects people who need work done with the technicians who
          can actually do it — plumbers, electricians, cleaners, and painters,
          all in one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/technicians">Find a Technician</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Link href="/register">Join as a Technician</Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Categories strip */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-4">
          Built around the trades people rely on most
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      <Separator />

      {/* How it works — the signature element: a job-ticket style sequence */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How a job gets done
          </h2>
          <p className="mt-2 text-muted-foreground">
            Three steps, start to finish — the same for a leaky faucet or a full
            repaint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center px-6 py-8"
            >
              {/* perforated connector between steps, desktop only */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-px h-24 border-l border-dashed border-border" />
              )}
              <div className="flex size-12 items-center justify-center rounded-full bg-muted text-foreground mb-4">
                <step.icon className="size-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-[220px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Values */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            What we won&apos;t compromise on
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border">
              <CardContent className="p-6 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <value.icon className="size-5" />
                </div>
                <h3 className="font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Something needs fixing today?
        </h2>
        <p className="text-muted-foreground mb-8">
          Browse verified technicians near you and get it booked in minutes.
        </p>
        <Button asChild size="lg">
          <Link href="/technicians">Get Started</Link>
        </Button>
      </section>
    </div>
  );
}
