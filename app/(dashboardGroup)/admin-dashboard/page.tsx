/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  ClipboardList,
  FolderKanban,
  DollarSign,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "../_components/stat-card";

const bookingStatusVariant: Record<string, any> = {
  Requested: "outline",
  Accepted: "secondary",
  Declined: "destructive",
  InProgress: "default",
  Completed: "default",
  Cancelled: "destructive",
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) redirect("/login");

  const headers = { Authorization: `Bearer ${accessToken}` };

  const [statsRes, usersRes, bookingsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.BACKEND_API_URL}/api/admin/statistics`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.BACKEND_API_URL}/api/admin/bookings`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
      headers,
      cache: "no-store",
    }),
  ]);

  const stats = (await statsRes.json()).data ?? {};
  const users = (await usersRes.json()).data ?? [];
  const bookings = (await bookingsRes.json()).data ?? [];
  const categories = (await categoriesRes.json()).data ?? [];

  const recentUsers = users.slice(0, 6);
  const recentBookings = bookings.slice(0, 6);
  const recentCategories = categories.slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform-wide overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.totalUsers ?? 0}
        />
        <StatCard
          icon={ClipboardList}
          label="Total Bookings"
          value={stats.totalBookings ?? 0}
        />
        <StatCard
          icon={FolderKanban}
          label="Categories"
          value={stats.totalCategories ?? 0}
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${Number(stats.totalRevenue ?? 0).toFixed(2)}`}
        />
      </div>

      {/* Bookings by status */}
      {stats.bookingsByStatus && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Bookings by Status</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.bookingsByStatus).map(([status, count]) => (
              <Badge
                key={status}
                variant={bookingStatusVariant[status] ?? "outline"}
                className="text-sm"
              >
                {status}: {count as number}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Recent Users */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Users</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin-dashboard/users">View all</Link>
          </Button>
        </div>

        {recentUsers.length === 0 ? (
          <p className="text-muted-foreground text-sm">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentUsers.map((user: any) => (
              <Card key={user.id}>
                <CardContent className="p-4 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm">{user.name}</h3>
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Recent Bookings */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin-dashboard/bookings">View all</Link>
          </Button>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-muted-foreground text-sm">No bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBookings.map((booking: any) => (
              <Card key={booking.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm">
                      {booking.service?.service_name}
                    </h3>
                    <Badge
                      variant={
                        bookingStatusVariant[booking.status] ?? "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {booking.customer?.name} → {booking.technician?.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Categories preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link href="/admin-dashboard/categories/new">
                <Plus className="size-4" /> New
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin-dashboard/categories">View all</Link>
            </Button>
          </div>
        </div>

        {recentCategories.length === 0 ? (
          <p className="text-muted-foreground text-sm">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recentCategories.map((cat: any) => (
              <Card key={cat.id}>
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{cat.category_name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
