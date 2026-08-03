import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Users, UserCircle } from "lucide-react";
import { IUser } from "../_actions/adminActions.interface";
import { UserCard } from "../_components/user-card";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const result = await res.json();
  const users: IUser[] = result.data ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              All Users
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage customer and technician accounts
            </p>
          </div>
        </div>

        {/* Stats badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <UserCircle className="size-4" />
          {users.length} {users.length === 1 ? "user" : "users"} registered
        </div>
      </div>

      {/* Users List */}
      {users.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="pt-12 pb-12 text-center">
            <Users className="size-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground text-sm">
              There are no registered users yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
