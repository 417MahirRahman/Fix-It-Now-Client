/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryCard } from "../allCategories/_components/category-card";

export async function CategoriesSection() {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}api/services/categories`,
    { cache: "no-store" },
  );
  const result = ((await res.json()).data ?? []).slice(0, 4);
  const categories = result ?? [];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Sticky Editorial Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-md font-semibold uppercase tracking-wider text-primary">
                Explore
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9]">
              Service
              <br />
              <span className="text-muted-foreground">Categories.</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              From quick fixes to major projects, find the specialized help you
              need in just a few clicks.
            </p>

            <Link
              href="/allCategories"
              className="group inline-flex items-center gap-2 text-sm font-semibold border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
            >
              View all categories
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Right Column - Asymmetric Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat: any, index: number) => (
                <div
                  key={cat.id}
                  className={index === 0 ? "sm:col-span-2" : ""}
                >
                  <CategoryCard
                    name={cat.category_name}
                    description={cat.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
