"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IUser } from "../_actions/adminActions.interface";
import { updateUserStatusAction } from "../_actions/adminActions";

interface UserCardProps {
  user: IUser;
}

export function UserCard({ user }: UserCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await updateUserStatusAction(user.id, user.status);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{user.name}</h3>
            <Badge variant="secondary">{user.role}</Badge>
            <Badge
              variant={user.status === "Active" ? "default" : "destructive"}
            >
              {user.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground">
            {user.phone} · {user.address}
          </p>
        </div>

        <Button
          variant={user.status === "Active" ? "destructive" : "default"}
          size="sm"
          disabled={isPending}
          onClick={handleToggleStatus}
        >
          {isPending
            ? "Updating..."
            : user.status === "Active"
              ? "Ban User"
              : "Unban User"}
        </Button>
      </CardContent>
    </Card>
  );
}
