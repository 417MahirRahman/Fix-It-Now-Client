/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TechnicianCard } from "@/app/allTechnicians/_components/technician-card";

export async function TechniciansSection() {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technician`,
    { cache: "no-store" },
  );
  const result = ((await res.json()).data ?? []).slice(0, 8);
  const technicians = result ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Meet our technicians
          </h2>
          <p className="text-muted-foreground mt-1">
            Skilled, rated, and ready to help.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="text-center mt-8">
        <Button asChild variant="outline">
          <Link href="/allTechnicians">View All Technicians</Link>
        </Button>
      </div>
    </section>
  );
}
