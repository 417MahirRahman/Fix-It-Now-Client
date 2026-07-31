"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { registerAction } from "../_actions/registerActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [state, action, pending] = useActionState(registerAction, null);

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Registration failed");
      return;
    }

    toast.success("Account created successfully! Please log in.");
    router.push("/login");
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="name" type="text" placeholder="Full Name" required />
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Input name="phone" type="tel" placeholder="Phone Number" required />
        <Input name="address" type="text" placeholder="Address" required />

        <div className="space-y-2">
          <p className="text-sm font-medium">Register as</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="role"
                value="Customer"
                defaultChecked
                className="size-4"
              />
              Customer
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="role"
                value="Technician"
                className="size-4"
              />
              Technician
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
