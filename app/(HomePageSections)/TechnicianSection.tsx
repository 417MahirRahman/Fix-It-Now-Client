/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechnicianCard } from "@/app/allTechnicians/_components/technician-card";

export async function TechniciansSection() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician`, {
    cache: "no-store",
  });
  const result = ((await res.json()).data ?? []).slice(0, 4);
  const technicians = result ?? [];

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center mb-16">
          <h2 className="gap-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight flex flex-wrap justify-center">
            Meet Our
            <span className="block text-primary">
              Technicians
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Skilled, verified, and rated by real customers — find the perfect
            professional for your home.
          </p>
        </div>

        {/* Uniform Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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

        {/* Simple CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 h-12 px-8 text-base font-medium"
          >
            <Link href="/allTechnicians">
              <Users className="size-5" />
              View All Technicians
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
