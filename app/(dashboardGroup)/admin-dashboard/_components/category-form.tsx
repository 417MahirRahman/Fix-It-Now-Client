"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CategoryState } from "../_actions/categoryActions.interface";
import { createCategoryAction } from "../_actions/categoryActions";

const initialState: CategoryState = { success: false, message: "" };

export default function CategoryForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createCategoryAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success("Category created successfully!");
      router.push("/admin-dashboard/getAllCategories");
    } else {
      toast.error("Failed to Create Category");
    }
  }, [state, router]);

  return (
    <Card className="w-full p-4 sm:p-6 md:p-8 shadow-lg">
      <CardHeader className="p-0 pb-4 sm:pb-6 text-center">
        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
          CREATE CATEGORY
        </CardTitle>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Add a new service category to the platform
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category_name">Category Name</Label>
            <Input
              id="category_name"
              name="category_name"
              type="text"
              placeholder="e.g. Plumbing"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Short description (optional)"
              className="h-11"
            />
          </div>

          <Button type="submit" className="w-full h-11" disabled={pending}>
            {pending ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
