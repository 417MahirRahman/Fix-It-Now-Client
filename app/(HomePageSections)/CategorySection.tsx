/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "../allCategories/_components/category-card";

export async function CategoriesSection() {

  const res = await fetch(
    `${process.env.BACKEND_API_URL}api/services/categories`,
    { cache: "no-store" },
  );
  const result = ((await res.json()).data ?? []).slice(0, 4);
  const categories = result ?? [];

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Browse by category
          </h2>
          <p className="text-muted-foreground mt-1">
            Find the right kind of help, fast.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <CategoryCard
              key={cat.id}
              name={cat.category_name}
              description={cat.description}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
