"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Button type="submit">{pending ? "Loading..." : "Login"}</Button>
      </Card>
    </form>
  );
};

export default LoginForm;
