/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "../allServices/_components/service-card";

export async function ServicesSection() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
    cache: "no-store",
  });
  const result = ((await res.json()).data ?? []).slice(0, 8);
  const services = result ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Latest services
        </h2>
        <p className="text-muted-foreground mt-1">
          Freshly listed by our technicians.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="text-center mt-8">
        <Button asChild variant="outline">
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    </section>
  );
}
