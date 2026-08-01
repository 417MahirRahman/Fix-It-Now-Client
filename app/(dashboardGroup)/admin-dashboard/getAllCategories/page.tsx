import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            All Categories
          </h1>
          <p className="text-muted-foreground">Manage service categories.</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="size-4" /> New Category
          </Link>
        </Button>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted-foreground">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardContent className="p-4 space-y-1">
                <h3 className="font-semibold">{cat.category_name}</h3>
                {cat.description && (
                  <p className="text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
