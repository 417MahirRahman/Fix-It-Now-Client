"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createServiceAction } from "../_actions/createServiceActions";
import { ServiceState } from "../_actions/technician.interface";

const initialState: ServiceState = { success: false, message: "" };

export function CreateServiceForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createServiceAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success("Service created successfully!");
      router.push("/technician-dashboard/services");
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
          placeholder="e.g. Pipe Leak Repair"
          required
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min={0}
          required
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoryName">Category</Label>
        <Input
          id="categoryName"
          name="categoryName"
          placeholder="e.g. Plumbing"
          required
          className="h-11"
        />
      </div>
      <Button type="submit" className="w-full h-11" disabled={pending}>
        {pending ? "Creating..." : "Create Service"}
      </Button>
    </form>
  );
}
