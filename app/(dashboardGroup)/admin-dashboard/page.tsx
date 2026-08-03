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
  LayoutDashboard,
  TrendingUp,
  UserCircle,
  CalendarCheck,
  Tag,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "../_components/stat-card";

const bookingStatusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Requested: "outline",
  Accepted: "secondary",
  Declined: "destructive",
  InProgress: "default",
  Completed: "default",
  Cancelled: "destructive",
};

async function safeJson(res: Response) {
  if (!res.ok) return { data: null };
  try {
    return await res.json();
  } catch {
    return { data: null };
  }
}

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

  const stats = (await safeJson(statsRes)).data ?? {};
  const users = (await safeJson(usersRes)).data ?? [];
  const bookings = (await safeJson(bookingsRes)).data ?? [];
  const categories = (await safeJson(categoriesRes)).data ?? [];

  const recentUsers = users.slice(0, 6);
  const recentBookings = bookings.slice(0, 6);
  const recentCategories = categories.slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LayoutDashboard className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Platform-wide overview and insights
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Bookings by Status */}
      {stats.bookingsByStatus &&
        Object.keys(stats.bookingsByStatus).length > 0 && (
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Bookings by Status</h2>
                  <p className="text-xs text-muted-foreground">
                    Distribution across all booking states
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.bookingsByStatus).map(
                  ([status, count]) => (
                    <Badge
                      key={status}
                      variant={bookingStatusVariant[status] ?? "outline"}
                      className="text-sm font-medium px-3 py-1.5"
                    >
                      {status}: {count as number}
                    </Badge>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        )}

      <Separator className="opacity-50" />

      {/* Recent Users */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserCircle className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Recent Users</h2>
              <p className="text-xs text-muted-foreground">
                {recentUsers.length} most recent registrations
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/admin-dashboard/getAllUsers">
              View all
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {recentUsers.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="pt-10 pb-10 text-center">
              <UserCircle className="size-12 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm">No users found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentUsers.map((user: any) => (
              <Card
                key={user.id}
                className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
              >
                <CardContent className="flex flex-col flex-1 p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {user.name?.slice(0, 2).toUpperCase() ?? "??"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm leading-tight truncate group-hover:text-primary transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {user.role}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      ID: {user.id?.slice(-6) ?? "—"}
                    </span>
                  </div>
                </CardContent>

                {/* Ring overlay for depth */}
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator className="opacity-50" />

      {/* Recent Bookings */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarCheck className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Recent Bookings</h2>
              <p className="text-xs text-muted-foreground">
                {recentBookings.length} most recent bookings
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/admin-dashboard/getAllBookings">
              View all
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {recentBookings.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="pt-10 pb-10 text-center">
              <CalendarCheck className="size-12 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm">No bookings yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBookings.map((booking: any) => (
              <Card
                key={booking.id}
                className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
              >
                <CardContent className="flex flex-col flex-1 p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                      <ClipboardList className="size-4 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <Badge
                      variant={
                        bookingStatusVariant[booking.status] ?? "outline"
                      }
                      className="shrink-0 text-xs font-medium"
                    >
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {booking.service?.service_name ?? "Unknown Service"}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="truncate">
                        {booking.customer?.name ?? "—"}
                      </span>
                      <span>→</span>
                      <span className="truncate">
                        {booking.technician?.name ?? "—"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      ID: {booking.id?.slice(-6) ?? "—"}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      ${Number(booking.service?.price ?? 0).toFixed(2)}
                    </span>
                  </div>
                </CardContent>

                {/* Ring overlay for depth */}
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator className="opacity-50" />

      {/* Categories */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Tag className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Categories</h2>
              <p className="text-xs text-muted-foreground">
                {recentCategories.length} service categories
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" className="gap-1.5">
              <Link href="/admin-dashboard/createCategory">
                <Plus className="size-4" /> New
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/admin-dashboard/getAllCategories">
                View all
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {recentCategories.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="pt-10 pb-10 text-center">
              <Tag className="size-12 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm mb-4">
                No categories yet.
              </p>
              <Button asChild>
                <Link href="/admin-dashboard/createCategory">
                  <Plus className="size-4 mr-2" />
                  Create Category
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recentCategories.map((cat: any) => (
              <Card
                key={cat.id}
                className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
              >
                <CardContent className="flex flex-col flex-1 p-4 space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                    <Tag className="size-5" />
                  </div>
                  <p className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {cat.category_name}
                  </p>
                  {cat.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </CardContent>

                {/* Ring overlay for depth */}
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all pointer-events-none" />
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
