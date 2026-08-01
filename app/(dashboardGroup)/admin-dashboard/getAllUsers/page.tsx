import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IUser } from "../_actions/adminActions.interface";
import { UserCard } from "../_components/user-card";

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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">All Users</h1>
      <p className="text-muted-foreground mb-6">
        Manage customer and technician accounts.
      </p>

      {users.length === 0 ? (
        <p className="text-muted-foreground">No users found.</p>
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
