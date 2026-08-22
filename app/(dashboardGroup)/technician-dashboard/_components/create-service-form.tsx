"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createServiceAction } from "../_actions/createServiceActions";
import { ServiceState } from "../_actions/technician.interface";

const initialState: ServiceState = {
  success: false,
  message: "",
};

interface Category {
  id: string;
  category_name: string;
}

interface CreateServiceFormProps {
  categories: Category[];
}

export function CreateServiceForm({ categories }: CreateServiceFormProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    createServiceAction,
    initialState,
  );

 useEffect(() => {
   if (!state.message) return;

   if (state.success) {
     toast.success(state.message || "Service created successfully!");
     router.push("/technician-dashboard/createNewService");
   } else {
     toast.error(state.message);
   }
 }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="service_name">Service Name</Label>
        <Input
          id="service_name"
          name="service_name"
          placeholder="Pipe Leak Repair"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min={0}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryName">Category</Label>
        <select
          id="categoryName"
          name="categoryName"
          required
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" className="w-full h-11" disabled={pending}>
        {pending ? "Creating..." : "Create Service"}
      </Button>
    </form>
  );
}
