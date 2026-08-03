import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, Plus, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteCategoryButton } from "../_components/delete-category-button";

interface ICategory {
  id: string;
  category_name: string;
  description?: string;
}

export default async function AdminCategoriesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/categories`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    },
  );
  const result = await res.json();
  const categories: ICategory[] = result.data ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LayoutGrid className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage service categories
              </p>
            </div>
          </div>

          {/* Stats badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Tag className="size-4" />
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} available
          </div>
        </div>

        <Button asChild className="h-11 shadow-sm">
          <Link
            href="/admin-dashboard/createCategory"
            className="flex items-center gap-2"
          >
            <Plus className="size-4" />
            New Category
          </Link>
        </Button>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="pt-12 pb-12 text-center">
            <LayoutGrid className="size-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Create your first category to start organizing services.
            </p>
            <Button asChild>
              <Link href="/admin-dashboard/createCategory">
                <Plus className="size-4 mr-2" />
                Create Category
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-60 group-hover:opacity-100 transition-opacity" />

              <CardContent className="flex flex-col flex-1 p-6 space-y-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <Tag className="size-6" />
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {cat.category_name}
                  </h3>
                  {cat.description ? (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No description provided
                    </p>
                  )}
                </div>
                <DeleteCategoryButton
                  categoryId={cat.id}
                  categoryName={cat.category_name}
                />
              </CardContent>

              {/* Ring overlay for depth */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
