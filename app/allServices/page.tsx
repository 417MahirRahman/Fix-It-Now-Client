/* eslint-disable @typescript-eslint/no-explicit-any */

import { FilterBar } from "../../components/shared/filter-bar";
import { ServiceCard } from "./_components/service-card";

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ServicesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.type) query.set("type", params.type);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/services?${query.toString()}`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const services = result.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Browse Services</h1>
      <p className="text-muted-foreground mb-6">
        Explore all available services from our technicians.
      </p>

      <FilterBar />

      {services.length === 0 ? (
        <p className="text-muted-foreground">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      )}
    </div>
  );
}
