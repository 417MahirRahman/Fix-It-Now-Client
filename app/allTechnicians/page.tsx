/* eslint-disable @typescript-eslint/no-explicit-any */

import { FilterBar } from "../../components/shared/filter-bar";
import { TechnicianCard } from "./_components/technician-card";

interface PageProps {
  searchParams: Promise<{ type?: string; location?: string; rating?: string }>;
}

export default async function TechniciansPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.type) query.set("type", params.type);
  if (params.location) query.set("location", params.location);
  if (params.rating) query.set("rating", params.rating);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technician?${query.toString()}`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const technicians = result.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Find a Technician</h1>
      <p className="text-muted-foreground mb-6">
        Browse verified technicians by category, location, and rating.
      </p>

      <FilterBar showLocation />

      {technicians.length === 0 ? (
        <p className="text-muted-foreground">No technicians found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {technicians.map((tech: any) => (
            <TechnicianCard
              key={tech.id}
              technician={{
                id: tech.id,
                name: tech.user.name,
                address: tech.user.address,
                experienceYears: tech.experienceYears,
                avgRating: tech.avgRating,
                categories: [
                  ...new Set(
                    tech.services.map((s: any) => s.category.category_name),
                  ),
                ] as string[],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
