/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "../allServices/_components/service-card";

export async function ServicesSection() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
    cache: "no-store",
  });
  const result = ((await res.json()).data ?? []).slice(0, 4);
  const services = result ?? [];

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center mb-16">
          <h2 className="flex flex-wrap justify-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gap-5">
            Latest
            <span className="block text-primary">
              Services
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Freshly listed by our verified technicians — quality work, transparent pricing.
          </p>
        </div>

        {/* Uniform Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {services.map((service: any) => (
            <ServiceCard
              key={service.id}
              service_name={service.service_name}
              price={service.price}
              categoryName={service.category.category_name}
              technicianName={service.technician.user.name}
              technicianId={service.technician.id}
            />
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 h-12 px-8 text-base font-medium"
          >
            <Link href="/services">
              <Wrench className="size-5" />
              View All Services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
