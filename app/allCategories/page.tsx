/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryCard } from "./_components/category-card";

export default async function CategoriesPage() {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}api/services/categories`,
    {
      cache: "no-store",
    },
  );
  const result = await res.json();
  const categories = result.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Service Categories
      </h1>
      <p className="text-muted-foreground mb-6">
        Pick a category to see everything on offer.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat: any) => (
          <CategoryCard
            key={cat.id}
            name={cat.category_name}
            description={cat.description}
          />
        ))}
      </div>
    </div>
  );
}
